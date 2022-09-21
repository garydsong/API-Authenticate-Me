import React, { useState, useEffect } from "react";
import { updateSpot } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import './EditSpotForm.css'
import { useHistory } from "react-router-dom";

const EditSpot = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const spot = useSelector(state => state.spots.singleSpot)

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    console.log('edit spot form hitting')

    useEffect(() => {
        const errors = [];
        if (!name || name.length > 40) errors.push('Please enter a valid name.');
        if (!address || address.length > 40) errors.push('Please enter a valid address.');
        if (!city || city.length > 20) errors.push('Please enter a valid city.');
        if (!state || state.length > 15) errors.push('Please enter a valid state.');
        if (!country || country.length > 20) errors.push('Please enter a valid country.');
        if (!description) errors.push('Please enter a description.');
        if (!price || typeof +price !== 'Number') errors.push('Please enter a valid price');
        if (!lat || typeof +lat !== 'Number') errors.push('Please enter a valid latitude');
        if (!lng || typeof +lng !== 'Number') errors.push('Please enter a valid longitude');

        setValidationErrors(errors)
    }, [name, address, city, state, country, description, price, lat, lng]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)
        console.log('e', spot)

        const editSpot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
            lat,
            lng
        }

        const updatedSpot = await dispatch(updateSpot(editSpot, spot.id));
        console.log('UPDATESPOT', updatedSpot)

        if (updatedSpot) {
            history.push(`/spots/${updatedSpot.id}`)
        }
    }

    return (

        <div className="main-create-spot">
            <div className="vert-space"></div>
            <div className="create-spot-form">

                {!validationErrors.length && submitted && (
                    <div>
                        <ul> errors:
                            {validationErrors.map((e) => (
                                <li key={e}>{e}</li>
                            ))}
                        </ul>
                    </div>
                )}
                <form className="create-spot-form" onSubmit={onSubmit}>
                    <label>
                        Name
                        <input
                            id="spot-name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Address
                        <input
                            id="spot-address"
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        City
                        <input
                            id="spot-city"
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        State
                        <input
                            id="spot-state"
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Country
                        <input
                            id="spot-country"
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Description
                        <textarea
                            id="spot-description"
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Price
                        <input
                            id="spot-price"
                            type="text"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
                        />
                    </label>

                    <label>
                        Latitude
                        <input
                            id="spot-lat"
                            type="text"
                            value={lat}
                            onChange={(e) => setLat(e.target.value)}
                        />
                    </label>

                    <label>
                        Longitude
                        <input
                            id="spot-lng"
                            type="text"
                            value={lng}
                            onChange={(e) => setLng(e.target.value)}
                        />
                    </label>

                    <button id="submit" type="submit">Edit Spot</button>
                </form>
            </div>

        </div>
    );
};

export default EditSpot;
