import { useState } from "react";
import { StarReview } from "./StarReview";

export const LeaveAReview: React.FC<{ submitReviewBook: any }> = ({ submitReviewBook }) => {
  const [reviewStarInput, setReviewInput] = useState<number>(0);
  const [isDisplayInput, setIsDisPlayInput] = useState<boolean>(false);
  const [valueInputDescription, setValueInputDescription] = useState<string>("");

  const ratingStar = (star: number) => {
    setReviewInput(star);
    setIsDisPlayInput(true);
  };

  const submitReview = (e: any) => {
    e.preventDefault();
    submitReviewBook(reviewStarInput, valueInputDescription);
  };

  return (
    <div>
      <h5 className="dropdown-toggle fs-4 fw-bold" style={{ cursor: "pointer" }} data-bs-toggle="dropdown" id="dropdownMenuButton">
        Leave A Review!!!
      </h5>
      <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(0.5)}>
          0.5 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(1.0)}>
          1.0 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(1.5)}>
          1.5 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(2.0)}>
          2.0 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(2.5)}>
          2.5 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(3.0)}>
          3.0 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(3.5)}>
          3.5 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(4.0)}>
          4.0 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(4.5)}>
          4.5 star
        </li>
        <li className="dropdown-item fs-4" style={{ cursor: "pointer" }} onClick={() => ratingStar(5.0)}>
          5.0 star
        </li>
      </ul>
      <StarReview star={reviewStarInput} size={24} />
      {isDisplayInput && (
        <form method="POST" action="#" onSubmit={(e) => submitReview(e)}>
          <hr />
          <h4 className="fs-4 fw-bold">Description: </h4>
          <div>
            <textarea
              value={valueInputDescription}
              id="submitReviewDescription"
              placeholder="Optional"
              onChange={(e) => setValueInputDescription(e.target.value)}
              rows={4}
              autoFocus
              className="w-100 p-2 mb-3 fs-4"
            />
          </div>
          <button type="submit" className="btn btn--submit">
            Submit review
          </button>
        </form>
      )}
    </div>
  );
};
