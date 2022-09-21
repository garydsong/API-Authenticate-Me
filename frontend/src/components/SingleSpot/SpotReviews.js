import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';

const SpotReviews = ({spotId}) => {

    const reviews = useSelector((state) => state.reviews.spot);
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);

    console.log('reviews hit', reviews)

    if (!reviews[0]) return console.log('waiting on reviews');

    return (
        <div id="inside-spot-reviews">
            <h1 id="reviews-header">Reviews</h1>
            <div id="reviews-grid">
                { Object.values(reviews).map((review, i) => (
                    <div key={i} id="review-card">
                        <div id="user-real-name">{review?.user?.firstName} {review?.user?.lastName}
                        {sessionUser && sessionUser.id === review.userId && (
                        <div id="del-edit-review-container">
                            <div className="delete-review-button">Delete</div>
                            <div id="space" />
                            <div className="edit-review-button">Edit</div>
                            <div id="space" />
                        </div>
                        )}
                        </div>
                        <div id="time-posted">{review?.updatedAt.slice(0, 10)}</div>
                        <div className="stars-reviews">★ {review?.stars}</div>
                        <div>{review?.review}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SpotReviews;
