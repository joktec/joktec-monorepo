import { Injectable } from '@nestjs/common';
import { ObjectCheckResult } from '../../interfaces/object-check-result.interface';
import { TableMapping } from '../../interfaces/table-mapping.interface';
import { MongodbService } from '../mongodb/mongodb.service';
import { MysqlService } from '../mysql/mysql.service';
import { TableMappingService } from '../table-mapping/table-mapping.service';
import { UtilService } from '../util/util.service';

@Injectable()
export class CompareObjectService {
  constructor(
    private tableMappingService: TableMappingService,
    private utilService: UtilService,
    private mysqlService: MysqlService,
    private mongodbService: MongodbService,
  ) {}

  async compareObjectAll(numbeRecordTest: number) {
    return await this.compareObjectByListTableMapping(
      this.tableMappingService.getAllTableMapping(),
      numbeRecordTest,
    );
  }

  async compareObjectByDatabase(
    mongoDatabase: string,
    numbeRecordTest: number,
  ) {
    const tableMappings =
      this.tableMappingService.getAllTableMappingByDatabase(mongoDatabase);

    if (tableMappings.length == 0) {
      return {
        message: `Do not have any table in mongo database: ${mongoDatabase}`,
      };
    }

    return await this.compareObjectByListTableMapping(
      tableMappings,
      numbeRecordTest,
    );
  }

  async compareObjectByMysqlTable(mysqlTable: string, numbeRecordTest: number) {
    const tableMapping =
      this.tableMappingService.getTableMappingForMysql(mysqlTable);

    if (!tableMapping) {
      return {
        message: `Do not have a table : ${mysqlTable}`,
      };
    }

    return await this.compareObjectByListTableMapping(
      [tableMapping],
      numbeRecordTest,
    );
  }

  async compareObjectByListTableMapping(
    tableMappings: Array<TableMapping>,
    numbeRecordTest: number,
  ) {
    const sameObjects = [];
    const diffObjects = [];
    const notCompareObjects = [];
    for (const tableMapping of tableMappings) {
      const objectCheckResult: ObjectCheckResult =
        await this.compareObjectByTable(tableMapping, numbeRecordTest);

      objectCheckResult.notCompare
        ? notCompareObjects.push(objectCheckResult)
        : objectCheckResult.same
        ? sameObjects.push(objectCheckResult)
        : diffObjects.push(objectCheckResult);
    }

    return {
      sameList: sameObjects,
      diffList: diffObjects,
      notCompareList: notCompareObjects,
    };
  }

  async compareObjectByTable(
    tableMapping: TableMapping,
    numbeRecordTest = 5,
  ): Promise<ObjectCheckResult> {
    try {
      const countQuery = `SELECT count(*) as count FROM \`${tableMapping.mysqlTable}\``;

      let mysqlCount = 0;
      await this.mysqlService
        .getDataFromMySQL(this.mysqlService.getConnection(), countQuery)
        .then((result) => {
          mysqlCount = result[0]['count'];
        });

      if (mysqlCount == 0) {
        throw new Error('MySQL table do not have any data.');
      }

      const mongodbClient = await this.mongodbService.getMongoClient(
        tableMapping.mongoDatabase,
      );
      const db = mongodbClient.db(tableMapping.mongoDatabase);
      const collection = db.collection(tableMapping.mysqlTable);
      const mongoCount = await collection.countDocuments();

      if (mongoCount == 0) {
        throw new Error('Mongo collection do not have any data.');
      }

      const checkingPositions = new Set<number>();

      // random the record between 0 and (count - 1)
      for (let i = 0; i < numbeRecordTest; i++) {
        checkingPositions.add(Math.floor(Math.random() * (mysqlCount - 1)));
      }

      const attributeColumns = await this.mysqlService.getOrCreateTableColumn(
        tableMapping.mysqlTable,
      );

      const keyDiffSet = new Set<string>();
      const idDiffs = [];
      // compare by count
      let isDiff = mysqlCount != mongoCount;
      for (const checkingPosition of checkingPositions) {
        const queryData = `SELECT * FROM \`${tableMapping.mysqlTable}\` LIMIT ${checkingPosition}, 1`;

        let mysqlData;
        await this.mysqlService
          .getDataFromMySQL(this.mysqlService.getConnection(), queryData)
          .then((results) => {
            mysqlData = JSON.parse(JSON.stringify(results))[0];
          });

        const mongoDataConvert = this.utilService.fromMysqlToMongo(
          mysqlData,
          tableMapping,
          attributeColumns,
        );

        const mongoData = await collection.findOne({
          _id: `${mongoDataConvert[this.utilService.MONGO_ID_FILED]}`,
        });

        if (mongoData) {
          const isSame = await this.isSameDataBetween2MongoObject(
            mongoDataConvert,
            mongoData,
            keyDiffSet,
          );
          if (!isSame) idDiffs.push(mysqlData[tableMapping.mysqlId]);
          isDiff = isDiff || !isSame;
        } else {
          idDiffs.push(mysqlData[tableMapping.mysqlId]);
        }
      }

      return {
        tableName: tableMapping.mysqlTable,
        mysqlCount: mysqlCount,
        mongoCount: mongoCount,
        same: !isDiff,
        keyDiffs: Array.from(keyDiffSet),
        idDiffs: idDiffs,
      };
    } catch (error) {
      return {
        tableName: tableMapping.mysqlTable,
        notCompare: true,
        reason: error.message,
      };
    }
  }

  async isSameDataBetween2MongoObject(
    mongoDataConvert,
    mongoData,
    keyDiffSet: Set<string>,
  ) {
    let isSame = true;
    for (const key in mongoData) {
      if (['createdAt', 'updatedAt'].includes(key)) continue;
      let isSameObject = true;
      const value = mongoData[key];
      const convertValue = mongoDataConvert[key];
      if (!convertValue && !value) {
        continue;
      }
      if (convertValue && value) {
        if (convertValue instanceof Object) {
          if (!this.isSameData2Object(convertValue, value)) {
            isSameObject = false;
          }
        } else {
          if (convertValue != value) {
            isSameObject = false;
          }
        }
      } else {
        isSameObject = false;
      }

      if (!isSameObject) {
        keyDiffSet.add(key);
        isSame = false;
      }
    }
    return isSame;
  }

  isSameData2Object(obj1, obj2) {
    for (const key in obj1) {
      const value = obj1[key];
      const convertValue = obj2[key];
      if (!convertValue && !value) {
        continue;
      }
      if (convertValue && value) {
        if (convertValue instanceof Array) {
          return this.isSameData2Array(convertValue, value);
        } else if (convertValue instanceof Date) {
          return convertValue.getTime() == value.getTime();
        } else if (convertValue instanceof Object) {
          return this.isSameData2Object(convertValue, value);
        } else {
          return convertValue == value;
        }
      } else {
        return false;
      }
    }

    return true;
  }

  isSameData2Array(array1: Array<any>, array2: Array<any>): boolean {
    if (!array1) {
      if (array2) return false;
      else return true;
    }

    if (array1.length != array2.length) return false;

    array1.forEach((value) => {
      if (!array2.includes(value)) return false;
    });

    return true;
  }
}
