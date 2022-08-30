const express = require('express');

const { Spot, SpotImage, Review } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.put('/:spotId', requireAuth, async (req, res) => {
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

router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId);

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    res.json(spot)
})

router.get('/', async (req, res) => {
    const spots = await Spot.findAll()
    res.json(spots)
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price })

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

router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const spot = await Spot.findByPk(req.params.spotId);
    const reviewExists = await Review.findOne({
        where: {
            userId: req.user.id
        }
    })

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    if (reviewExists) {
        res
            .status(403)
            .json({
                message: "User already has a review for this spot",
                statusCode: 403
              })
    }


    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: spot.id,
            review,
            stars
        })

        res.json(newReview)
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Validation error",
                statusCode: 400,
                errors: {
                  review: "Review text is required",
                  stars: "Stars must be an integer from 1 to 5",
                }
            })
    }

})

module.exports = router;
