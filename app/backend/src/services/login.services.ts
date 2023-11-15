import * as bcrypt from 'bcryptjs';
import JWT from '../utils/JWT';
import loginModel from '../database/models/users.model';

export default class LoginService {
  static async login(email: string, password: string) {
    const validateEmail = await loginModel.findOne({ where: { email } });

    if (!validateEmail || !bcrypt.compareSync(password, validateEmail.password)) {
      return { status: 401, data: { message: 'Invalid email or password' } };
    }

    const token = JWT.sign({ email });
    return { status: 201, data: { token } };
  }
}
