import httpStatus from 'http-status';
import Gestionnaire from '../models/getionnaire.model';
import { findPossibleCombination } from '../utils/util';

async function getAgentNumber(req, res) {
  if (!req.query.number) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: 'query number not found',
    });
  }

  const gestionnaire = await Gestionnaire.findById({
    _id: req.user.gestionnaire_ref,
  });
  if (!gestionnaire) {
    return res.status(httpStatus.NOT_FOUND).json({
      message: 'Gestionnaire not found',
    });
  }
  const possibleCombination = findPossibleCombination(req.query.number, gestionnaire.numeros);
  return res.json(possibleCombination);
}

module.exports = {
  getAgentNumber,
};
