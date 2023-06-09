import {
    USERS_CREATE,
    Users_GetByEmail
} from "../db/storedProcedures";

import { genSalt, hash, compareSync } from "bcryptjs";
import { sign } from "jsonwebtoken";

export const usersService = {
    async register(queryParams) {
        const salt = await genSalt(10);
        queryParams.passHash = await hash(queryParams.password, salt);
        return await USERS_CREATE(queryParams);
    },

    async login(queryParams) {
        const userData = await Users_GetByEmail(queryParams);
        if (!compareSync(queryParams.password, userData.passHash)) {
            const error = new Error('invalid login/password');
            error.status = 403  //vorbidden
            throw error;
        }

        const currentDate = new Date();
        const token = sign(
            {
                type: 'LOGIN',
                valid: currentDate.getTime() + 9000000, // 150 minutes
                userLevel: userData.userLevel,
            }, process.env.jwtSecretKey);
        return {
            token,
        }
    }
}
