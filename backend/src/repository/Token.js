import { sign, verify } from 'jsonwebtoken';

export default class Token  {
  static get(type, user) {
    const currentDate = new Date();
    let valid;

    switch (type) {
      case 'REGISTRATION':
        valid = currentDate.getTime() + 259200000;   // 3 days
        break;

      case 'LOGIN':
        valid = currentDate.getTime() + 3600000; // 60 minutes
        break;

      default:
        throw new Error('Unknown token type');
    }

    return sign(
      {
        id: user._id,
        userLevel: user.userLevel,
        name: user.name,
        email: user.email,
        type,
        valid,
      },
      process.env.jwtSecretKey
    );
  }

  static verify(token, type) {
    const extractedToken = verify(token, process.env.jwtSecretKey);

    if (extractedToken.type !== type) {
      throw new Error('invalid');
    }

    const currentDate = new Date();

    if (extractedToken.valid < currentDate.getTime()) {
      throw new Error('invalid');
    }

    return extractedToken;
  }
}
