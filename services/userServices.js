const userModel = require("../models/User");

const createUser = async (user) => {
    return await userModel.create(user);
}
const findUserByEmail = async (email) => {
    return await userModel.findOne({ email: email });
}
const findUserById = async (userId) => {
    return await userModel.findOne({ _id: userId });
}
const deleteUserById = async (userId) => {
    return await userModel.deleteOne({ _id: userId });
}
const updateUserByID = async (userId, updatedUserData) => {
    return await userModel.findOneAndUpdate({ _id: userId }, { $set: updatedUserData }, { new: true });
}
module.exports = {
    createUser,
    findUserByEmail,
    findUserById,
    deleteUserById,
    updateUserByID
}