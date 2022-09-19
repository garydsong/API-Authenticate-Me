import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom"
import './SingleSpot.css'

const SingleSpot = ({spots}) => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const spot = spots[spotId]

    return (
        <div className="single-spot-main">
            <div className="single-spot-top ">
                <h1>{spot.name}</h1>
                <h2>{spot.address}</h2>
                <h3>{spot.description}</h3>
                <img id="main-img" src={spot.previewImage}/>
                <h3>${spot.price}</h3>
                <p>{console.log('hit spec spot', spot)}</p>
            </div>
        </div>
    )
}

export default SingleSpot
