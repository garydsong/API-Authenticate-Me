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
            <div>
                { Object.values(reviews).map((review, i) => (
                    <div key={i} id="review-card">
                        <h3 id="user-real-name">{review?.user?.firstName} {review?.user?.lastName}</h3>
                        <span id="time-posted">{review?.updatedAt.slice(0, 10)}</span>
                        <h3>★ {review?.stars}</h3>
                        <span>{review?.review}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SpotReviews;
