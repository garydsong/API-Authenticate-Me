const express = require('express');

const { Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// const validateNewSpot = [
//     check('address')
//         .exists({ checkFalsy: true })
//         .isLength({ min: 1 })
//         .withMessage('Address must be valid.'),
//     check('city')
//         .exists({ checkFalsy: true })
//         .isLength({ min:})
// ]

router.get('/current', async (req, res) => {
    
})

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

router.post('/', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.createSpot({ address, city, state, country, lat, lng, name, description, price })

    return res.json({spot});
})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } =  req.body;
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res
            .status(404)
            .json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const spotImage = await SpotImage.create({
        spotId: parseInt(req.params.spotId),
        url: url,
        preview: true
    })

    res.json(spotImage)
})



module.exports = router;
