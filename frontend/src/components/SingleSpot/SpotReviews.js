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
                        <h3 id="user-real-name">{review[1]?.User?.firstName} {review[1]?.User?.lastName}</h3>
                        <span id="time-posted">{review[1]?.updatedAt}</span>
                        <h3>★ {review[1]?.stars}</h3>
                        <span>{review[1]?.review}</span>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SpotReviews;
