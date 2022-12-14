const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage, sequelize } = require('../../db/models');
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

    return res.json({
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
                    exclude: ['createdAt', 'updatedAt'],
                },
                include: { model: SpotImage,
                    where: { preview: true },
                    attributes: ['url']
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

    for (let i = 0; i < reviews.length; i++) {
        let resReviews = reviews[i].toJSON()
        console.log(resReviews)
        let urlObj = resReviews.Spot.SpotImages[0]
        // console.log(urlObj)

        if (urlObj) {
            resReviews.Spot.previewImage = urlObj.url
        } else {
            resReviews.Spot.previewImage = 'No Image'
        }

        delete resReviews.Spot.SpotImages
        reviews[i] = resReviews
    }
    // const newReviews = reviews.toJSON()


    return res.json({
        Reviews: reviews
    })
})

router.put('/:reviewId', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const { reviewId } = req.params;
    const reviews = await Review.findByPk(reviewId)

    if (!reviews) {
        res
            .status(404)
            .json({
                message: "Review couldn't be found",
                statusCode: 404
            })
    }

    try {
        reviews.review = review;
        reviews.stars = stars;
        await reviews.save()

        return res.json(reviews)

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

// Delete  Review by Review Id
// Delete a Booking
router.delete('/:reviewId', requireAuth, async (req, res) => {
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

    review.destroy()

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    })
})

module.exports = router;
