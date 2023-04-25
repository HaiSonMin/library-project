import { useEffect, useState } from "react";
import BoxModel from "../../../Models/BookModel";
import { ReturnBook } from "./ReturnBook";
import { Spinner } from "../../../Utils/Spinner";
import { CarouselItemPage } from "./CarouselItemPage";
import { Link } from "react-router-dom";

const Carousel = function () {
  const [books, setBooks] = useState<BoxModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState("");

  useEffect(() => {
    const fetchBooks = async function () {
      try {
        const baseURL: string = "http://localhost:9000/api/books";

        // const url: string = `${baseURL}?page=0?size=9`;

        const response = await fetch(baseURL);

        const responseJson = await response.json();

        const resultListBook = responseJson._embedded.books;

        console.log(resultListBook);

        setBooks(resultListBook);
        setIsLoading(false);
      } catch (error: any) {
        setIsLoading(false);
        setHttpError(error.message);
      }
    };
    fetchBooks();
  }, []);

  let content: any;
  if (isLoading) content = <Spinner />;
  else if (httpError)
    content = (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  else {
    content = (
      <>
        <div className="homepage-carousel-title">
          <h2 className="heading-secondary text-center">Find your next "I stayed up too late reading" book.</h2>
        </div>
        <div
          id="carouselExampleControls"
          className="carousel carousel-dark slide mt-5 
                d-none d-lg-block"
          data-bs-interval="false"
        >
          {/* Desktop */}
          <div className="carousel-inner">
            <div className="carousel-item active">
              <CarouselItemPage indexStart={0} indexEnd={3} books={books} />
            </div>
            <div className="carousel-item">
              <CarouselItemPage indexStart={3} indexEnd={6} books={books} />
            </div>
            <div className="carousel-item">
              <CarouselItemPage indexStart={6} indexEnd={9} books={books} />
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div className="d-lg-none mt-3">
          <div className="row d-flex justify-content-center align-items-center">
            <ReturnBook book={books[10]} key={books[10].id} />
          </div>
        </div>
      </>
    );
  }

  return (
    <section className="section-carousel mb-5">
      <div className="container" style={{ height: 550 }}>
        {content}
        <div className="homepage-carousel-title mt-3 text-center mt-8">
          <Link className="btn btn--view-more" to="searchbook">
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
