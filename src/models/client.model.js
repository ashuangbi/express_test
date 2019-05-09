import mongoose from 'mongoose';

/**
 * Client Schema
 */
const ClientSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  sexe: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  email2: {
    type: String,
  },
  telDomicile: {
    type: String,
  },
  telPro: {
    type: String,
  },
  telMobile: {
    type: String,
    required: true,
  },
  telMobile2: {
    type: String,
  },
  fax: {
    type: String,
  },
});

/**
 * @typedef Client
 */
module.exports = mongoose.model('Client', ClientSchema);
