import User from "../../models/user.mysql.js";
import bcrypt from 'bcryptjs';
import enums from '../../helper/enums.js';
import utils from "../../helper/utils.js";
import * as userError from '../../helper/userError.js';

export default async function login(req, res, next) {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return next(new userError.NotFoundError('email', 'user not found based on this email.'));
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(new userError.BadRequestError('password', 'password is incorrect.'));
        }

        const token = {
            sessionToken: await utils.generateJwtToken(enums.jwtTokenType.session, user),
            refreshToken: await utils.generateJwtToken(enums.jwtTokenType.refresh, user),
        };
        return utils.returnHttpSuccessResponse(res, token);
    } catch (error) {
        console.log(error);
        return next(error)
    }
}