import { csrfFetch } from "./csrf";



const CREATE_BOOKING = '/bookings/CREATE_BOOKING';
const GET_SPOT_BOOKINGS = '/bookings/GET_SPOT_BOOKINGS';
const GET_USER_BOOKINGS = '/bookings/GET_USER_BOOKINGS';
const UPDATE_BOOKING = '/bookings/UPDATE_BOOKING';
const DELETE_BOOKING = '/bookings/DELETE_BOOKING';



const createBooking = (booking) => ({
    type: CREATE_BOOKING,
    payload: booking
});

const getSpotBookings = (bookings) => ({
    type: GET_SPOT_BOOKINGS,
    payload: bookings
});

const getUserBookings = (bookings) => ({
    type: GET_USER_BOOKINGS,
    payload: bookings
});

const updateBooking = (booking) => ({
    type: UPDATE_BOOKING,
    payload: booking
});

const deleteBooking = (bookingId) => ({
    type: DELETE_BOOKING,
    payload: bookingId
});



export const createBookingThunk = (spotId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    console.log('create user booking thunk', response)

    if (response.ok) {
        const newBooking = await response.json();
        dispatch(createBooking(newBooking));
        return newBooking;
    };
};

export const getSpotBookingsThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`);

    if (response.ok) {
        const spotBookings = await response.json();
        dispatch(getSpotBookings(spotBookings));
        return spotBookings;
    };
};

export const getUserBookingsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/bookings/current');
    console.log('get user booking thunk', response)
    if (response.ok) {
        const userBookings = await response.json();
        dispatch(getUserBookings(userBookings));
        return userBookings;
    };
};

export const updateBookingThunk = (bookingId, booking) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });

    if (response.ok) {
        const updatedBookingData = await response.json();
        dispatch(updateBooking(updatedBookingData));
        return updatedBookingData;
    };
};

export const deleteBookingThunk = (bookingId) => async (dispatch) => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deleted = await response.json();
        dispatch(deleteBooking(bookingId));
        return deleted;
    }
}



const initialState = { user: null, spot: null };

const bookingsReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {
        case CREATE_BOOKING:
            console.log('create spot bookings', action.payload)
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            const newBooking = { ...action.payload };
            newState.user[action.payload.id] = newBooking;

            return newState;

        case GET_SPOT_BOOKINGS:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            console.log('get spot bookings', action.payload)

            const newSpotBookings = {};
            action.payload.Bookings.forEach(booking => newSpotBookings[booking.id] = booking);
            newState.spot = newSpotBookings;

            return newState;

        case GET_USER_BOOKINGS:
            console.log('get user bookings reducer', action.payload)
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };

            const newUserBookings = {};
            action.payload.Bookings.forEach(booking => newUserBookings[booking.id] = booking);
            newState.user = newUserBookings;

            return newState;

        case UPDATE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            const updatedBooking = { ...action.payload };
            newState.user[action.payload.id] = updatedBooking;

            return newState;
        case DELETE_BOOKING:
            newState = { ...state, user: { ...state.user }, spot: { ...state.spot } };
            delete newState.user[action.payload];
            newState = { ...newState };

            return newState;

        default:
            return state;
    }
};

export default bookingsReducer;
