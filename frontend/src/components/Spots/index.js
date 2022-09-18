import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spots";


const Spots = ({ spots }) => {
    const dispatch = useDispatch();
    const allSpots = Object.values(spots)
    console.log('component', spots)

    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (

        <div className="spots-main">

            {allSpots.map(e => (
                <div className="new-spot">
                    <img id="spot-img" src={`${e.previewImage}`} />
                    <div className="name-review">
                        <div className="name"><b>{e.name}</b></div>
                        <div className="review">{'★ 0'}</div>
                    </div>
                    <div className="city">{e.state}, {e.city}</div>
                    <div className="country">{e.country}</div>
                    <div classNmae="price"><b>${e.price}</b> night</div>
                </div>

            ))}
        </div>
    )
}


export default Spots;
