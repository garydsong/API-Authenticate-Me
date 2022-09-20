import { csrfFetch } from "./csrf";

const POST_REVIEW = '/reviews/postReview'
const GET_REVIEWS = '/reviews/getReviews'

const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    };
};

const getAllReviews = (reviews) => {
    return {
        type: GET_REVIEWS,
        reviews
    };
};

export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${spotId}/create`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(postReview(newReview))
        return newReview
    };
};

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/reviews/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    };
};

const initialState = {};
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        };

        case GET_REVIEWS: {
            const allReviews = action.reviews;
            return { ...allReviews };
        };

        default:
            return state;
    };
};

export default reviewReducer;
