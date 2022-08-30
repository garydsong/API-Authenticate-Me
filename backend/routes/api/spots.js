const express = require('express');

const { Spot, SpotImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.put('/:spotId', async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const { spotId } = req.params;
    const spots = await Spot.findByPk(spotId)

    if (!spots) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    try {
        spots.address = address;
        spots.city = city;
        spots.state = state;
        spots.country = country;
        spots.lat = lat;
        spots.lng = lng;
        spots.name = name;
        spots.description = description;
        spots.price = price;
        spots.update()
    } catch (error) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    res.json(spots)

})

router.get('/current', handleValidationErrors, async (req, res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
        where: {
            ownerId: ownerId
        }
    })

    res.json({
        Spot: spots
    })
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
