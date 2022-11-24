import React, { useState, useEffect } from 'react'
import { getSpotBookingsThunk, createBookingThunk } from '../../store/bookings'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import './BookingForm.css'

function BookingForm({ spot, user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [validationErrors, setValidationErrors] = useState([]);

    useEffect(() => {
        const errors = [];
        const today = new Date(Date.now());
        const parsedStartDate = new Date(startDate + "T00:00:00");
        const parsedEndDate = new Date(endDate + "T00:00:00");

        if (today > parsedStartDate || today > parsedEndDate) {
            errors.push("You cannot book past dates or the current day");
        }
        if (parsedStartDate > parsedEndDate) {
            errors.push("The check in date cannot be after the check out date");
        }

        setValidationErrors(errors);

    }, [startDate, endDate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) return alert("You must be logged in to book a spot!");
        if (user.id === spot.ownerId) return alert("An owner cannot book at his own home");

        const newBooking = {
            startDate,
            endDate
        }
        try {
            const createdBooking = await dispatch(createBookingThunk(spot.id, newBooking));
            if (createdBooking) {
                setValidationErrors([]);
                setStartDate("");
                setEndDate("");
                dispatch(getSpotBookingsThunk(spot.id));

                history.push(`/user/${user.id}/bookings`);
            }
        }

        catch (res) {
            const data = await res.json();
            const errors = [];
            if (data && data.message) {
                errors.push(data.message);
            }
            setValidationErrors(errors);
        }
    };

    return (
        <>
            <div id="descript-right">
                <form onSubmit={handleSubmit} className="form" id="form--create-booking">
                    {validationErrors.length > 0 && (
                        <div id="validations-bookings-box">
                            <ul className="list--errors">
                                {validationErrors.map((error) => <li key={error} className="error-li">{error}</li>)}
                            </ul>
                        </div>
                    )}
                    <div id="price-a-night">
                        {console.log('hm', spot)}
                        <div id="price-a-night-cost">${spot.price} <span>night</span>
                        </div>
                        <div id="price-a-night-review">
                            ★ {spot.avgRating > 0 ? spot.avgRating : 'New'}
                        </div>
                    </div>
                    <div id="book-a-night">
                        <div id="checkin-label">CHECK-IN</div>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                            className='form-field'
                            id="book-a-night-top-left"
                        />

                        <div id="checkout-label">CHECKOUT</div>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                            className='form-field'
                            id="book-a-night-top-right"
                        />

                    </div>
                    <button
                        type="submit"
                        disabled={validationErrors.length}
                        id="reserve">
                        Reserve
                    </button>
                    <div id="added-cost">
                        <div>Price per night</div>
                        <div>${spot.price}</div>
                    </div>
                    <div id="added-cost">
                        <div>Cleaning fee</div>
                        <div>$50</div>
                    </div>
                    <div id="added-cost-end">
                        <div>Service fee</div>
                        <div>$100</div>
                    </div>
                    <div id="total-cost"><a>Total cost</a> <a>
                        {endDate && startDate ?
                            ((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)) > 0 && <div> ${50 + 100 + spot.price * ((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24))} </div> : <div>...</div>}
                    </a>
                    </div>

                </form>
            </div>
        </>
    )
}

export default BookingForm
