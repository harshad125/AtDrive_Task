import express from 'express';
import UserCtrl from '../controllers/user/index.js';
import { validateSchemaCtrl } from '../server/validatorCtrl.js';
import authSchema from '../validators/authSchema.js';

const router = express.Router();

router.post('/auth/register', [validateSchemaCtrl(authSchema.registerSchema)], async (req, res, next) => UserCtrl.register(req, res, next));

router.post('/auth/login', [validateSchemaCtrl(authSchema.loginSchema)], async (req, res, next) => UserCtrl.login(req, res, next));

export default router;