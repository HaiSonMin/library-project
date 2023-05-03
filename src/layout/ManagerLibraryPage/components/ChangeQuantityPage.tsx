import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";

import BookModel from "../../../Models/BookModel";
import { Spinner } from "../../../Utils/Spinner";
import { Pagination } from "../../../Utils/Pagination";
import { ChangeQuantity } from "./ChangeQuantity";
import { Link } from "react-router-dom";
import AddBookRequest from "../../../Models/Request/AddBookRequest";
export const ChangeQuantityPage = () => {
  const { authState } = useOktaAuth();

  // Book State
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");

  // Pagination
  const [bookPerPage] = useState<number>(5);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalAmountOfBook, setTotalAmountOfBook] = useState<number>(0);

  // Message Handler
  const [isEventChange, setIsEventChange] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/books?page=${currentPage - 1}&size=${bookPerPage}`;

        const response = await fetch(url);

        const resultBooks = await response.json();

        setBooks(resultBooks._embedded.books);
        setTotalPages(resultBooks.page.totalPages);
        setTotalAmountOfBook(resultBooks.page.totalElements);
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [bookPerPage, currentPage, isEventChange]);

  // Handler Delete Book
  async function handlerDeleteBook(bookId: number) {
    try {
      if (authState && authState.accessToken?.claims.userType === "admin") {
        const url = `${process.env.REACT_APP_COMMAND}/books/secure/delete-book/${bookId}`;

        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
        };

        await fetch(url, requestOptions);

        // const result = await response.text();

        setIsEventChange(!isEventChange);
      }
    } catch (error: any) {
      setHttpError(error.message);
    }
  }

  async function handlerSaveChangeInfoBook(bookId: number, bookUpdate: AddBookRequest) {
    try {
      console.log(bookId);
      const url = `${process.env.REACT_APP_COMMAND}/books/secure/update-book/${bookId}`;

      const requestOptions = {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookUpdate),
      };

      await fetch(url, requestOptions);
      setIsEventChange(!isEventChange);
    } catch (error: any) {
      setHttpError(error.message);
    }
  }

  // Used for pagination slice(indexOfFirstBook, indexOfLastBook > lastItem ? lastItem : indexOfLastBook);
  const indexOfLastBook = currentPage * bookPerPage;

  const indexOfFirstBook = indexOfLastBook - bookPerPage;

  const lastItem = indexOfLastBook <= totalAmountOfBook ? indexOfLastBook : totalAmountOfBook;

  // Event function set Current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  let content: any;
  if (isLoading) content = <Spinner />;
  else if (httpError)
    content = (
      <div className="m-5">
        <p>{httpError}</p>
      </div>
    );
  else {
    content = (
      <>
        {totalAmountOfBook > 0 ? (
          <>
            <div className="mt-3">
              <h3 className="heading-tertiary">Number of result: ({totalAmountOfBook})</h3>
            </div>
            <p className="fs-3">
              <span className="fw-bold">{indexOfFirstBook + 1}</span> to <span className="fw-bold">{lastItem}</span> of{" "}
              <span className="fw-bold">{totalAmountOfBook}</span> items
            </p>
          </>
        ) : (
          <div>
            <h2 className="heading-secondary mt-5 mb-2">Can't find the book</h2>
            <Link className="btn" to={"/searchbook"}>
              List Book
            </Link>
          </div>
        )}
        <div>
          {books.map((book) => (
            <ChangeQuantity book={book} handlerDeleteBook={handlerDeleteBook} handlerSaveChangeInfoBook={handlerSaveChangeInfoBook} key={book.id} />
          ))}
          {/* If amount page > 1 then pagination will be displayed */}
          <div className="d-flex justify-content-center align-items-center my-5">
            {totalPages > 1 && <Pagination totalPage={totalPages} currentPage={currentPage} paginate={paginate} />}
          </div>
        </div>
      </>
    );
  }

  return <div className="container">{content}</div>;
};
