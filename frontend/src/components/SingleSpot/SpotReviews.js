import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { deleteReview, getReviews } from '../../store/reviews';
import { useHistory, useParams } from 'react-router-dom';

const SpotReviews = ({ spotId }) => {
    const history = useHistory();
    const reviews = useSelector((state) => state.reviews);
    const reviewList = Object.values(reviews)
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [deleted, setDeleted] = useState(false);
    // const [isLoaded, setIsLoaded] = useState(false);
    // reviewList.map((review, i) => {
    // console.log(review.user)
    // })
    useEffect(() => {
        dispatch(getReviews(spotId))
        // .then(() => {
        //     setIsLoaded(true)
        // });


    }, [dispatch, getReviews]);

    const deleteReviewHandler = (review) => async (e) => {
        e.preventDefault();
        setDeleted(true)
        await dispatch(deleteReview(review));
        alert('Review deleted.')
        history.push(`/spots/${spotId}`)
    }


    return (
        <>

        <div id="inside-spot-reviews">

            <h1 id="reviews-header">{reviews?.length} Reviews</h1>

            <div id="reviews-grid">
                { reviewList.map((review, i) => (
                    <div key={i} id="review-card">

                        <div id="user-real-name">{review?.user?.firstName} {review?.user?.lastName}
                        {sessionUser && sessionUser.id === review.userId && (
                            <div id="del-edit-review-container">
                            <div onClick={deleteReviewHandler(review?.id)} className="delete-review-button">Delete</div>
                            <div id="space" />
                        </div>
                        )}
                        </div>
                        <div id="time-posted">{review?.updatedAt.slice(0, 10)}</div>
                        <div className="stars-card-reviews">★{review.stars}</div>
                        <div>{review?.review}</div>
                    </div>
                ))}
            </div>

        </div>

        </>
    )
}


export default SpotReviews;
