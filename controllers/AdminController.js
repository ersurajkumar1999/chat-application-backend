const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const User = require("../models/User");
const { findUserById } = require("../services/userServices");

const getAllUsers = async (req, res) => {

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 2;

    const skip = (page - 1) * pageSize;

    try {
        const totalItems = await User.countDocuments();
        const users = await User.find()
            .skip(skip)
            .limit(pageSize)
            .exec();

        res.json({
            users,
            page,
            pageSize,
            totalItems,
            totalPages: Math.ceil(totalItems / pageSize),
            status: true,
            message: "get all users"
        });
    } catch (err) {
        res.status(500).json({ error: err.message, status: false, message: "Something went wrong, Please trye again!" });
    }
}
const getUserById = async (req, res) =>{
    
}

const getProfile = async (req, res) => {
    if (!req.user?.id) {
        return errorResponseMessage(req, "Something went wrong while validating the token!", 401)
    }
    try {
        // Check if User Exists or Not
        const user = await findUserById(req.user.id);
        // const profile = await userProfileService.getProfileByUserId(req.user.id);
        // user.profile = profile;

        return successResponseMessage(res, "Get Profile", user)
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
module.exports = { getAllUsers, getProfile }