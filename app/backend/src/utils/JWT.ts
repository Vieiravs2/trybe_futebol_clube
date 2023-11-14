import { JwtPayload, Secret, SignOptions, sign } from 'jsonwebtoken';

export default class JWT {
  private static secret: Secret = process.env.JWT_SECRET || 'jwt_secret';

  private static jwtConfig: SignOptions = {
    algorithm: 'HS256', expiresIn: '1d',
  };

  static sign(payload: JwtPayload): string {
    const token = sign(payload, this.secret, this.jwtConfig);
    return token;
  }
}
