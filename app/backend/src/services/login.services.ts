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
    console.log(token);
    return { status: 200, data: { token } };
  }

  static async role(email: string) {
    const validateEmail = await loginModel.findOne({ where: { email } }) as loginModel;
    const { role } = validateEmail;
    return { status: 200, data: { role } };
  }
}
