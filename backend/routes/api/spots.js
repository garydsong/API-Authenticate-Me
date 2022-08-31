const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const { sequelize } = require('sequelize')

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
        await spots.update()
        res.json(spots)
    } catch (error) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }



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

// Get all Spots
router.get('/', async (req, res) => {
    const { page, size } = req.query;
    const spots = await Spot.findAll({
        attributes: [
            'id',
            'ownerId',
            'address',
            'city',
            'state',
            'country',
            'lat',
            'lng',
            'name',
            'description',
            'price',
            'createdAt',
            'updatedAt',
        ]})
    res.json({Spots: spots})
})

router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    try {
        const spot = await Spot.create({ ownerId: req.user.id, address, city, state, country, lat, lng, name, description, price })

        return res.json(spot);
    } catch (error) {
        res
            .status(400)
            .json({
                message: "Validation Error",
                statusCode: 400,
                errors: {
                    address: "Street address is required",
                    city: "City is required",
                    state: "State is required",
                    country: "Country is required",
                    lat: "Latitude is not valid",
                    lng: "Longitude is not valid",
                    name: "Name must be less than 50 characters",
                    description: "Description is required",
                    price: "Price per day is required"
                }
            })
    }

})

router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
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

router.get('/:spotId/reviews', async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName'],
                where: {
                    id: req.user.id
                }
            },

            {
                model: ReviewImage,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'reviewId']
                }
            }
        ]
    })

    res.json(reviews)
})

// Create a Booking
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    console.log('start', startDate)
    console.log('end', endDate)
    console.log('user', req.user.id)
    console.log('spot', spot.id)

    try {
        const newBooking = await Booking.create({
            startDate: startDate,
            endDate: endDate,
            userId: req.user.id,
            spotId: spot.id
        })

        res.json(newBooking)
    } catch (error) {
        res
            .status(403)
            .json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: {
                  startDate: "Start date conflicts with an existing booking",
                  endDate: "End date conflicts with an existing booking"
                }
              })
    }
})

// Get Bookings for Spot by spotId
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    if (req.user.id !== spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            attributes: {
                include: ['spotId', 'startDate', 'endDate']
            }
        })
        return res.json(bookings)
    }

    if (req.user.id === spot.ownerId) {
        const bookings = await Booking.findAll({
            where: {
                spotId: spot.id
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                }
            ],
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
        })
        return res.json({
            Bookings: bookings
        })
    }
})

// Delete a Spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const { spotId } = req.params;
    const spot = await Spot.findByPk(spotId)

    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
              })
    }

    spot.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
})

module.exports = router;
