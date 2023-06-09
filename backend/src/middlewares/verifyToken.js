import { verify } from 'jsonwebtoken';

export function verifyToken(req, res, next) {
    try {
        const extractedToken = verify(req.headers.token, process.env.jwtSecretKey);
        const currentDate = new Date();

        if (extractedToken.valid < currentDate.getTime()) {
            throw new Error('expired token');
        }

        req.verified = extractedToken;

        next();
    } catch (e) {
        const error = new Error('invalid token');
        error.status = 403;
        throw error;
    }
}
