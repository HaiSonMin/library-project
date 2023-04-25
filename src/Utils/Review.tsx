import ReviewModel from "../Models/ReviewModel";
import { StarReview } from "./StarReview";

export const Review: React.FC<{ review: ReviewModel }> = ({ review }) => {
  const emailUser = review.userEmail;
  const date = new Date(review.date);
  const dayReview = date.getDate();
  const monthReview = date.toLocaleString("vn", { month: "long" });
  const yearReview = date.getFullYear();
  const dateRender = `${dayReview} ${monthReview} ${yearReview}`;

  return (
    <div className="mb-3">
      <h4 className="fs-4">{emailUser}</h4>
      <div className="">
        <div className="row">
          <div className="col-8 fs-5">{dateRender}</div>
          <div className="col-4 ">{<StarReview star={review.rating} size={16} />}</div>
        </div>
        <p className="fs-4">{review.reviewDescription}</p>
        <hr />
      </div>
    </div>
  );
};
