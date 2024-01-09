const validator = require('validator');
const jwt = require("jsonwebtoken");
const { errorResponseMessage, successResponseMessage } = require('../helper/responseMessage');
const { createUser, findUserByEmail } = require('../services/userServices');
const { createProfile } = require('../services/profileServices');
const { comparePassword, hashedPassword } = require('../helper/PasswordManager');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const checkUserExists = await findUserByEmail(email);
        if (!checkUserExists) {
            return errorResponseMessage(res, "User is not registered, Please signup first!", 401);
        }
        const checkPassword = await comparePassword(password, checkUserExists.password);
        if (!checkPassword) {
            return errorResponseMessage(res, "Incorrect Password", 401);
        }
        const token = jwt.sign(
            {
                email: checkUserExists.email,
                id: checkUserExists._id,
                userType: checkUserExists.userType
            },
            process.env.JWT_SECRET,
            {
                expiresIn: '7d'
            }
        );
        checkUserExists.token = "Bearer " + token;
        return successResponseMessage(res, "Login successfully!", checkUserExists);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }

}

const signupUser = async (req, res) => {
    const { name, email, username, password } = req.body;
    if (!name || name.length < 3) {
    }
    if (validator.isEmpty(email)) {
        return errorResponseMessage(res, "Email field is required");
    } else if (!validator.isEmail(email)) {
        return errorResponseMessage(res, "Invalid email address");
    }
    if (!username || username.length > 20 || username.length < 3) {
        return errorResponseMessage(res, "Username character length must be in range of 3-20.");
    }
    if (!password || password.length < 6) {
        return errorResponseMessage(res, "Password needs to be atleast 6 characters long.");
    }

    const checkUserExists = await findUserByEmail(email);
    if (checkUserExists) {
        return errorResponseMessage(res, "User email already exists");
    }
    const pass = await hashedPassword(password);
    const profile = await createProfile({ name });
    const userInfo = {
        email,
        username,
        password: pass,
        profileId: profile._id
    }
    const user = await createUser(userInfo);
    return successResponseMessage(res, "User created successfully!", user);
}

module.exports = { loginUser, signupUser }