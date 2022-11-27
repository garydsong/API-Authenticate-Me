import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import './SearchSpots.css'

function SearchSpots({ search }) {
    const [spotList, setSpotList] = useState(null);

    useEffect(() => {
        setSpotList(search)
    }, [search])

    if (!search.length) return (
        <div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div>Nothing here.</div>
        </div>
    )
    return(
        <>
        {Object.values(spotList || search).map((spot, i) => (
            <div>
                <br></br><br></br><br></br>
                {spot.name}
                {console.log('searched', spot)}
            </div>
        ))}
        </>
    )
}

export default SearchSpots
