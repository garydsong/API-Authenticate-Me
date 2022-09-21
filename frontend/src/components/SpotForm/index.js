import React, { useState, useEffect } from "react";
import { createSpot, createImage } from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import './SpotForm.css'
import { useHistory } from "react-router-dom";

const SpotForm = ({ spot }) => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(0);
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);
    const [image, setImage] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    useEffect(() => {
        const errors = [];
        if (!name || name.length > 40) errors.push('Please enter a valid name.');
        if (!address || address.length > 40) errors.push('Please enter a valid address.');
        if (!city || city.length > 20) errors.push('Please enter a valid city.');
        if (!state || state.length > 15) errors.push('Please enter a valid state.');
        if (!country || country.length > 20) errors.push('Please enter a valid country.');
        if (!description) errors.push('Please enter a description.');
        if (!price || typeof +price !== 'Number') errors.push('Please enter a valid price');
        // if (!lat || typeof +lat !== 'Number') errors.push('Please enter a valid latitude');
        // if (!lng || typeof +lng !== 'Number') errors.push('Please enter a valid longitude');

        setValidationErrors(errors)
    }, [name, address, city, state, country, description, price, image]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        spot = {
            name,
            address,
            city,
            state,
            country,
            description,
            price,
        }

        const newSpot = await dispatch(createSpot(spot));
        console.log('NEWSPOT', newSpot)

        if (newSpot) {
            console.log('lets find out')
            const SpotImages = ({
                  url: image,
                  preview: true})

            await dispatch(createImage(newSpot.id, SpotImages))
            history.push(`/spots/${newSpot.id}`)
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
                        Image URL
                        <input
                            id="spot-lat"
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </label>

                    <button id="submit" type="submit">Create Spot</button>
                </form>
            </div>
        </div>
    )
}

export default SpotForm

// import React, { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Redirect } from "react-router-dom";
// import * as sessionActions from "../../store/session";


// function SpotForm() {
//     const dispatch = useDispatch();
//     const sessionUser = useSelector((state) => state.session.user);
//     const [firstName, setFirstName] = useState("");
//     const [lastName, setLastName] = useState("");
//     const [email, setEmail] = useState("");
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");
//     const [errors, setErrors] = useState([]);

//     if (sessionUser) return <Redirect to="/" />;

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         if (password === confirmPassword) {
//             setErrors([]);
//             return dispatch(sessionActions.signup({ firstName, lastName, email, username, password }))
//                 .catch(async (res) => {
//                     const data = await res.json();
//                     if (data && data.errors) setErrors(data.errors);
//                 });
//         }
//         return setErrors(['Confirm Password field must be the same as the Password field']);
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <br /><br /><br /><br /><br />
//             <ul>
//                 {errors.map((error, idx) => <li key={idx}>{error}</li>)}
//             </ul>
//             <label>
//                 First Name
//                 <input
//                     type="text"
//                     value={firstName}
//                     onChange={(e) => setFirstName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Last Name
//                 <input
//                     type="text"
//                     value={lastName}
//                     onChange={(e) => setLastName(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Email
//                 <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Username
//                 <input
//                     type="text"
//                     value={username}
//                     onChange={(e) => setUsername(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Password
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                 />
//             </label>
//             <label>
//                 Confirm Password
//                 <input
//                     type="password"
//                     value={confirmPassword}
//                     onChange={(e) => setConfirmPassword(e.target.value)}
//                     required
//                 />
//             </label>
//             <button type="submit">Sign Up</button>
//         </form>
//     );
// }

// export default SpotForm;
