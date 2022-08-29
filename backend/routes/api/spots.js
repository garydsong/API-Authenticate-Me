const express = require('express');

const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
    res.json('ay dis da spot')
})

module.exports = router;
