const router = require("express").Router();
const { getAllUsers, getProfile } = require("../controllers/AdminController");
const { deleteUser, updateUser, findUser } = require("../controllers/userController");
const { auth, isAdmin } = require("../middlewares/authMiddleware");

router.post('/profile', auth, isAdmin, getProfile);
router.post('/get-all-users', auth, isAdmin, getAllUsers);
router.get('/get-user-by-id/:id', auth, isAdmin, findUser);
router.delete('/delete-user/:id', auth, isAdmin, deleteUser);
router.put('/update-user/:id', auth, isAdmin, updateUser);


module.exports = router;