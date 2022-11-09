import { Connection } from 'mysql2';

import {
  ColumnMapping,
  TableMapping,
} from '../../interfaces/table-mapping.interface';
import { ColumnType } from '../../enums/table-enum';
import { Logger } from '@nestjs/common';

const DATE_FIELDS = [
  'create_date',
  'last_update',
  'created_at',
  'updated_at',
  'valid_from',
  'valid_until',
  'birthday',
  'last_login',
  'expire_reset_pass',
  'start_at',
  'end_at',
  'show_banner_from',
  'show_banner_to',
  'finished_at',

  // chat_conversation table
  'last_updated_time',
  'created_time',
];

const MAPPING_CREATED_UPDATED_DATE = {
  updated: 'created',
  actionTime: 'actionTime',
  updatedAt: 'createdAt',
  updateDate: 'createDate',
  lastUpdatedTime: 'createdTime',
  dateUpdated: 'dateCreated',
  lastUpdate: 'createDate',
  update: 'created',
  updatedDate: 'createdDate',
};

export class UtilService {
  private logger = new Logger(UtilService.name);

  public MYSQL_ID_FILED = 'sqlId';
  public MONGO_ID_FILED = '_id';
  public CREATED_AT_FIELD = 'createdAt';
  public UPDATED_AT_FIELD = 'updatedAt';

  private UUID_BASE_ID = 'b0b6b3f9-6ea7-4a8f-a3b5';
  private UUID_PADDING = 12;
  private BASE_16 = 16;

  async getDataFromMySQL(connection: Connection, query: string) {
    return new Promise((resolve, reject) => {
      connection.query(query, (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        resolve(result);
      });
    });
  }

  parseType(type: ColumnType, value, isSync: boolean) {
    if (value === undefined || value == null) return null;

    if (type === ColumnType.NUMBER) {
      return +value;
    }

    if (isSync) {
      if (type === ColumnType.BUFFER_NUMBER) {
        // data of debezium for this type is boolean
        // -> true: 1, false: 0
        value = value ? 1 : 0;
      } else if (type === ColumnType.DATE) {
        // debezium: datetime with normal format
        if (isNaN(value)) {
          value = new Date(value);
        } else {
          // debezium: datetime with unix timestamp format
          value = new Date(value / 1000);
        }
      }
    } else {
      if (type === ColumnType.BUFFER_NUMBER) {
        // using convert for type bit(1)
        // { type: 'Buffer', data: [ 0 ] }
        value = value.data[0];
      } else if (type === ColumnType.DATE) {
        value = new Date(value);
      }
    }

    return value;
  }

  fromMysqlListToMongoList(
    mysqlData: any,
    tableMapping: TableMapping,
    attributeColumns: Array<ColumnMapping>,
  ) {
    const mongoData = [];

    mysqlData.forEach((data: any) =>
      mongoData.push(
        this.fromMysqlToMongo(data, tableMapping, attributeColumns),
      ),
    );

    return mongoData;
  }

  fromMysqlToMongo(
    mysqlObject: any,
    tableMapping: TableMapping,
    attributeColumns: Array<ColumnMapping>,
    isSync = false,
  ) {
    const mongoObject = {};
    const attributeColumnsObj = attributeColumns.reduce((obj, item) => {
      obj[item.name] = item;

      return obj;
    }, {});

    Object.keys(mysqlObject).forEach((key) => {
      if (key === tableMapping.mysqlId) return;
      const newKey = key.replace(/(\_\w)/g, (m) => m[1].toUpperCase());
      const columnAttribute: ColumnMapping = attributeColumnsObj[key];

      // * Add new foreign key to mongo
      if (columnAttribute && columnAttribute.isForeign) {
        mongoObject[newKey.replace('Id', '')] = this.mysqlIdToUuid(
          mysqlObject[key],
        );
      }

      // * Parse to mongo type
      mongoObject[newKey] = this.parseType(
        columnAttribute.type,
        mysqlObject[key],
        isSync,
      );
    });

    const idString = String(mysqlObject[tableMapping.mysqlId]);
    mongoObject[this.MYSQL_ID_FILED] = idString;

    const mongoId = this.mysqlIdToUuid(idString);
    if (mongoId) mongoObject[this.MONGO_ID_FILED] = mongoId;

    this.updateForSpecialCase(mongoObject, tableMapping.mongoCollection);

    if (isSync) {
      // if sync process, only set updatedAt, no set now
      mongoObject[this.UPDATED_AT_FIELD] =
        mongoObject[tableMapping.updatedDateField];
    } else {
      // if snapshot process: set createAt and updatedAt to now if not exist
      const createdAtField =
        MAPPING_CREATED_UPDATED_DATE[tableMapping.updatedDateField];

      mongoObject[this.CREATED_AT_FIELD] = mongoObject[createdAtField]
        ? mongoObject[createdAtField]
        : new Date();

      mongoObject[this.UPDATED_AT_FIELD] = mongoObject[
        tableMapping.updatedDateField
      ]
        ? mongoObject[tableMapping.updatedDateField]
        : new Date();
    }

    return mongoObject;
  }

