'use strict';

var mongoose = require('mongoose');
var uuidParse = require('uuid-parse');

var Document = mongoose.Document;

function getter(binary) {
  if (binary == null) return undefined;
  if (!(binary instanceof mongoose.Types.Buffer)) return binary;

  var len = binary.length;
  var buf = Buffer.alloc(len);
  var hex = '';

  for (var i = 0; i < len; i++) {
    buf[i] = binary[i];
  }

  for (var i = 0; i < len; i++) {
    var n = buf.readUInt8(i);

    if (n < 16){
      hex += '0' + n.toString(16);
    } else {
      hex += n.toString(16);
    }
  }

  return hex.substr(0, 8) + '-' + hex.substr(8, 4) + '-' + hex.substr(12, 4) + '-' + hex.substr(16, 4) + '-' + hex.substr(20, 12);
}

function checkRequired(value) {
  return value instanceof mongoose.Types.Buffer;
};

function cast(value, doc, init) {
  if (value instanceof mongoose.Types.Buffer) return value;

  if (typeof value === 'string') {
    var uuidBuffer = new mongoose.Types.Buffer(uuidParse.parse(value));

    return uuidBuffer.toObject();
  }

  throw new Error('Could not cast ' + value + ' to UUID.');
};

function castForQuery($conditional, val) {
  var handler;

  if (arguments.length === 2) {
    handler = this.$conditionalHandlers[$conditional];

    if (!handler) {
      throw new Error("Can't use " + $conditional + " with UUID.");
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
