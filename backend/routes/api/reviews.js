const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const { reviewId } = req.params;
    const review = await Review.findByPk(reviewId)

    if (!review) {
        res
            .status(404)
            .json({
                message: "Review couldn't be found",
                statusCode: 404
            })
    }

    const existingImages = await ReviewImage.findAll({
        where: {
            reviewId: reviewId
        }
    })

    if (existingImages.length >= 10) {
        res
            .status(403)
            .json({
                message: "Maximum number of images for this resource was reached",
                statusCode: 403
            })
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: reviewId,
        url
    })

    res.json({
        id: newReviewImage.id,
        url: url
    })
})

router.get('/current', async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
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
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
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

    res.json({
        Reviews: reviews
    })
})

router.put('/:reviewId', async (req, res) => {
    res.json('ye')
})

module.exports = router;
