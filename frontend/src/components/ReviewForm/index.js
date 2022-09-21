import { useDispatch } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom"
import { createReview } from "../../store/reviews";
import './ReviewForm.css'

const CreateReview = () => {
    const { spotId } = useParams();
    const dispatch = useDispatch();

    const [review, setReview] = useState('');
    const [stars, setStars] = useState(0);
    const [validationErrors, setValidationErrors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const onSubmit = (e) => {
        e.preventDefault();

        const review = {
            review: review,
            stars: stars
        };

        dispatch(createReview(spotId, review))
    }


    return (
        <div>
            <div id='space-up-top'/>
            <form className="create-review-form" onSubmit={onSubmit}>
                <label>
                    Review
                    <input
                        id="review"
                        type="text"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Stars
                    <select id="stars">
                            <option
                            value={+5}
                            onChange={(e) => setStars(e.target.value)}
                            required>5</option>

                            <option
                            value={+4}
                            onChange={(e) => setStars(e.target.value)}
                            required>4</option>

                            <option
                            value={+3}
                            onChange={(e) => setStars(e.target.value)}
                            required>3</option>

                            <option
                            value={+2}
                            onChange={(e) => setStars(e.target.value)}
                            required>2</option>

                            <option
                            value={+1}
                            onChange={(e) => setStars(e.target.value)}
                            required>1</option>
                    </select>

                </label>
            </form>
        </div>
    )
}

export default CreateReview
