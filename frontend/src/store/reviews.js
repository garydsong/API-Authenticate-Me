import { csrfFetch } from "./csrf";

const POST_REVIEW = '/reviews/postReview';
const GET_REVIEWS = '/reviews/getReviews';
const DELETE_REVIEW = '/reviews/deleteReview';
const RESET_REVIEWS = '/reviews/resetReviews';


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

export const resetReviews = () => {
    return {
        type: RESET_REVIEWS
    }
}


// THUNKS
export const createReview = (spotId, review) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(review)
    });

    if (response.ok) {
        const newReview = await response.json();
        dispatch(postReview(newReview));
        return newReview;
    }
};

export const getReviews = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)
    console.log('get reviews thunk', response)

    if (response.ok) {
        const reviews = await response.json();
        dispatch(getAllReviews(reviews));
        return reviews;
    };
};

export const getReviewsAvg = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        // const reviews = await response.json();
        // const reviewsArr = reviews.Reviews
        // const sum = reviewsArr.reduce((acc, review) => {
        //     acc += +review.stars
        //     return acc
        // }, 0)

        // let avg;

        // if (sum) {
        //     avg = (sum/reviewsArr.length).toFixed(2)
        //  } else {
        //     avg = 0
        //  }

        // return avg;
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
const initialState = {};
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        };

        case GET_REVIEWS: {
            const newState = {}
            action.reviews.Reviews.forEach((review) => {
                newState[review.id] = review
            })

            return newState;
        };

        case DELETE_REVIEW: {
            const newState = { ...state };
            delete newState[action.id];
            return newState;
        };

        case RESET_REVIEWS: {
            return initialState;
        };

        default:
            return state;
    };
};

export default reviewReducer;
