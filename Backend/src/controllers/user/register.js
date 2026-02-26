import User from "../../models/user.mysql.js";
import bcrypt from 'bcryptjs';
import * as userErrors from '../../helper/userError.js';
import enums from '../../helper/enums.js';
import utils from "../../helper/utils.js";

export default async function register(req, res, next) {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ where: { email } });

        if (existingUser) {
            return next(new userErrors.BadRequestError('email', 'user is aleady exist.'));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const token = {
            sessionToken: await utils.generateJwtToken(enums.jwtTokenType.session, newUser),
            refreshToken: await utils.generateJwtToken(enums.jwtTokenType.refresh, newUser),
        };
        return utils.returnHttpSuccessResponse(res, token);
    } catch (error) {
        console.log(error);
        return next(error)
    }
}