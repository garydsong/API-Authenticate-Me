const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking, sequelize } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');
const { Op } = require('sequelize');

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
        await spots.save()

        // const resSpot = spots.toJSON()

        // console.log(spots)

        // resSpot.createdAt = "sup";
        // resSpot.updatedAt = "ya";
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

// Get all Spots owned by the Current User
router.get('/current', handleValidationErrors, async (req, res) => {
    const ownerId = req.user.id;
    const spots = await Spot.findAll({
        raw: true,
        where: {
            ownerId: ownerId
        },
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
        ]
    })

    let averageRating;

    for (let i = 0; i < spots.length; i++) {
        const reviews = await Review.count({ where: { spotId: spots[i].id } })
        const sumOfStars = await Review.sum('stars', {
            where: { spotId: spots[i].id }
        })

        if (sumOfStars === null) {
            averageRating = 0
        } else {
            averageRating = (sumOfStars / reviews).toFixed(1)
        }

        spots[i].avgRating = averageRating

        const image = await SpotImage.findOne({
            raw: true,
            where: {
                [Op.and]: [
                    { spotId: spots[i].id },
                    { preview: true }
                ]
            }
        })

        if (!image) {
            spots[i].previewImage = null
        } else {
            spots[i].previewImage = image.url
        }
    }

    res.json({
        Spots: spots
    })
})

// Get details of a Spot from an id
router.get('/:spotId', async (req, res) => {
    const { spotId } = req.params;

    const spot = await Spot.findByPk(spotId, {
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
        ]
    });


    if (!spot) {
        res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }

    const reviews = await Review.count({ where: { spotId: spotId } })

    const sumOfStars = await Review.sum('stars', {
        where: { spotId: spotId }
    })

    const spotImage = await SpotImage.findAll({
        where: { spotId: spotId },
        attributes: ['id', 'url', 'preview']
    })

    const owner = await User.findByPk(spot.ownerId,
        {
            attributes: ['id', 'firstName', 'lastName']
        })

    const returnSpot = spot.toJSON();

    let averageRating;
    if (sumOfStars === null) {
        averageRating = 0
    } else {
        averageRating = (sumOfStars / reviews).toFixed(1)
    }

    returnSpot.numReviews = reviews;
    returnSpot.Owner = owner;
    returnSpot.SpotImages = spotImage;
    returnSpot.avgRating = Number(averageRating);

    res.json(returnSpot)

})

// Get all Spots
router.get('/', async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    page = parseInt(page)
    size = parseInt(size)

    if (!page) page = 1;
    if (page > 10) page = 10;
    if (!size) size = 20;
    if (size > 20) size = 20;

    let pagination = {};

    if (page >= 1 && size >= 1) {
        pagination.limit = size;
        pagination.offset = size * (page - 1)
    }

    const spots = await Spot.findAll({
        raw: true,
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
        ]
    })

    const offset = pagination.offset || -1
    const allSpots = spots.slice(
        offset + 1,
        offset + pagination.limit + 1
    )

    for (let i = 0; i < allSpots.length; i++) {
        const image = await SpotImage.findOne({
            raw: true,
            where: {
                [Op.and]: [
                    { spotId: allSpots[i].id },
                    { preview: true }
                ]
            }
        })

        if (!image) {
            allSpots[i].previewImage = 'No image'
        } else {
            allSpots[i].previewImage = image.url
        }
    }
    res.json({ Spots: allSpots, page, size })
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

    res.json({
        id: spotImage.spotId,
        url: spotImage.url,
        preview: spotImage.preview
    })
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
    const allBookings = await Booking.findAll({
        where: {
            spotId: spot.id
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


    const newBooking = await Booking.create({
        startDate: startDate,
        endDate: endDate,
        userId: req.user.id,
        spotId: spot.id
    })


    if (!startDate || !endDate || endDate <= startDate) {
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

    for (let currentBooking of allBookings) {
        if (currentBooking.startDate >= startDate
            && currentBooking.endDate <= endDate
            || currentBooking.startDate <= startDate
            && currentBooking.endDate >= endDate
            || currentBooking.startDate >= startDate
            && currentBooking.endDate >= endDate
            || currentBooking.startDate <= startDate
            && currentBooking.endDate <= endDate) {
                return res
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
    }

    res.json(newBooking)
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
        return res.json({ Bookings: bookings })
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
        return res
            .status(404)
            .json({
                message: "Spot couldn't be found",
                statusCode: 404
            })
    }

    spot.destroy()

    return res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
