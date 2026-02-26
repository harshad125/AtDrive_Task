// validation middleware to handle request data for all services
import { validationResult } from 'express-validator';
import HttpStatus from 'http-status-codes';
import _ from 'lodash';

const validateSchemaCtrl = (schemas) => async (req, res, next) => {
  await Promise.all(schemas.map((schema) => schema.run(req)));

  const result = validationResult(req);
  if (result.isEmpty()) {
    return next();
  }

  const errors = result.array().map(error => {
    console.error('error: ', error);
    return {
      param: error.path,
      msg: _.isObject(error.msg) ? _.get(error, 'msg.errorMessage') : error.msg,
    };
  });

  return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
    success: false,
    errors,
  });
};

export { validateSchemaCtrl };
