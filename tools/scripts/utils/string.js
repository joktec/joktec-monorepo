const uuid = require('uuid');
const { ObjectId } = require('bson');

const MONGO_BASE_ID = '5951bc91860d8b5ba';
const base16 = 16
const uuidPadding = 12
const uuidComponents = 4
const rand = Math.random;

const objectIdToUuid = (objectId) => {
	const objectIdBuffer = Buffer.from(objectId.toHexString(), "hex");
	// xx xx xx xx - xx xx - [1-5]x xx - [89ab]x xx - xx xx xx xx xx x

	const uuidBuffer = Buffer.from([
		objectIdBuffer[0],
		objectIdBuffer[1],
		objectIdBuffer[2],
		objectIdBuffer[3],
		// -
		objectIdBuffer[4],
		objectIdBuffer[5],
		// -
		0x10,
		0x0,
		// -
		0x80,
		0x0,
		// -
		objectIdBuffer[6],
		objectIdBuffer[7],
		objectIdBuffer[8],
		objectIdBuffer[9],
		objectIdBuffer[10],
		objectIdBuffer[11],
	]);

	return uuid.stringify(uuidBuffer);
};

const uuidToObjectId = (uuidStr) => {
	const uuidBuffer = Buffer.from(uuid.parse(uuidStr));

	const objectIdBuffer = Buffer.from([
		uuidBuffer[0],
		uuidBuffer[1],
		uuidBuffer[2],
		uuidBuffer[3],
		// -
		uuidBuffer[4],
		uuidBuffer[5],
		// -
		// 0x10
		// 0x0
		// -
		// 0x80
		// 0x0
		// -
		uuidBuffer[10],
		uuidBuffer[11],
		uuidBuffer[12],
		uuidBuffer[13],
		uuidBuffer[14],
		uuidBuffer[15],
	]);

	return new ObjectId(objectIdBuffer.toString("hex"));
};

function uuidToInt (stringUuid) {
  const uuid = BigInt(`0x${stringUuid.split('-')[uuidComponents]}`)
  return Number(uuid)
}

function intToUuid(number) {
  let nbr;
  let randStr = "";
  const bigInt = BigInt(number)

  do {
      randStr += (nbr = rand()).toString(16).substr(3, 6);
  } while (randStr.length < 30);

  return (
      // randStr.substr(0, 8) + "-" +
      // randStr.substr(8, 4) + "-4" +
      // randStr.substr(12, 3) + "-" +
      // ((nbr*4|0)+8).toString(16) + // [89ab]
      // randStr.substr(15, 3) + "-" +
      // bigInt.toString(base16).padStart(uuidPadding, 0)
			// * FIXME:
			`b0b6b3f9-6ea7-4a8f-a3b5-${bigInt.toString(base16).padStart(uuidPadding, 0)}`
  );
}

const numberToObjectId = (number) => {
  const oldId = number.toString(10);
  const a = oldId.length < 7 ? "0".repeat(7 - oldId.length) : "0";
  return MONGO_BASE_ID + a + oldId;
}

const objectIdToNumber = (objectId) => {
  const numberStr = objectId.replace(MONGO_BASE_ID, '');
  return +numberStr;
}

const mysqlIdToUuid = (id) => {
  try {
    if (!id) {
      return;
    }

    if (/^\d+$/.test(id)) {
      return intToUuid(id);
    }

    return id;
  } catch (err) {
    console.error('@err', err);
    return undefined;
  }
};

module.exports = {
  mysqlIdToUuid,
	uuidToInt,
  intToUuid,
};