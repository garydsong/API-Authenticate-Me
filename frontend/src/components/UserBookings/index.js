import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { deleteBookingThunk, getUserBookingsThunk } from "../../store/bookings";
import "./UserBookings.css"
import baggage from "../../assets/icons/baggage.svg"
import checked from "../../assets/icons/check-circle.svg"
import family from "../../assets/pictures/family.png"
import { NavLink } from "react-router-dom";

function UserBookings() {
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)
    const userBookings = useSelector(state => state.bookings.user)
    const [isLoaded, setIsLoaded] = useState(false);


    // console.log('user bookings', Object.values(userBookings))


    useEffect(() => {
        dispatch(getUserBookingsThunk())
            .then(() => { setIsLoaded(true) })
    }, [dispatch]);


    // useEffect(() => {
    //     if (userBookings) {
    //         const today = new Date(Date.now());
    //         Object.values(userBookings).forEach(booking => {
    //             const parsedEndDate = new Date(booking.endDate + "T00:00:00");
    //             if (today > parsedEndDate) dispatch(deleteBookingThunk(booking.id));
    //         });
    //     }
    // }, [dispatch, userBookings]);

    // const handleDelete = (id) => {
    //     dispatch(deleteBookingThunk(id))
    // }

    return isLoaded && (
        <>
            <br></br><br></br><br></br>
            {console.log(userBookings)}
            <div className="user-booking-page-wrapper">
                <div className="bookings-content-wrapper">
                    <h1>Trips</h1>
                    <div>
                        {!Object.values(userBookings).length ?
                            (
                                <>
                                    <div className="no-trip-wrapper">
                                        <div id="no-trip">
                                            <img id="baggage-icon" src={baggage} />
                                            <h2>No trips booked...yet!</h2>
                                            <h3>Time to dust off your bags and start planning your next adventure</h3>
                                            <NavLink id="start-searching-button" to="/">
                                                Start searching
                                            </NavLink>
                                        </div>
                                        <img id="family-photo" src={family} />
                                    </div>
                                </>

                            ) : (

                                <>
                                    {Object.values(userBookings).map((e) => {
                                        return (
                                            <>
                                                <div className="booking-card-wrapper">
                                                    <div className="booking-card">
                                                        <img id="booking-preview-img" src={e.Spot.previewImage} />
                                                        <div className="booking-card-details">
                                                            <NavLink to={`/spots/${e.Spot.id}`} className="booking-card-spot-name">{e.Spot.name}</NavLink>

                                                            <div>{e.Spot.address}</div>

                                                            <div>{e.Spot.city}, {e.Spot.state}</div>

                                                            <div>Check-in: {e.startDate} Checkout: {e.endDate}</div>

                                                            <div id="booked-wrapper">
                                                                <img id="check-icon" src={checked} />
                                                                Booked: {e.createdAt.slice(0, 10)}
                                                            </div>

                                                            <button id="delete-booking-button" onClick={() => dispatch(deleteBookingThunk(e.id))}>Delete booking</button>
                                                        </div>
                                                    </div>

                                                </div>

                                            </>
                                        )
                                    })}
                                </>
                            )}
                    </div>
                </div>
            </div>
        </>
    )
}


export default UserBookings
