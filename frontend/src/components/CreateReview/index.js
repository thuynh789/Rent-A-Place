import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/reviews";


function CreateReview() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { closeModal } = useModal();
  const spot = useSelector((state) => state.spots.singleSpot);
  const User = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);

  const [review, setReview] = useState('');
  const [stars, setStars] = useState('');




  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    const newReview = {
      review,
      stars
    }

    const reviewExtras = {
        User,
        ReviewImages: [],
        
    }

    dispatch(createReviewThunk(spot.id, newReview, reviewExtras ))
    .then(() => history.push(`/spots/${spot.id}`))
    .then(closeModal)
    .catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors)
      })
    }

    return (
    <div className="add-review-container">

      <div className="x-button">
        <button className="exit" onClick={closeModal}>
          x
          <i className="fa-solid fa-xmark" />
        </button>
      </div>

      <div className="header">
        <h2>Create Review</h2>
      </div>

      <div>
        <ul className="errors">
            {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
      </div>


      <form className="form" onSubmit={handleSubmit}>
        <div className="form-parts">

          <label>
            Review
            <input
              type="text"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              required
            />
          </label>

          <label>
            Star Rating (1-5)
            <input
              type="number"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
              min='1'
              max='5'
              required
            />
          </label>

            <button className='submit-form' type="submit">Create new review</button>

        </div>
      </form>
    </div>

  );
}

export default CreateReview;