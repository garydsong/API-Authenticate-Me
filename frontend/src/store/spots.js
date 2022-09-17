const GET_SPOTS = 'spots/getSpots';

const loadSpots = (payload) => {
    return {
        type: GET_SPOTS,
        payload
    };
};

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        let spots = await response.json();
        dispatch(loadSpots(spots));
    };
};

const initialState = {};
const spotReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_SPOTS: {
        const allSpots = {};
        action.payload.Spots.forEach(spot => allSpots[spot.id] = spot);
        return {...state, ...allSpots};
        }
    default:
        return state;
    };
};

export default spotReducer
