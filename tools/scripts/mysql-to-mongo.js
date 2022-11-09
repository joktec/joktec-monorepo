const mysql = require('mysql');
const { MongoClient, ObjectId } = require('mongodb');
const { mysqlIdToUuid } = require('./utils/string');

const MYSQL_URL_INFO = {
  host: 'mysql-jobhop-dev.jobhopin.com',
  user: 'root',
  password: 'FZyNFRNUcnuDvJD5',
  database: 'jobhop_dev',
};

// * Dev
const MONGODB_URL = 'mongodb://dev:StrongP%40ssword@mongodb0-jobhop-dev.jobhopin.com:27017/dev';
const MONGODB_NAME = 'dev';

const LIMIT_INSERTED = 1000;

const mongoClient = new MongoClient(MONGODB_URL);
const connection = mysql.createConnection(MYSQL_URL_INFO);

MYSQL_TABLES = [
  // * Common
  // "source",
  // 'skill',
  // "country",
  // "city",
  // 'district',
  // 'degree',
  // 'university',
  // 'department',
  // 'setting',
  // 'banner',
  // 'industry',
  // 'platform',
  // 'marketing_banner',
  // 'marketing_keyword',
  // 'marketing_seo_keyword',

  // * Users
  // 'users',
  // 'users_activation',
  // 'users_cv',
  // 'user_setting',
  // 'users_platform',
  // 'user_tatent_keyword',
  // 'user_location',
  // 'user_email_verification',
  // 'user_cv_template',
  // 'user_action',

  // * Quizz
  // 'question_category',
  // 'question',
  // 'quiz',
  // 'quiz_action_log',
  // 'quiz_category',
  // 'quiz_event',
  // 'quiz_language',
  // 'quiz_log_question_answered',
  // 'quiz_match_log',
  // 'quiz_question',
  // 'quiz_question_answer',
  // 'quiz_question_media',
  // 'quiz_score_log',
  // 'quiz_vote_log',

  // * Game
  // 'game_assessment_test_job_history',
  // 'game_leader_board_bot',
  // 'game_lucky_spin',
  // 'game_lucky_spin_history',
  // 'game_lucky_spin_item',
  // 'game_lucky_spin_match',
  // 'game_score_turn_log',
  // 'game_turn_log',
  // 'game_user_session',

  // * Jobseeker
  // "jobseeker"

  // * Test
  // 'candidate',
  // 'job_budget_suggest_info',
];

const MAPPING_TABLE_WITH_ID = {
  'question_category': 'categoryId',
  'users': 'userId',
};


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
];

const EXCLUDE_RELATION_FIELDS = [
  'deviceId',
]


// * 'quiz_log_question_answered'
const ALTERNATIVE_IDS = [
  // 'answers',
  // 'correctAnswers',
];

// * 'quiz_match_log',
const ALTERNATIVE_MULTIPLE_VALUE_IDS = [
  // 'questionOrder',
]

connection.connect();

const recursiveTransformIdMetaData = (obj, searchKey = 'id') => {
  if (!obj) {
    return obj;
  }

  Object.keys(obj).forEach(key => {
     const value = obj[key];
     if(key === searchKey && typeof value !== 'object'){
        obj[key] = mysqlIdToUuid(obj[key]);
     }else if(typeof value === 'object'){
      recursiveTransformIdMetaData(value, searchKey);
     }
  });

  return obj;
};

function fromSnakeCaseToCamelCase(item, tableName) {
  const tableId = `${tableName}Id`;

  Object.keys(item).forEach((k) => {
    newK = k.replace(/(\_\w)/g, (m) => m[1].toUpperCase());

    if (DATE_FIELDS.includes(k) && item[k]) {
      item[k] = new Date(item[k]);
    }
    
    if (newK != k) {
      item[newK] = item[k];

      delete item[k];
    }

    if (newK === 'metaData' && item[newK]) {
      const metaData = JSON.parse(item[newK]);

      if (typeof metaData === 'object') {
        item[newK] = JSON.stringify(recursiveTransformIdMetaData(metaData));
      }
    }

    // * Convert  mysqlId => uuid of relation tables
    if (newK.slice(-2) === 'Id' && item[newK] && !EXCLUDE_RELATION_FIELDS.includes(newK) && newK !== tableId) {
      item[newK] = `${item[newK]}`;
      item[newK.replace('Id', '')] = mysqlIdToUuid(item[newK])
    }


    // * Update alternative ids not follow conversion
    if (ALTERNATIVE_IDS.includes(newK)) {
      item[newK] = mysqlIdToUuid(item[newK]);
    }

    if (item[newK] && ALTERNATIVE_MULTIPLE_VALUE_IDS.includes(newK)) {
      item[newK] = item[newK].split(',').map(mysqlIdToUuid);
    }
  });

  const primaryId = item.id || item[tableId] || item[MAPPING_TABLE_WITH_ID[tableName]];

  item.mysqlId = primaryId ? primaryId.toString() : null;
  if (!item.mysqlId) {
    return item;
  }


  item.createdAt = item.createdAt ? item.createdAt : new Date(item.createDate);
  item.updatedAt = item.updatedAt ? item.updatedAt : new Date(item.lastUpdate);

  item._id = mysqlIdToUuid(item.mysqlId);

  delete item.id;

  return item;
}

const countDocuments = async (collection, query) => {
  return await collection.count(query);
};

const upsert = async (collection, payload) => {
  const document = await collection.findOne({
    mysqlId: payload.mysqlId,
  });

  if (document) {
    const { _id, ...restPayload } = payload;

    await collection.updateOne(
      {
        mysqlId: payload.mysqlId,
      },
      {
        $set: {
          ...restPayload,
        },
      }
    );

    return document;
  }

  await collection.insertOne(payload);
};

MYSQL_TABLES.forEach((tableName, index) => {
  // console.log('@tableName', tableName);

  connection.query(
    `SELECT * FROM ${tableName} LIMIT ${LIMIT_INSERTED}`,
    async function (error, results, fields) {
      if (error) throw error;

      console.log(`Having ${results.length} for processing`);

      const items = JSON.parse(JSON.stringify(results)).map((item) =>
        fromSnakeCaseToCamelCase(item, tableName)
      ).filter(item => item.mysqlId);

      await mongoClient.connect();
      console.log('Connected successfully to mongodb');

      const db = mongoClient.db(MONGODB_NAME);
      const collection = db.collection(MYSQL_TABLES[index]);

      const count = await countDocuments(collection);
      if (!count) {
        const insertResult = await collection.insertMany(items);
        console.log('@insertResult', insertResult);

        return;
      }

      for (const item of items) {
        console.log(`Updating ${item.mysqlId}`);
        await upsert(collection, item);
      }
    }
  );
});

connection.end();
mongoClient.close();
