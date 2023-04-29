import { useEffect, useState } from "react";
import ReviewModel from "../../../Models/ReviewModel";
import { Spinner } from "../../../Utils/Spinner";
import { Review } from "../../../Utils/Review";
import { Pagination } from "../../../Utils/Pagination";
import { Link } from "react-router-dom";

const ReviewListPage = function () {
  // Review
  const [reviews, setReviews] = useState<ReviewModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState<string>("");

  // Pagination
  const [totalPage, setTotalPage] = useState<number>(0);
  const [totalAmountOfReview, setTotalAmountOfReview] = useState<number>(0);
  const [reviewPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const bookId = window.location.pathname.split("/")[2];

  useEffect(() => {
    const fetchReviewBook = async () => {
      try {
        const url = `http://localhost:9000/api/reviews/search/findByBookId?book_id=${bookId}&page=${currentPage - 1}&size=${reviewPerPage}`;

        const response = await fetch(url);

        const resultReviewBook = await response.json();

        setReviews(resultReviewBook._embedded.reviews);
        const pageDetail = resultReviewBook.page;

        setTotalPage(pageDetail.totalPages);
        setTotalAmountOfReview(pageDetail.totalElements);

        console.log(resultReviewBook);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReviewBook();
  }, [bookId, currentPage, reviewPerPage]);

  const indexLastItemPage: number = currentPage * reviewPerPage;

  const indexFirstItemPage: number = indexLastItemPage - reviewPerPage;

  const lastItemReview: number = indexLastItemPage > totalAmountOfReview ? totalAmountOfReview : indexLastItemPage;

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  let content: any;
  if (isLoading) content = <Spinner />;
  else if (httpError) {
    content = <p className="text-danger fw-bold fs-3">{httpError}</p>;
  }

  content = (
    <>
      <h3 className="heading-tertiary">Total Reviews: {totalAmountOfReview}</h3>
      <p className="fs-3">
        <span className="fw-bold">{indexFirstItemPage + 1}</span> to <span className="fw-bold">{lastItemReview}</span> of{" "}
        <span className="fw-bold">{totalAmountOfReview}</span> reviews
      </p>
      <div className="row mt-5">
        {reviews.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
      <Link className="btn" to={`/checkoutbook/${bookId}`}>
        Go Back
      </Link>
      <div className="d-flex justify-content-center align-items-center">
        {totalPage > 1 && <Pagination currentPage={currentPage} paginate={paginate} totalPage={totalPage} />}
      </div>
    </>
  );

  return <div className="container p-5">{content}</div>;
};

export default ReviewListPage;
