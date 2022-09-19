const GET_SPOTS = 'spots/getSpots';
const GET_SINGLE_SPOT = 'spots/getSingleSpot'

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

export const getSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        let spots = await response.json();
        dispatch(loadSpots(spots));
    };
};

export const getSingleSpot = (id) => async (dispatch) => {
    const response = await fetch(`/api/spots/${id}`)
    if (response.ok) {
        let spot = await response.json()
        console.log('single spot', spot)
        dispatch(loadSingleSpot(spot))
    }
}

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
    default:
        return state;
    };
};

export default spotReducer
