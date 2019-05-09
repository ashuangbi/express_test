import mongoose from 'mongoose';

/**
 * Gestionnaire Schema
 */
const GestionnaireSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  numeros: {
    type: Object,
  },
});

/**
 * @typedef Gestionnaire
 */
module.exports = mongoose.model('Gestionnaire', GestionnaireSchema);
