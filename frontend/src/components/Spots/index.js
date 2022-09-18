import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spots";


const Spots = ({spots}) => {
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
                        </div>
                    ))}
        </div>
    )
}


export default Spots;
