import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"
import { getSingleSpot, deleteSpot, } from "../../store/spots";
import './SingleSpot.css'

const SingleSpot = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)
    // const imageUrl = useSelector(state => state.spots.singleSpot.SpotImages[0])

    console.log('cl ss', spot)

    useEffect(() => {
        dispatch(getSingleSpot(spotId))
    }, [dispatch])

    // if (!imageUrl.url) return null;
    // console.log('url value', spot.SpotImages[0])
    const deleteHandler = async () => {
            dispatch(deleteSpot(spotId))
            alert('Spot deleted.')
            history.push('/')
    }


    return (

        <div className="single-spot-main">
            <div className="single-spot-top ">
                    <>
                <h1>{spot.name}</h1>
                <h2>{spot.address}</h2>
                <h3>{spot.description}</h3>
                <h3>★{spot.avgRating}</h3>
                {/* breaks on refresh without optional chaining will add isLoaded later */}
                <img id="main-img" src={spot.SpotImages ? spot.SpotImages[0]?.url : 'https://i.imgur.com/8DQUBo8.png'}/>

                <h3>${spot.price}</h3>

                { sessionUser && sessionUser.id === spot.ownerId && (
                <div>
                <div onClick={deleteHandler} className="delete-spot-button">Delete</div>
                {/* <button onClick='#' className="edit-spot-button">Edit</button> */}
                </div>
                )}
                </>
            </div>
        </div>
    )
}

export default SingleSpot
