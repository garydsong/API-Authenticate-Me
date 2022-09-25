import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, NavLink } from "react-router-dom"
import { getSingleSpot, deleteSpot, getSpots } from "../../store/spots";
import { getReviews, resetReviews } from "../../store/reviews";
import EditSpot from "../EditSpotForm";
import SpotReviews from "./SpotReviews";
import SpotForm from "../SpotForm";
import CreateReview from "../ReviewForm";
import './SingleSpot.css'

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    // const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)
    const allSpots = useSelector(state => state.spots)
    const [showForm, setShowForm] = useState(false);
    const [reviewExists, setReviewExists] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const reviews = useSelector((state) => state.reviews)

    let spot;

    const reviewsList = Object.values(reviews);


    useEffect(() => {
        const dispatchRes = dispatch(getSingleSpot(spotId))
        setReviewExists(false)


        for (let i = 0; i < reviewsList.length; i++) {
            if (sessionUser && sessionUser.id === reviewsList[i].userId) {
                setReviewExists(true)
            } else {
                setReviewExists(false)
            }
        }

        dispatch(getSpots()).then( () => setIsLoaded(true))

    }, [dispatch, reviews, SpotReviews, SpotForm, resetReviews])

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




    if (!spot) return null

    return isLoaded && (

        <div className="single-spot-main">
            {spot?.id &&
                <div className="single-spot-top ">
                    <>
                        <h1>{spot?.name}</h1>
                        <h2>{spot?.address}</h2>
                        <h3>{spot?.description}</h3>
                        <h3 id="single-spot-reviews-container">
                            <div id="avg-rating">★ {spot.avgRating > 0 ? spot.avgRating : 'New'}</div>
                            {/* <div id="leave-a-review" onClick={openMenu}>Leave a Review</div> */}
                            {sessionUser && sessionUser.id !== spot.ownerId && !reviewExists && (
                            <NavLink to={`/spots/${spot.id}/reviews`}>
                            <div id="leave-a-review">Leave a Review</div>
                            </NavLink>
                            )}
                        </h3>
                        {/* {showMenu && (
                            <div id="review-dropdown">
                                <div id="closeMenu" onClick={(() => setShowMenu(false))}>x</div>
                                <CreateReview />
                            </div>
                        )} */}
                        {/* breaks on refresh without optional chaining will add isLoaded later */}
                        <div className="spot-details-mid">
                            <img id="main-img" src={spot.previewImage ? spot.previewImage : 'https://i.imgur.com/xCOjy14.gif'} />
                            <div id="mid-divider"></div>
                            <div id="reviews-container">
                                <SpotReviews spotId={spotId} />
                            </div>
                        </div>
                        <h3>${spot.price}</h3>

                        {sessionUser && sessionUser.id === spot.ownerId && (
                            <div id="del-edit-container">
                                <div onClick={deleteHandler} className="delete-spot-button">Delete</div>
                                {/* <div onClick={editHandler} className="edit-spot-button">Edit</div> */}
                                <NavLink to={`/spots/${spot.id}/edit`}><div onClick={editHandler} className="edit-spot-button">Edit</div></NavLink>
                            </div>
                        )}

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
