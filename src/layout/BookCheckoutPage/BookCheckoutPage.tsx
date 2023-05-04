import { useState, useEffect } from "react";
import BookModel from "../../Models/BookModel";
import { Spinner } from "../../Utils/Spinner";
import { MdKeyboardDoubleArrowDown, MdKeyboardDoubleArrowUp } from "react-icons/md";
import { StarReview } from "../../Utils/StarReview";
import { CheckoutAndReview } from "./CheckoutAndReview";
import ReviewModel from "../../Models/ReviewModel";
import { LatestReviewsBook } from "./LatestReviewsBook";
import { useOktaAuth } from "@okta/okta-react";
import ReviewRequestModel from "../../Models/ReviewRequestModel";
export const BookCheckoutPage = () => {
  // Okta Auth
  const { authState } = useOktaAuth();

  // State Book
  const [book, setBook] = useState<BookModel>();
  const [isLoadingBook, setIsLoadingBook] = useState<boolean>(true);
  const [httpErrorBook, setHttpErrorBook] = useState<string>("");
  const [viewDescToggle, setViewDescToggle] = useState<boolean>(false);

  // State Review
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoadingReview, setIsLoadingReview] = useState<boolean>(true);
  const [httpErrorReview, setHttpErrorReview] = useState<string>("");
  const [argStar, setArgStar] = useState<number>(0);

  // State User Review
  const [isReviewLeft, setIsReviewLeft] = useState(false);
  const [isLoadingUserReview, setIsLoadingUserReview] = useState(true);

  // Loans Count State
  const [currentLoansCount, setCurrentLoansCount] = useState(0);
  const [isLoadingCurrentLoansCount, setIsLoadingCurrentLoansCount] = useState(true);

  // Check book has checkout
  const [isCheckoutBook, setIsCheckoutBook] = useState(false);
  const [isLoadingBookCheckout, setIsLoadingBookCheckout] = useState(true);

  const bookId = document.location.pathname.split("/")[2];

  // Load API BookById
  useEffect(() => {
    try {
      const fetchBook = async () => {
        const baseUrl: string = `${process.env.REACT_APP_API}/books/${bookId}`;

        console.log(baseUrl);

        const response = await fetch(baseUrl);

        const result = await response.json();

        setBook(result);
      };
      fetchBook();
    } catch (error: any) {
      setHttpErrorBook(error.message);
    } finally {
      setIsLoadingBook(false);
    }
  }, [bookId, isCheckoutBook]);

  // Load API ReviewByBookId
  useEffect(() => {
    try {
      const fetchReviewBook = async () => {
        const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByBookId?book_id=${bookId}`;

        const response = await fetch(reviewUrl);

        const resultReviewJson = await response.json();

        const reviewsBook = resultReviewJson._embedded.reviews;

        let weightedStar = 0;

        for (let key in reviewsBook) {
          weightedStar += reviewsBook[key].rating;
        }

        const ratingArg: number = Number((weightedStar / reviewsBook.length).toFixed(2));

        setReviews(reviewsBook);
        setArgStar(ratingArg);
      };
      fetchReviewBook();
    } catch (error: any) {
      setHttpErrorReview("Some thing went wrong!!");
    } finally {
      setIsLoadingReview(false);
    }
  }, [bookId, isReviewLeft]);

  // Load API Current Book Loans
  useEffect(() => {
    const fetchUserCurrentLoansCount = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url: string = `${process.env.REACT_APP_COMMAND}/books/secure/current-loans/count`;
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const result = await response.json();

          setCurrentLoansCount(result);
        }
      } catch (error: any) {
        setHttpErrorBook(error);
        throw new Error(`Something went wrong ${error}`);
      } finally {
        setIsLoadingCurrentLoansCount(false);
      }
    };
    fetchUserCurrentLoansCount();
  }, [authState, isCheckoutBook]);

  // Checkout book API
  useEffect(() => {
    const fetchCheckoutBook = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url: string = `${process.env.REACT_APP_COMMAND}/books/secure/is-checkout/by-user?book_id=${bookId}`;
          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const result = await response.json();

          setIsCheckoutBook(result);
        }
      } catch (error: any) {
        setHttpErrorBook(error);
        throw new Error(`Something went wrong ${error}`);
      } finally {
        setIsLoadingBookCheckout(false);
      }
    };
    fetchCheckoutBook();
  }, [authState, bookId]);

  // User Review API
  useEffect(() => {
    const fetchUserReview = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url = `${process.env.REACT_APP_COMMAND}/reviews/secure/is-review/by-user?book_id=${bookId}`;

          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const result = await response.json();

          setIsReviewLeft(result);
        }
      } catch (error: any) {
        setHttpErrorBook(error);
        throw new Error(`Something went wrong ${error}`);
      } finally {
        setIsLoadingUserReview(false);
      }
    };
    fetchUserReview();
  }, [authState, bookId, isReviewLeft]);

  // Handler click checkout book
  async function checkoutBook() {
    const url = `${process.env.REACT_APP_COMMAND}/books/secure/checkout?book_id=${bookId}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const checkoutResponse = await fetch(url, requestOptions);

    if (!checkoutResponse.ok) throw new Error("Something went wrong!!");

    setIsCheckoutBook(true);
  }

  // Handler submit review book (POST)
  async function submitReviewBook(rating: number, description: string) {
    let bookIdReview: number = 0;
    if (book?.id) bookIdReview = book.id;

    const url = `${process.env.REACT_APP_COMMAND}/reviews/secure`;

    const reviewRequestModel = new ReviewRequestModel(bookIdReview, rating, description);

    console.log(reviewRequestModel);

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reviewRequestModel),
    };

    const submitReviewResponse = await fetch(url, requestOptions);

    if (!submitReviewResponse.ok) throw new Error("Something went wrong!!");

    setIsReviewLeft(true);
  }

  let content: any;
  if (isLoadingBook || isLoadingReview || isLoadingCurrentLoansCount || isLoadingBookCheckout || isLoadingUserReview) {
    content = <Spinner />;
  } else if (httpErrorBook || httpErrorReview) {
    content = (
      <div className="m-5">
        <p>{httpErrorBook || httpErrorReview}</p>
      </div>
    );
  } else {
    content = (
      <>
        {/* Table or Laptop */}
        <div className="container d-none d-sm-block">
          <div className="row row-gap-5 mt-3">
            <div className={`col-sm-3 ps-0 col-md-2`}>
              {book?.img ? (
                <img src={book.img} alt={book.description} className="object-fit-cover" width="120px" height="190px" />
              ) : (
                <img
                  src={require("../../assets/images/publicImage/01-HeroBook.jpg")}
                  className="object-fit-cover"
                  alt="Book"
                  width="120px"
                  height="190px"
                />
              )}
            </div>
            <div className="col-sm-5 col-md-7">
              <h3 className="heading-tertiary">{book?.title}</h3>
              <h5 className="fw-bold fs-3 text-secondary">{book?.author}</h5>
              <p className={`fs-4 text-body mb-0 ${viewDescToggle && "line--clamp-3"}`}>{book?.description}</p>
              <button className="btn btn--text" onClick={() => setViewDescToggle(!viewDescToggle)}>
                {viewDescToggle ? (
                  <span className="fw-bold fs-5">
                    view more <MdKeyboardDoubleArrowDown />
                  </span>
                ) : (
                  <span className="fw-bold fs-5">
                    shrank <MdKeyboardDoubleArrowUp />
                  </span>
                )}
              </button>
              <div className="d-flex align-items-center gap-3">
                <StarReview star={argStar} size={24} />
                <span className="fs-3 fw-bold mb-0 mt-1">{!argStar ? 0 : argStar}</span>
              </div>
            </div>
            <div className="card col-sm-4 col-md-3">
              <CheckoutAndReview
                book={book}
                mobile={false}
                currentLoans={currentLoansCount}
                isAuthenticated={authState?.isAuthenticated}
                isCheckBook={isCheckoutBook}
                checkoutBook={checkoutBook}
                isReviewLeft={isReviewLeft}
                submitReviewBook={submitReviewBook}
              />
            </div>
          </div>
          <hr />
          {/* Only render 3 reviews */}
          <LatestReviewsBook bookId={Number(bookId)} mobile={false} reviews={reviews} />
        </div>

        {/* Mobile */}
        <div className="container d-sm-none">
          <div className="row row-gap-5 mt-3">
            <div className={`col-sm-3 ps-0 col-md-2 d-flex justify-content-center`}>
              {book?.img ? (
                <img src={book.img} alt={book.description} width="120px" height="190px" />
              ) : (
                <img src={require("../../assets/images/publicImage/01-HeroBook.jpg")} alt="Book" width="120px" height="190px" />
              )}
            </div>
            <div className="col-sm-5 col-md-7">
              <h3 className="heading-tertiary">{book?.title}</h3>
              <h5 className="fw-bold fs-3 text-secondary">{book?.author}</h5>
              <p className={`fs-4 text-body mb-0 ${viewDescToggle && "line--clamp-3"}`}>{book?.description}</p>
              <button className="btn btn--text" onClick={() => setViewDescToggle(!viewDescToggle)}>
                {viewDescToggle ? (
                  <span className="fw-bold fs-5">
                    view more <MdKeyboardDoubleArrowDown />
                  </span>
                ) : (
                  <span className="fw-bold fs-5">
                    shrank <MdKeyboardDoubleArrowUp />
                  </span>
                )}
              </button>
              <div className="d-flex align-items-center gap-3">
                <StarReview star={argStar} size={24} />
                <span className="fs-3 mb-0 mt-1">{argStar}</span>
              </div>
            </div>
            <div className="card col-sm-4 col-md-3">
              <CheckoutAndReview
                book={book}
                mobile={true}
                currentLoans={currentLoansCount}
                isAuthenticated={authState?.isAuthenticated}
                isCheckBook={isCheckoutBook}
                checkoutBook={checkoutBook}
                isReviewLeft={isReviewLeft}
                submitReviewBook={submitReviewBook}
              />
            </div>
          </div>
          <LatestReviewsBook bookId={Number(bookId)} mobile={true} reviews={reviews} />
        </div>
      </>
    );
  }

  return (
    <section className="section-checkoutpage">
      <div className="container">{content}</div>
    </section>
  );
};
