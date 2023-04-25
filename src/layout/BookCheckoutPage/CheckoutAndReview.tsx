import { Link } from "react-router-dom";
import BookModel from "../../Models/BookModel";
import Classnames from "classnames";
import { BiUserPlus } from "react-icons/bi";
import { LeaveAReview } from "../../Utils/LeaveAReview";

export const CheckoutAndReview: React.FC<{
  book: BookModel | undefined;
  mobile: boolean;
  currentLoans: number;
  isAuthenticated: boolean | undefined;
  isCheckBook: boolean;
  checkoutBook: any;
  isReviewLeft: boolean;
  submitReviewBook: any;
}> = ({ book, mobile, currentLoans, isCheckBook, isAuthenticated, checkoutBook, isReviewLeft, submitReviewBook }) => {
  const alignCenterCss = Classnames("d-flex flex-column");

  const renderButton = () => {
    let button: any;
    // If authenticated
    if (isAuthenticated) {
      if (!isCheckBook && currentLoans < 5)
        button = (
          <button className="btn btn--checkout mb-3" onClick={() => checkoutBook()}>
            Checkout
          </button>
        );
      else if (isCheckBook)
        button = (
          <p>
            <b className="fs-4">Book Checked out. Go read it voraciously 📖📖📖</b>
          </p>
        );
      else if (!isCheckBook)
        button = (
          <p>
            <b className="text-danger fs-4">Too many book checked out</b>
          </p>
        );
    }
    // If not authenticated
    else
      button = (
        <Link className="btn btn--login w-40" to={"/login"}>
          Sign in {<BiUserPlus />}{" "}
        </Link>
      );
    return button;
  };

  const renderReview = () => {
    if (isAuthenticated && !isReviewLeft) return <LeaveAReview submitReviewBook={submitReviewBook} />;
    if (isAuthenticated && isReviewLeft) return <p className="fs-4 lh-base fw-bold">Thank you for review❤️</p>;
    return <p className="fs-4 lh-base fw-bold ">Sign in to be able to leave a review</p>;
  };

  return (
    <>
      <div className="card-body container">
        <div className={mobile ? alignCenterCss : "mt-3"}>
          <p className="fs-4">
            <span className="fw-bold">{currentLoans}/5</span> books checked out
          </p>
          <hr />
          {book && book.copies_available && book.copies_available > 0 ? (
            <h4 className="text-success fs-3 fw-bold">Available</h4>
          ) : (
            <h4 className="text-danger fs-3 fw-bold">Waiting</h4>
          )}
          <div className="row mt-2">
            <p className="col-6 lead">
              <span className="fw-bold">{book?.copies} Copies</span>
            </p>
            <p className="col-6 lead">
              <span className="fw-bold">{book?.copies_available} Available</span>
            </p>
          </div>
        </div>
        {renderButton()}
        <hr />
        <p className="fs-4 lh-base">This number can change until placing order has been complete</p>
        {renderReview()}
      </div>
    </>
  );
};
