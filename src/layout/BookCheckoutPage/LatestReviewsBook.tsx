import { Link } from "react-router-dom";
import ReviewModel from "../../Models/ReviewModel";
import { Review } from "../../Utils/Review";

export const LatestReviewsBook: React.FC<{ reviews: ReviewModel[]; mobile: boolean; bookId: number | undefined }> = ({ reviews, bookId, mobile }) => {
  return (
    <div className={mobile ? "my-5" : "row my-5"}>
      <div className={`col-sm-2 ${mobile && "mt-5 mb-3 text-center"}`}>
        <h2 className="heading-secondary">Latest Reviews</h2>
      </div>
      <div className="col-sm-10">
        {reviews.length > 0 ? (
          <>
            {reviews.slice(0, 3).map((review) => (
              <Review key={review.id} review={review} />
            ))}
            <Link className="btn mt-4" to={`/reviewlist/${bookId}`}>
              Reach all review
            </Link>
          </>
        ) : (
          <div className="m-3">
            <h3 className="heading-tertiary">The book dont have review</h3>
          </div>
        )}
      </div>
    </div>
  );
};
