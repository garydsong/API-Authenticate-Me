const express = require('express');

const { Spot } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateNewSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ min: 1 })
        .withMessage('Address must be valid.')
]

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.createSpot({ address, city, state, country, lat, lng, name, description, price })

    return res.json({spot});
})

module.exports = router;
