const validator = require('validator');
const jwt = require("jsonwebtoken");
const { errorResponseMessage, successResponseMessage } = require('../helper/responseMessage');
const { createUser, findUserByEmail, generateAccountNumber } = require('../services/userServices');
const { createProfile } = require('../services/profileServices');
const { comparePassword, hashedPassword } = require('../helper/PasswordManager');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!name || name.length < 3) {
            return errorResponseMessage(res, "Name field is required");
        }
        if (validator.isEmpty(email)) {
            return errorResponseMessage(res, "Email field is required");
        } else if (!validator.isEmail(email)) {
            return errorResponseMessage(res, "Invalid email address");
        }
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
    try {
        const { name, email, username, password } = req.body;
        if (!name || name.length < 3) {
            return errorResponseMessage(res, "Name field is required");
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
        const accountNumber = await generateAccountNumber();
        const userInfo = {
            // userType:"Admin",
            email,
            username,
            password: pass,
            profileId: profile._id,
            accountNumber
        }
        const user = await createUser(userInfo);
        return successResponseMessage(res, "User created successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { loginUser, signupUser }