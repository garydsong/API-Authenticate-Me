import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot'
const CREATE_SPOT = 'spots/createSpot'

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
    }
}

const createASpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        let spots = await response.json();
        dispatch(loadSpots(spots));
    };
};

export const getSingleSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`);
    if (response.ok) {
        let spot = await response.json();
        console.log('single spot', spot);
        dispatch(loadSingleSpot(spot));
    };
};

export const createSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(payload)
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(createASpot(spot));
    };
};

const initialState = { allSpots: {}, singleSpot: {SpotImages: []} };
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            const allSpots = {};
            action.payload.Spots.forEach(spot => allSpots[spot.id] = spot);
            return {...state, allSpots};
        };

        case GET_SINGLE_SPOT: {
            let singleSpot = {}
            singleSpot = { ...action.spot }
            return {...state, singleSpot}
        };

        case CREATE_SPOT: {
            let singleSpot = {}
            singleSpot = { ...action.payload }
            const newState = { ...state, singleSpot }
            newState.allSpots[action.payload.id] = {...action.payload}
            return newState;
        };

    default:
        return state;
    };
};

export default spotReducer
