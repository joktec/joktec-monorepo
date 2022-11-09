
const MYSQL_TABLE = 'question_category';

function camelToSnake(str) {
  return str.replace(/[A-Z]/g, (c) => {return '_' + c.toLowerCase()});
}

const TYPE_MAPPING = {
  nvarchar: 'String',
  int: 'Number',
  mediumint: 'Number',
  bigint: 'String',
  decimal: 'Number',
  year: 'Number',
  json: 'Array',
  text: 'String',
  tinyint: 'Number',
  tinyblob: 'String',
  mediumtext: 'String',
  mediumblob: 'String',
  longblob: 'String',
  varchar: 'String',
  timestamp: 'Date',
  datetime: 'Date',
  time: 'Date',
  enum: 'Enum',
  date: 'Date',
  double: 'Number',
  longtext: 'String',
  binary: 'String',
  float: 'Number',
  varbinary: 'String',
  char: 'String',
  blob: 'String',
  set: 'Array',
};

const schemaConversion = {
  category_id: {
    type: 'int',
    isPrimary: true,
    isNumber: true,
    mongoField: '_id', // * mapping field
  },
  name: {
    type: 'string',
  },
  code_name: {
    type: 'string',
  },
  image_active_mode: {
    type: 'string',
  },
  image_disable_mode: {
    type: 'string',
  },
  description: {
    type: 'string',
  },
  is_active: {
    type: 'int',
    default: 1,
  },
  created_date: {
    type: 'date',
  },
};

const parseType = (type = 'string', value) => {
  if (type === 'string') {
    value = `${value}`
  } else if (type === 'int') {
    value = +value;
  } else if (type === 'date') {
    value = (new Date(value)).toISOString();
  }

  return value;
};

const getPrimaryFieldKey = () => {
  return Object.keys(schemaConversion).find(key => schemaConversion[key].isPrimary);
}

function transform(rawItem = {}) {
  // * init data
  const itemObj = Object.keys(schemaConversion).reduce((obj, field) => {
    obj[field] = schemaConversion[field].default || '';
    return obj;
  }, {});

  itemObj[getPrimaryFieldKey()] = rawItem._id;

  // * transform data
  Object.keys(rawItem).forEach(field => {
    const fieldKey = camelToSnake(field);
    const fieldValue = rawItem[field];

    if (!schemaConversion[fieldKey] || schemaConversion[fieldKey].isPrimary) {
      return;
    }

    itemObj[fieldKey] = parseType(schemaConversion[fieldKey].type, fieldValue);
  });

  return itemObj;
}

// * Build MYSQL Query
const buildInsertQuery = function (rawItem) {
  const item = transform(rawItem);

  const fieldStr = Object.keys(item).join(', ');
  const valueStr = Object.values(item).join(', ');

  return 'INSERT INTO ' + MYSQL_TABLE + ' (' + fieldStr + ') VALUES (' + valueStr + ');';
};

const buildUpdateQuery = function (rawItem) {
  const item = transform(rawItem);

  const primaryField = getPrimaryFieldKey();
  const primaryFieldValue = item[primaryField];

  // * Remove primary key
  delete item[primaryField];
  
  // * Get remaining fields for updating
  const updateStr = Object.keys(item).map(fieldKey => {
    const fieldValue = item[fieldKey];

    return `${fieldKey} = ${parseType(schemaConversion[fieldKey].type, fieldValue)}`;
  });

  
  const sql = `UPDATE ${MYSQL_TABLE} SET ${updateStr.join(', ')} WHERE ${primaryField} = "${primaryFieldValue}";`;
  return sql;
};


const buildDeleteQuery = function (rawItem) {
  const item = transform(rawItem);

  const primaryField = getPrimaryFieldKey();
  console.log('@primaryField', primaryField);
  const primaryFieldValue = item[primaryField];

  // * Remove primary key
  delete item[primaryField];

  return `DELETE FROM ${MYSQL_TABLE} WHERE ${primaryField} = ${primaryFieldValue};`;
};

const SAMPLE_ITEM = {
  "_id" : "b0b6b3f9-6ea7-4a8f-a3b5-000000000001",
  "category_id" : "b0b6b3f9-6ea7-4a8f-a3b5-000000000001",
  "name" : "Career opportunities",
  "description" : null,
  "priority" : 1,
  "categoryId" : "1",
  "category" : "b0b6b3f9-6ea7-4a8f-a3b5-000000000001",
  "codeName" : "carrer_opportunities",
  "imageActiveMode" : "/companyreview/career-opportunities.png",
  "imageDisableMode" : "/companyreview/career-opportunities-disable.png",
  "isActive" : 1,
  "createdDate" : "2020-12-21T00:09:05.383Z",
  "updatedDate" : "2020-12-21T00:09:05.383Z",
  "mysqlId" : "1",
};

const insertQuery = buildInsertQuery(SAMPLE_ITEM);
const updateQuery = buildUpdateQuery(SAMPLE_ITEM);
const deleteQuery = buildDeleteQuery(SAMPLE_ITEM);

console.log('@OBJECT_MAPPING', JSON.stringify(schemaConversion, null, 2))
console.log('@TABLE', MYSQL_TABLE);
console.log('@SAMPLE_ITEM', SAMPLE_ITEM);

console.log('@INSERT:');
console.log(insertQuery);
console.log('-');

console.log('@UPDATE:');
console.log(updateQuery);
console.log('-');

console.log('@DELETE:');
console.log(deleteQuery);
console.log('-');
