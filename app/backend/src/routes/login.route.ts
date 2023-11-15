import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Validations from '../middlewares/validations';

const router = Router();

router.post(
  '/login',
  Validations.validateLogin,
  Validations.validateEmail,
  Validations.validatePassword,
  LoginController.login,
);

export default router;
