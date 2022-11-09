import { Logger } from '@nestjs/common';
import { LogStashConfig } from './logtash.config';

const net = require('net');
const stream = require('stream');
const backoff = require('backoff');

function _createLogstashStream(userOptions) {
  const logger = new Logger('LogStashService');
  const options = Object.assign(
    {
      address: '127.0.0.1',
      port: 514,
      reconnect: true,
      reconnectTries: Infinity,
    },
    userOptions,
  );

  const inputStream = new stream.PassThrough();
  process.stdin.pipe(inputStream);
  inputStream.pause();

  let socket = null;
  let connected = false;
  let connecting = false;
  let socketError = null;

  const outputStream = stream.Writable({
    close() {
      socket.end();
    },
    write(data, encoding, callback) {
      socket.write(data);
      callback();
    },
  });

  function connect(cb) {
    if (connecting) return;
    connecting = true;
    socket = net.createConnection(
      options.unixsocket ? { path: options.unixsocket } : { host: options.address, port: options.port },
      () => {
        connecting = false;
        connected = true;
        if (cb) cb(null, connected);
        inputStream.pipe(outputStream, { end: false });
        inputStream.resume();
      },
    );
    addListeners();
  }

  function disconnect() {
    connected = false;
    connecting = false;
    inputStream.pause();
    inputStream.unpipe(outputStream);
  }

  function reconnect() {
    const retry = backoff.fibonacci();
    retry.failAfter(options.reconnectTries);
    retry.on('ready', () => {
      connect(err => {
        if (connected === false) return retry.backoff(err);
      });
    });
    retry.on('fail', err => process.stderr.write(`could not reconnect: ${err.message}`));
    retry.backoff();
  }

  function closeListener(hadError) {
    disconnect();
    if (hadError) {
      process.stderr.write(socketError.message);
    }
    if (options.reconnect) reconnect();
  }

  function connectListener() {
    logger.log('Service is connected');
  }

  function endListener() {
    disconnect();
    removeListeners();
    if (options.reconnect) reconnect();
  }

  function errorListener(err) {
    socketError = err;
  }

  function addListeners() {
    socket.on('close', closeListener);
    socket.on('connect', connectListener);
    socket.on('end', endListener);
    socket.on('error', errorListener);
  }

  function removeListeners() {
    socket.removeAllListeners('close');
    socket.removeAllListeners('connect');
    socket.removeAllListeners('end');
    socket.removeAllListeners('error');
  }

  connect((_, isConnected) => {
    if (isConnected) {
      logger.log('Service is configured');
    } else {
      logger.error(`Service could not connect to \n ${JSON.stringify(options, null, 2)}`);
    }
  });
  return outputStream;
}

export const createLogstashStream = (cfg: LogStashConfig) =>
  _createLogstashStream({
    ...cfg,
  });
