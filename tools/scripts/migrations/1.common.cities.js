require('dotenv').config();

const _ = require("lodash");
const { MongoClient, ObjectId } = require("mongodb");

const mongoUtils = require('../utils/mongo');

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_NAME = process.env.MONGODB_NAME;

// * Migrate country mysqlId => objectId

const migrationRelationObjectIds = async (db) => {
  const cityCollection = db.collection('city');
  const countryCollection = db.collection('country');

  const mappingCountryIds = (await mongoUtils.list(countryCollection, {
    mysqlId: {
      $exists: true,
    },
  })).reduce((obj, item) => {
    if (!item.mysqlId) {
      return obj;
    }

    obj[item.mysqlId] = item._id;
    return obj;
  }, {});

  const cities = await mongoUtils.list(cityCollection, {
    countryId: {
      $exists: true,
    },
    country: {
      $exists: false,
    },
  });

  console.log(`Having ${cities.length} items for processing`);
  for (const city of cities) {
    if (!mappingCountryIds[city.countryId]) {
      continue;
    }

    console.log(`Updating city: ${city._id}`);

    await mongoUtils.updateOne(cityCollection, {
      _id: city._id,
    }, {
      $set: {
        country: mappingCountryIds[city.countryId],
      },
    })
  }
};

MongoClient.connect(MONGODB_URL, { useNewUrlParser: true }, async function(err, client) {
  console.log("Connected successfully to server");
  const db = client.db(MONGODB_NAME);
  await migrationRelationObjectIds(db);

  console.log('@Done');
});
