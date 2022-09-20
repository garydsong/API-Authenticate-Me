import { csrfFetch } from "./csrf";


const POST_REVIEW = '/reviews/postReview'

const postReview = (review) => {
    return {
        type: POST_REVIEW,
        review
    }
}

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

const initialState = {};
const reviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case POST_REVIEW: {
            const newState = { ...state };
            newState[action.review.id] = action.review;
            return newState;
        }
    }
}


export default reviewReducer;
