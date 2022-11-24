import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { getSingleSpot, deleteSpot, getSpots } from "../../store/spots";
import { getReviews, resetReviews } from "../../store/reviews";
import { getSpotBookingsThunk } from "../../store/bookings";
import EditSpot from "../EditSpotForm";
import SpotReviews from "./SpotReviews";
import SpotForm from "../SpotForm";
import CreateReview from "../ReviewForm";
import BookingForm from "../BookingForm";
import './SingleSpot.css'

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots)
    const spotBookings = useSelector(state => state.bookings.spot);
    const [showForm, setShowForm] = useState(false);
    const [reviewExists, setReviewExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector((state) => state.reviews)

    let spot;

    const reviewsList = Object.values(reviews);


    useEffect(() => {
        const dispatchRes = dispatch(getSingleSpot(spotId))
        setReviewExists(false)

        dispatch(getSpotBookingsThunk(spotId));


        for (let i = 0; i < reviewsList.length; i++) {
            if (sessionUser && sessionUser.id === reviewsList[i].userId) {
                setReviewExists(true)
            }
        }

        dispatch(getSpots()).then(() => setIsLoaded(true))

    }, [dispatch, reviews, SpotReviews, SpotForm, resetReviews, sessionUser])

    if (allSpots) spot = allSpots.allSpots[spotId]


    // if (!imageUrl.url) return null;

    const deleteHandler = async () => {
        dispatch(deleteSpot(spotId))
        alert('Spot deleted.')
        history.push('/')
    }

    const editHandler = async () => {
        return setShowForm(true)
    }

    // const [showMenu, setShowMenu] = useState(false);

    // const openMenu = () => {
    //     if (showMenu) return;
    //     setShowMenu(true);
    // };

    // useEffect(() => {
    //     if (!showMenu) return;

    //     const closeMenu = () => {
    //         setShowMenu(false);
    //     };

    //     document.querySelector('#review-dropdown').addEventListener('keypress', function (e) {
    //         if (e.key === 'Enter') {
    //             closeMenu()

    //         }
    //     });

    //     return () => document.removeEventListener("keypress", closeMenu);
    // }, [showMenu]);


    console.log('spot', spot)
    // console.log('spotsss', allSpots.singleSpot.Owner.firstName)

    if (!spot) return null

    return isLoaded && (

        <div className="single-spot-main">
            {spot?.id &&
                <div className="single-spot-top ">
                    <>
                        <div id="top-most">
                            <div id="top-most-left">
                                <div id="spot-title">
                                    {spot?.name}
                                </div>
                                <div id="spot-title-ratings">
                                    <div id="avg-rating">★ {spot.avgRating > 0 ? spot.avgRating : 'New'} • {reviewsList.length} reviews • {spot?.city}, {spot?.state}, {spot?.country}</div>
                                </div>
                            </div>
                            <div id="top-most-right">
                                {sessionUser && sessionUser.id === spot.ownerId && (
                                    <div id="del-edit-container">
                                        <div onClick={deleteHandler} className="delete-spot-button">Delete</div>
                                        {/* <div onClick={editHandler} className="edit-spot-button">Edit</div> */}
                                        <NavLink to={`/spots/${spot.id}/edit`}><div onClick={editHandler} className="edit-spot-button">Edit</div></NavLink>
                                    </div>
                                )}
                            </div>

                        </div>




                        {/* <div id="leave-a-review" onClick={openMenu}>Leave a Review</div> */}

                        {/* {showMenu && (
                            <div id="review-dropdown">
                                <div id="closeMenu" onClick={(() => setShowMenu(false))}>x</div>
                                <CreateReview />
                            </div>
                        )} */}
                        {/* breaks on refresh without optional chaining will add isLoaded later */}
                        <div className="spot-details-mid">
                            <img id="main-img" src={spot.previewImage ? spot.previewImage : 'https://i.imgur.com/xCOjy14.gif'} />
                            <div id="img-grid">
                                <img id="top-left-grid" src="https://i.imgur.com/fKbnlWn.png" />
                                <img id="top-right-grid" src="https://i.imgur.com/pHNxVCo.png" />
                                <img id="bottom-left-grid" src="https://i.imgur.com/5lwDJmf.png" />
                                <img id="bottom-right-grid" src="https://i.imgur.com/SGfgfZr.png" />
                            </div>
                        </div>
                        <div id="descript-under-img">
                            <div id="descript-left">
                                <div id="descript-title">
                                    <div id="descript-hosted-by">Entire spot hosted by {allSpots?.singleSpot?.Owner?.firstName}</div>
                                    <div id="descript-guests-beds">2 guests • 1 bedroom • 1 bed • 1 bath</div>
                                </div>
                                <div id="descript-aircover">
                                    <img id="aircover-logo" src="https://i.imgur.com/ht28t42.png" />
                                    <div id="aircover-desc">Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.</div>
                                </div>
                                <div id="actual-descript">
                                    <div>{spot?.description}</div>
                                </div>
                            </div>

                            <div id="descript-mid"></div>


                            {/* BOOKING COMPONENT GOES HERE */}

                            {/* <div id="descript-right">
                                <div id="price-a-night">
                                    <div id="price-a-night-cost">${spot.price} <span>night</span></div>
                                    <div id="price-a-night-review">★ {spot.avgRating > 0 ? spot.avgRating : 'New'} • {reviewsList.length} reviews</div>
                                </div>
                                <div id="book-a-night">
                                    <div id="book-a-night-top-left" />
                                    <div id="book-a-night-top-right" />
                                    <div id="book-a-night-bottom" />
                                </div>
                                <div id="reserve">Sorry no reservations available</div>
                                <div id="total-cost"><a>Total cost</a> <a>${spot.price}</a></div>
                            </div> */}

                            <BookingForm
                            spot={spot}
                            user={sessionUser}
                            bookings={spotBookings}
                            />
                        </div>
                        <div id="mid-divider"></div>

                        <div id="reviews-container">
                            <h3 id="single-spot-reviews-container">
                                {sessionUser && sessionUser.id !== spot.ownerId && !reviewExists && (
                                    <NavLink to={`/spots/${spot.id}/reviews`}>
                                        <div id="leave-a-review">Leave a Review</div>
                                    </NavLink>
                                )}
                            </h3>
                            <SpotReviews spotId={spotId} />
                        </div>




                        {showForm && (
                            <div>
                                <div id="left-side">
                                    {/* <EditSpot /> */}
                                </div>
                                <div id="footer-space"></div>
                            </div>
                        )}
                    </>
                </div>
            }
        </div>
    )
}

export default SingleSpot
