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
    const [stars, setStars] = useState(5);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const errors = [];
        if (!review || review.length < 10) errors.push('Please enter more than 10 characters.');
        setValidationErrors(errors)
    }, [review])

    const onSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true)

        const starNum = +stars
        const newReview = {
            review,
            stars: starNum
        };
        console.log('nr', newReview)

        const postReview = dispatch(createReview(spotId, newReview))
        if (postReview) {
            history.push(`/spots/${spotId}`)
        }
    }



    return (
        <>
        <div id="review-card-page-container">
        <div id="review-card-page">
            <form id="create-review-form" onSubmit={onSubmit}>
                <label id="title-on-review-form">
                    Review
                    {validationErrors.length > 0 && submitted && (
                        <div id="error-on-review-form">{validationErrors.map((e) => (
                                <> {e}</>
                            ))}
                        </div>
                )}
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
                            value={4}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★★</option>

                        <option
                            value={3}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★★</option>

                        <option
                            value={2}
                            onChange={(e) => setStars(e.target.value)}
                            required>★★</option>

                        <option
                            value={1}
                            onClick={(e) => setStars(e.target.value)}
                            required>★</option>
                    </select>
                </label>

                <button id="submit-review" type="submit">Submit</button>
                <div></div>
            </form>
        </div>
        </div>
        </>
    )
}

export default CreateReview
