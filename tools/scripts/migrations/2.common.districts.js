require('dotenv').config();

const _ = require("lodash");
const { MongoClient, ObjectId } = require("mongodb");

const mongoUtils = require('../utils/mongo');

const MONGODB_URL = process.env.MONGODB_URL
const MONGODB_NAME = process.env.MONGODB_NAME;

// * Migrate [cityId, parentId] mysqlId => objectId

const migrationRelationObjectIds = async (db) => {
  const cityCollection = db.collection('city');
  const districtCollection = db.collection('district');

  const mappingCityIds = (await mongoUtils.list(cityCollection, {
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

  const mappingDistrictIds = (await mongoUtils.list(districtCollection, {
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

  const districts = await mongoUtils.list(districtCollection, {
    $or: [
      {
        city: {
          $exists: true,
        },  
      },
      {
        parentId: {
          $exists: true,
        },  
      },
    ],
  });

  console.log(`Having ${districts.length} items for processing`);

  for (const district of districts) {
    const payload = {};
    if (district.cityId && mappingCityIds[district.cityId]) {
      payload['city'] = mappingCityIds[district.cityId];
    }

    if (district.parentId && mappingDistrictIds[district.parentId]) {
      payload['parent'] = mappingDistrictIds[district.parentId];
    }

    console.log(`Updating city: ${district._id}`, {
      ...payload,
    });

    await mongoUtils.updateOne(districtCollection, {
      _id: district._id,
    }, {
      $set: {
        ...payload,
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
