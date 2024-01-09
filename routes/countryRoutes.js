const express = require('express');
const { create, getCountries } = require('../controllers/countryController');
const { auth, isAdmin } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/country/create',auth, isAdmin, create);
router.get('/countries/', auth, isAdmin, getCountries);
// router.get('/country/:id', auth, isAdmin, create);
// router.put('/country/:id', auth, isAdmin, create);
// router.delete('/country/:id', auth, isAdmin, create)

module.exports = router;