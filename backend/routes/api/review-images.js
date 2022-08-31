const express = require('express');

const { Spot, SpotImage, User, ReviewImage, Review, Booking } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:reviewImageId', requireAuth, async (req, res) => {
    const { reviewImageId } = req.params;
    const reviewImage = await ReviewImage.findByPk(reviewImageId)

    if (!reviewImage) {
        res
            .status(404)
            .json({
                message: "Review Image couldn't be found",
                statusCode: 404
              })
    }

    reviewImage.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
      })
})

module.exports = router;
