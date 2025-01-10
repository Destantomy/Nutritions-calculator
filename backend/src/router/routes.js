const express = require('express');
const router = express.Router();
const calculate = require('../handlers/handler');

router.post('/calculate', calculate);

module.exports = router;