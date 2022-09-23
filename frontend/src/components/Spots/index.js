import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getSpots } from "../../store/spots";
import { NavLink } from "react-router-dom";
import StarAvgForSpots from "./StarAvgForSpots";
import { getReviewsAvg } from "../../store/reviews";
import { useSelector } from "react-redux";


const Spots = () => {
    const dispatch = useDispatch();
    const [avgRating, setAvgRating] = useState(0);
    // const [ reviewState, setReviewState ] = useState(new Array(100));
    const spots = useSelector((state) => state.spots)
    const allSpots = Object.values(spots.allSpots)

    console.log('comp', spots)

    useEffect(() => {
        console.log('getting all spots for the homepage')
        dispatch(getSpots())
    }, [dispatch])


    // useEffect(() => {
    //     for (let i = 0; i < allSpots.length; i++) {
    //         // console.log('allspot', allSpots[i])
    //         setReviewState(reviewState[i] = getRatingAvg(allSpots[i].id))
    //     }
    // })

    // useEffect(() => {
    //     let response = responseFunction()
    //     setAvgRating(response)
    //     if (response === 0) {
    //         setAvgRating('No reviews')
    //     }

    // }, [dispatch, spots?.id]);

    return (
        <>
            <div className="spots-main">

                {allSpots.map(e => (
                    <NavLink to={`/spots/${e.id}`}>
                        <div className="new-spot">
                            <img id="spot-img" src={`${e.previewImage}`} />
                            <div className="name-review">
                                <div className="name"><b>{e.name}</b></div>
                                <div className="review"><b>★{e.avgRating}</b></div>
                            </div>
                            <div className="city">{e.city}, {e.state}</div>
                            <div className="country">{e.country}</div>
                            <div className="price"><b>${e.price}</b> night</div>
                        </div>
                    </NavLink>
                ))}

            </div>
            <div id="space-for-footer"></div>
        </>
    )
}


export default Spots;
