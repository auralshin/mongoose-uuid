'use strict';

const mongoose = require('mongoose');
const uuidParse = require('uuid-parse');

const Document = mongoose.Document;

const getter = (binary) => {
  if (binary == null) return undefined;
  if (!(binary instanceof mongoose.Types.Buffer)) return binary;

  const len = binary.length;
  const buf = Buffer.alloc(len);

  let hex = '';

  for (let i = 0; i < len; i++) {
    buf[i] = binary[i];
  }

  for (let i = 0; i < len; i++) {
    const n = buf.readUInt8(i);
    hex += n < 16 ? `0${n.toString(16)}` : n.toString(16);
  }

  return `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
};

const checkRequired = (value) => {
  return value instanceof mongoose.Types.Buffer;
};

const cast = (value, doc, init) => {
  if (value instanceof mongoose.Types.Buffer) return value;

  if (typeof value === 'string') {
    const uuidBuffer = new mongoose.Types.Buffer(uuidParse.parse(value));
    return uuidBuffer.toObject();
  }

  throw new Error(`Could not cast ${value} to UUID.`);
};

const castForQuery = ($conditional, val) => {
  let handler;

  if (arguments.length === 2) {
    handler = this.$conditionalHandlers[$conditional];

    if (!handler) {
      throw new Error(`Can't use ${$conditional} with UUID.`);
    }

    return handler.call(this, val);
  }

  return this.cast($conditional);
};

mongoose.Types.UUID = {
  get: getter,
  set: cast,
  checkRequired: checkRequired,
  cast: cast,
  castForQuery: castForQuery
};
