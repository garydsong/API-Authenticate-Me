import { csrfFetch } from "./csrf";

const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot'
const CREATE_SPOT = 'spots/createSpot'
const DELETE_SPOT = 'spots/deleteSpot'
const UPDATE_SPOT = 'spots/updateSpot'


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
    }
}

const createASpot = (payload) => {
    return {
        type: CREATE_SPOT,
        payload
    }
}

const removeSpot = (id) => {
    return {
        type: DELETE_SPOT,
        id
    }
}

const editSpot = (spot) => {
    return {
        type: UPDATE_SPOT,
        spot
    }
}

// THUNKS
export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        let spots = await response.json();
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

// REDUCERS
const initialState = { allSpots: {}, singleSpot: {SpotImages: []} };
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
            let allSpots = {};
            action.payload.Spots.forEach(spot => allSpots[spot.id] = spot);

            return {...state, allSpots};
        };

        case GET_SINGLE_SPOT: {
            let singleSpot = {};
            singleSpot = { ...action.spot };

            return {...state, singleSpot};
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
        }

    default:

        return state;
    };
};

export default spotReducer