  updateForSpecialCase(mongoData, collection) {
    switch (collection) {
      case 'quiz_match_log':
        const questionOrder = mongoData['questionOrder'];
        if (questionOrder) {
          mongoData['questionOrder'] =
            this.convertMysqlIdListToMongoIdList(questionOrder);
        } else {
          mongoData['questionOrder'] = [];
        }
        break;
      case 'quiz_log_question_answered':
        const metaData = mongoData['metaData'];
        if (metaData) {
          try {
            const metaDataJson = JSON.parse(metaData);
            this.convertMysqlIdToMongoIdforJsonObject(metaDataJson, ['id']);
            mongoData['metaData'] = JSON.stringify(metaDataJson);
          } catch (error) {
            this.logger.error(error.message);
          }
        } else {
          mongoData['metaData'] = '{}';
        }

        const correctAnswers = mongoData['correctAnswers'];
        if (correctAnswers) {
          mongoData['correctAnswers'] =
            this.convertMysqlIdListToMongoIdList(correctAnswers);
          mongoData['answers'] = this.convertMysqlIdListToMongoIdList(
            mongoData['answers'],
          );
        } else {
          mongoData['correctAnswers'] = [];
          mongoData['answers'] = [mongoData['answers']];
        }
        break;
      default:
        break;
    }
  }

  convertMysqlIdListToMongoIdList(mysqlIds): Array<string> {
    const mongoIds = [];
    if (mysqlIds) {
      mysqlIds.split(',').forEach((id: string) => {
        mongoIds.push(this.mysqlIdToUuid(id));
      });
    }
    return mongoIds;
  }

  convertMysqlIdToMongoIdforJsonObject(jsonObject, sqlId: Array<string>) {
    for (const key in jsonObject) {
      const value = jsonObject[key];
      if (typeof value === 'object') {
        this.convertMysqlIdToMongoIdforJsonObject(value, sqlId);
      } else if (value instanceof Array) {
        value.forEach((object) =>
          this.convertMysqlIdToMongoIdforJsonObject(object, sqlId),
        );
      } else {
        if (sqlId.includes(key)) {
          jsonObject[key] = this.mysqlIdToUuid(value);
        }
      }
    }
  }

  mysqlIdToUuid(id: string) {
    try {
      if (!id) {
        return;
      }

      if (/^\d+$/.test(`${id}`)) {
        return this.intToUuid(id);
      }

      return id;
    } catch (err) {
      console.error('@err', err);
      return undefined;
    }
  }

  private intToUuid(number) {
    let randStr = '';
    const bigInt = BigInt(number);

    do {
      randStr += Math.random().toString(16).substr(3, 6);
    } while (randStr.length < 30);

    return (
      // randStr.substr(0, 8) + "-" +
      // randStr.substr(8, 4) + "-4" +
      // randStr.substr(12, 3) + "-" +
      // ((nbr*4|0)+8).toString(16) + // [89ab]
      // randStr.substr(15, 3) + "-" +
      // bigInt.toString(base16).padStart(uuidPadding, 0)
      // * FIXME:
      `${this.UUID_BASE_ID}-${bigInt
        .toString(this.BASE_16)
        .padStart(this.UUID_PADDING, '0')}`
    );
  }

  async sleep(ms: number) {
    new Promise((r) => setTimeout(r, ms));
  }
}
