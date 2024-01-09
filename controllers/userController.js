const { errorResponseMessage, successResponseMessage } = require("../helper/responseMessage");
const { deleteUserById, updateUserByID, findUserById } = require("../services/userServices");

const findUser = async (req, res) => {
    try {
        if (!req.params.id) { 
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await findUserById(req.params.id);
        return successResponseMessage(res, "User get successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

const deleteUser = async (req, res) => {
    try {
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const user = await deleteUserById(req.params.id);
        return successResponseMessage(res, "User deleted successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}
const updateUser = async (req, res) => {
    try {
        const { username } = req.body;
        if (!req.params.id) {
            return errorResponseMessage(res, "Id is required!", 401);
        }
        const userInfo = {
            username
        }
        const user = await updateUserByID(req.params.id, userInfo)
        return successResponseMessage(res, "User update successfully!", user);
    } catch (error) {
        return errorResponseMessage(res, "Something went wrong: " + error.message);
    }
}

module.exports = { deleteUser, updateUser, findUser };
