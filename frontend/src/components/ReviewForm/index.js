import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import { createReview } from "../../store/reviews";
import { useHistory } from "react-router-dom";
import './ReviewForm.css'

const CreateReview = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true)

        const starNum = +stars
        const newReview = {
            review,
            stars: starNum
        };
        console.log('nr', newReview)

        await dispatch(createReview(spotId, newReview))
        history.push(`/spots/${spotId}`)
    }


    return (
        <div>
            <form id="create-review-form" onSubmit={onSubmit}>
                <label>
                    Review
                    </label>
                    <textarea
                        id="review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />


                <label id="stars-selector">
                    Stars

                    <select id="stars" onChange={(e) => setStars(e.target.value)}>
                        <option
                            value={5}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★★★</option>

                        <option
                            value={+4}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★★</option>

                        <option
                            value={+3}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★</option>

                        <option
                            value={+2}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★</option>

                        <option
                            value={+1}
                            onClick={(e) => setStars(e.target.value)}
                            required>★</option>
                    </select>
                    </label>
                <button id="submit-review" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateReview
