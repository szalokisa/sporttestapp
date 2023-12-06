import Token from '../repository/Token';

export function verifyLoginToken(req, res, next) {
  try {
    let mytoken = req.headers['token'];
    if (!mytoken) {
      mytoken = req.body.token
    }
    if (!mytoken) {
      mytoken = req.body.headers.token
    }
    req.verified = Token.verify(mytoken, 'LOGIN');
    next();
  } catch (e) {
    const error = new Error('invalid token');
    error.status = 403;
    throw error;
  }
}

export function verifyRegistrationToken(req, res, next) {
  try {
    req.verified = Token.verify(req.headers.tokenforacceptordecline, 'REGISTRATION');
    next();
  } catch (e) {
    const error = new Error('invalid token');
    error.status = 403;
    throw error;
  }
}
