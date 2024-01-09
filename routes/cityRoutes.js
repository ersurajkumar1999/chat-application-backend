const express = require('express');
const router = express.Router();

router.post('/city/create', checkHome);
router.get('/cities/', checkHome);
router.get('/city/:id', checkHome);
router.put('/city/:id', checkHome);
router.delete('/city/:id', checkHome)

module.exports = router;