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
    return (
        <>
            <br></br><br></br><br></br><br></br>
            <div className="top-search-tagline">Many great places to choose from</div>
            <div className="search-results-page-wrapper">

                {Object.values(spotList || search).map((spot, i) => (
                    <div className="search-card-wrapper">
                        <img id="search-card-img" src={spot.previewImage} />
                        <div className="search-card-detail-container">
                            <div className="search-card-name-rating">
                                <div id="search-card-spot-name">{spot.name}</div>
                                <div id="search-card-spot-name">★ {spot.avgRating < 1 ? 'New' : spot.avgRating}</div>
                            </div>
                            <div id="search-card-location">{spot.address}</div>
                            <div id="search-card-location">{spot.city}, {spot.state} in {spot.country}</div>
                        </div>
                        {console.log('searched', spot)}
                    </div>
                ))}
            </div>
        </>
    )
}

export default SearchSpots
