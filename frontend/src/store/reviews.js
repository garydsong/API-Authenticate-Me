import { csrfFetch } from "./csrf";

const POST_REVIEW = '/reviews/postReview';
const GET_REVIEWS = '/reviews/getReviews';
const DELETE_REVIEW = '/reviews/deleteReview';


// ACTIONS
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

const removeReview = (id) => {
    return {
        type: DELETE_REVIEW,
        id
    };
};


// THUNKS
export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${spotId}/create`, {
        method: 'POST',
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(postReview(newReview));
        return newReview;
    };
};

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    };
};

export const deleteReview = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${id}`, {
        method: 'DELETE'
    });

    const review = await response.json();
    dispatch(removeReview(id));
    return review;
}


// REDUCERS
const initialState = { spot: {}, user: {} };
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        };

        case GET_REVIEWS: {
            let allReviews = {};
            action.reviews.Reviews.forEach(review => {
                console.log('reviews reducer', review)
                allReviews[review.id] = review
            });

            return {...state, spot: {...allReviews}};
        };

        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        };

        default:
            return state;
    };
};

export default reviewReducer;
