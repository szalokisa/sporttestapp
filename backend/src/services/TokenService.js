import Hash from '../repository/Hash';
import Token from '../repository/Token';
import { user } from '../repository/user';

export default class TokenService {
    static async login(queryParams) {
        let dbResult;
        dbResult = await user.getByEmail(queryParams.email);
        if (!dbResult || dbResult.status !== 'ACTIVE') {
            const error = new Error('invalid');
            error.status = 400;
            throw error;
        }

        let passwordOk = await Hash.compare(queryParams.password, dbResult.passHash);
        if (!passwordOk) {
            const error = new Error('invalid');
            error.status = 400;
            throw error;
        }
        return Token.get('LOGIN', dbResult);
    }

    static async extendToken(id) {
        let userData = await user.getById(id);
        return Token.get('LOGIN', userData);
    }
}
