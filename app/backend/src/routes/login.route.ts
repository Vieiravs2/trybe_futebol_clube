import { Router } from 'express';
import LoginController from '../controllers/login.controller';
import Validations from '../middlewares/validations';

const router = Router();

router.post('/login', Validations.validateEmailAndPassword, LoginController.login);

export default router;
