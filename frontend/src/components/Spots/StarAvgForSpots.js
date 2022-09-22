// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { getReviewsAvg } from "../../store/reviews";

// function StarAvgForSpots({ spot }) {
//     const dispatch = useDispatch();
//     const [ avgRating, setAvgRating ] = useState(0);

//     useEffect(async () => {
//             const response = await dispatch(getReviewsAvg(spot?.id));
//             setAvgRating(response)

//             if (response === 0) {
//                 setAvgRating('No reviews')
//             }

//     }, [dispatch, spot?.id]);

//     return (
//         <div>
//             <span>{avgRating}</span>
//         </div>
//     )
// }


// export default StarAvgForSpots;
