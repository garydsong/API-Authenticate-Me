const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


// Get all Current Users
router.get('/current', async (req, res) => {
    const bookings = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price'],
                where: {
                    id: req.user.id
                }
            },
        ]
    })

    res.json(bookings)
})

// Edit Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        res
            .status(404)
            .json({
                message: "Booking couldn't be found",
                statusCode: 404
            })
    }

    try {
        booking.startDate = startDate;
        booking.endDate = endDate;
        await booking.update()
        res.json(booking)
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

// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const { bookingId } = req.params;
    const booking = await Booking.findByPk(bookingId)

    if (!booking) {
        res
            .status(404)
            .json({
                message: "Booking couldn't be found",
                statusCode: 404
              })
    }

    booking.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
})

module.exports = router;
