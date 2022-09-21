import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getReviews } from '../../store/reviews';
import { useParams } from 'react-router-dom';

const SpotReviews = ({spotId}) => {

    const reviews = useSelector((state) => Object.values(state.reviews));
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);

    console.log('reviews hit', reviews)

    return (
        <div id="inside-spot-reviews">
            <h1 id="reviews-header">Reviews</h1>
            <div>
                { reviews.map((review, i) => (
                    <div key={i} id="review-card">
                        <h3 id="user-real-name">{review[spotId]?.User?.firstName} {review[spotId]?.User?.lastName}</h3>
                        <span id="time-posted">{review[spotId]?.updatedAt.slice(0, 10)}</span>
                        <h3>★ {review[spotId]?.stars}</h3>
                        <span>{review[spotId]?.review}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SpotReviews;
