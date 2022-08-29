const express = require('express');

const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

module.exports = router;
