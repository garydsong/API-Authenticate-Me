const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.delete('/:spotImageId', requireAuth, async (req, res) => {
    const { spotImageId } = req.params;
    const spotImage = await SpotImage.findByPk(spotImageId)

    if (!spotImage) {
        res
            .status(404)
            .json({
                message: "Spot Image couldn't be found",
                statusCode: 404
              })
    }

    spotImage.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
})

module.exports = router;
