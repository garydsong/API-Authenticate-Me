import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSpots } from "../../store/spots";


const Spots = () => {
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getSpots())
    }, [dispatch])

    return (
        <div>spots page</div>
    )
}


export default Spots;
