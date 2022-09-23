import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot';
const CREATE_SPOT = 'spots/createSpot';
const DELETE_SPOT = 'spots/deleteSpot';
const UPDATE_SPOT = 'spots/updateSpot';
const CREATE_SPOT_IMAGE = 'spots/createSpotImage';
const RESET_SPOTS = 'spots/resetSpots';


// ACTIONS
const loadSpots = (payload) => {
    return {
        type: GET_SPOTS,
        payload
    };
};

const loadSingleSpot = (spot) => {
    return {
        type: GET_SINGLE_SPOT,
        spot
    };
};

const createASpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    };
};

const removeSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    };
};

const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    };
};

const createSpotImage = (img) => {
    return {
        type: CREATE_SPOT_IMAGE,
        img
    };
};

export const resetSpots = () => {
    return {
        type: RESET_SPOTS
    };
};

// THUNKS
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        let spots = await response.json();

        spots = spots.Spots

        for (let i = 0; i < spots.length; i++) {
            let res = await fetch(`/api/spots/${spots[i].id}/reviews`)
            const reviews = await res.json();
            const reviewsArr = reviews.Reviews
            const sum = reviewsArr.reduce((acc, review) => {
                acc += +review.stars
                return acc
            }, 0)

            let avg;
            if (sum) {
                avg = (sum/reviewsArr.length).toFixed(2)
            } else {
                avg = 0
            }

            spots[i].avgRating = avg
        }
        console.log('new', spots)
        dispatch(loadSpots(spots));
        return spots;
    };
};

export const getSingleSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        let spot = await response.json();
        console.log('single spot', spot);
        dispatch(loadSingleSpot(spot));
        return spot;
    };
};

export const createSpot = (payload) => async (dispatch) => {
    console.log(payload)
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createASpot(spot));
        return spot;
    };

};

export const deleteSpot = (id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        dispatch(removeSpot(id));
        return true;
    };
};

export const updateSpot = (payload, id) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${id}`,{
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(editSpot(spot))
        return spot;
    }

}

export const createImage = (spotId, img) => async (dispatch) => {
    console.log(img)
    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        body: JSON.stringify(img)
    });

    if (response.ok) {
        const image = await response.json()
        dispatch(createSpotImage(image))
        return image;
    };
};

// REDUCERS
const initialState = { allSpots: {}, singleSpot: { SpotImages: [] } };
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            let allSpots = {};
            action.payload.forEach(spot => allSpots[spot.id] = spot);

            return { allSpots: { ...allSpots }, singleSpot: { SpotImages: [] } };
        };

        case GET_SINGLE_SPOT: {
            let singleSpot = {};
            singleSpot = { ...action.spot };
            console.log('single spot222', singleSpot)
            return { ...state, singleSpot };
        };

        case CREATE_SPOT: {
            let singleSpot = {};
            singleSpot = { ...action.payload };
            let newState = { ...state, singleSpot };
            newState.allSpots[action.payload.id] = {...action.payload};

            return newState;
        };

        case DELETE_SPOT: {
            let newState = { ...state };
            delete newState[action.id];

            return newState;
        };

        case UPDATE_SPOT: {
            let newState = { ...state };
            newState.singleSpot = action.spot;

            return newState;
        };

        case CREATE_SPOT_IMAGE: {
            let SpotImages = [ action.img ];
            let newState = { ...state, singleSpot: SpotImages };

            return newState;
        };

        case RESET_SPOTS: {
            return initialState;
        };

    default:

        return state;
    };
};

export default spotReducer
