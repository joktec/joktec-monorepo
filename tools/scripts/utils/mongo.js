const list = async (collection, query = {}, limit = 0) => {
  return await collection.find(query).limit(limit).toArray();
}

const updateOne = async (collection, query = {}, data = {}) => {
  return await collection.updateOne(query, data);
}

module.exports = {
  list,
  updateOne,
}