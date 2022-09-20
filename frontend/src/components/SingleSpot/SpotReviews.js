import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { getReviews } from '../../store/reviews';

const SpotReviews = ({spotId}) => {
    const reviews = useSelector((state) => Object.values(state.reviews));
    const sessionUser = useSelector((state) => state.session.user);
    const spot = useSelector((state) => state.spots[spotId])
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getReviews(spotId))
    }, [dispatch, spotId]);

    return (
        <div>
            <h1>Reviews</h1>
            <div>
                { reviews.map((review, i) => (
                    <div key={i}>
                        <h3>{review.userId}</h3>
                        <h3>{review.stars}</h3>
                        <h3>{review.review}</h3>
                    </div>
                ))}
            </div>
        </div>
    )
}


export default SpotReviews;
