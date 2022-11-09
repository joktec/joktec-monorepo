const stream = require('stream')
const AWS = require('aws-sdk')
const S3 = new AWS.S3({
  signatureVersion: 'v4'
})
const sharp = require('sharp')
const BUCKET = process.env.BUCKET
// const URL = `http://${process.env.BUCKET}.s3-website.${process.env.REGION}.amazonaws.com`
const URL = `https://${process.env.BUCKET}`

// create the read stream abstraction for downloading data from S3
const readStreamFromS3 = ({ Bucket, Key }) => {
  return S3.getObject({ Bucket, Key }).createReadStream()
}
// create the write stream abstraction for uploading data to S3
const writeStreamToS3 = ({ Bucket, Key, isWebp }) => {
  const pass = new stream.PassThrough()

  if(isWebp) {
    return {
      writeStream: pass,
      uploadFinished: S3.upload({
        Body: pass,
        Bucket,
        ContentType: 'image/webp',
        Key
      }).promise()
    }
  }

  return {
    writeStream: pass,
    uploadFinished: S3.upload({
      Body: pass,
      Bucket,
      ContentType: 'image/png',
      Key
    }).promise()
  }
  
}
// sharp resize stream
const streamToSharp = ({ width, isWebp }) => {
  if(isWebp) {
    return sharp()
    .resize(width)
    .webp({ quality: 80 })
    .toFormat('webp')
  }

  return sharp()
    .resize(width)
    .toFormat('png')
  
}

exports.handler = async (event) => {
  const key = event.queryStringParameters.key
  const isWebp = event.queryStringParameters.isWebp
  const match = key.match(/(\d+)\/(.*)/)
  const width = parseInt(match[1], 10)
  // const height = parseInt(match[2], 10)
  const originalKey = match[2]
  const fileExtension = originalKey.split('.').pop();
  const newKey = '' + width + '/' + originalKey
  const newWebpKey = '' + width + '/' + `${originalKey.replace(fileExtension, '')}webp`
  const imageLocation = `${URL}/${isWebp ? newWebpKey : newKey}`

  // Check if image exists (if exist --> redirect to image location)
  try {
    await s3.headObject({ Bucket, Key: isWebp ? newWebpKey : newKey }).promise();

    return {
      statusCode: '301',
      headers: { 'location': imageLocation },
      body: ''
    }
    // Do stuff with signedUrl
  } catch (error) {
    
  }

  try {
    // create the read and write streams from and to S3 and the Sharp resize stream
    const readStream = readStreamFromS3({ Bucket: BUCKET, Key: originalKey })
    const resizeStream = streamToSharp({ width })
    const { writeStream, uploadFinished } = writeStreamToS3({ Bucket: BUCKET, Key: newKey })
    const { writeStream: webpWriteStream, uploadFinished: webpUploadFinished } = writeStreamToS3({ Bucket: BUCKET, Key: newWebpKey, isWebp: true })

    const webpResizeStream = streamToSharp({ width, isWebp: true })

    // trigger the stream
    readStream
      .pipe(resizeStream)
      .pipe(writeStream)

    // trigger the stream
    readStream
      .pipe(webpResizeStream)
      .pipe(webpWriteStream)

    // wait for the stream to finish
    const uploadedData = await uploadFinished
    const webpUploadedData = await webpUploadFinished

    // log data to Dashbird
    console.log('Data: ', {
      ...uploadedData,
      BucketEndpoint: URL,
      ImageURL: imageLocation
    })

    // return a 301 redirect to the newly created resource in S3
    return {
      statusCode: '301',
      headers: { 'location': imageLocation },
      body: ''
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: '500',
      body: err.message
    }
  }
}
