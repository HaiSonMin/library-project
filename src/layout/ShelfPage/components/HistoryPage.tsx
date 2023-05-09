import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import { Spinner } from "../../../Utils/Spinner";
import HistoryBook from "../../../Models/HistoryModel";
import { Pagination } from "../../../Utils/Pagination";
import { Link } from "react-router-dom";

export function HistoryPage() {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState<string>("");

  const [historyBook, setHistoryBook] = useState<HistoryBook[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [bookPerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    const fetchHistoryBooksLoans = async () => {
      try {
        if (authState && authState?.isAuthenticated) {
          const url = `${process.env.REACT_APP_API}/histories/search/findByUserEmail?user_email=${authState.accessToken?.claims.sub}&page=${
            currentPage - 1
          }&size=${bookPerPage}`;

          const requestOptions = {
            method: "GET",
            header: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };
          const response = await fetch(url, requestOptions);

          const resultBookLoansHistory = await response.json();
          console.log(resultBookLoansHistory);
          setHistoryBook(resultBookLoansHistory._embedded.histories);
          setTotalPages(resultBookLoansHistory.page.totalPages);
        }
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistoryBooksLoans();
  }, [authState, bookPerPage, currentPage]);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const convertDate = (date: Date): string => {
    const dateConvert = new Date(date);
    console.log(dateConvert);
    const day = dateConvert.getDay();
    const month = new Date(dateConvert).toLocaleDateString("en-us", { month: "long" });
    const year = dateConvert.getFullYear();

    return `${day.toString().padStart(2, "0")} ${month} ${year}`;
  };

  let content: any;
  if (isLoading) content = <Spinner />;
  else if (httpError)
    content = (
      <div className="container">
        <p className="text-danger fw-bold fs-3">{httpError}</p>
      </div>
    );
  else {
    content = (
      <div className="d-none d-sm-block">
        <h3 className="heading-tertiary mb-5 mt-3">History Loans: {historyBook.length} books</h3>
        {historyBook.length > 0 ? (
          historyBook.map((book) => (
            <div className="card shadow p-4 mt-4 rounded">
              <div className="row mt-5 p-5">
                <div className="col-sm-2">
                  {/* Tablet */}
                  <div className="d-none d-sm-block">
                    {book?.img ? (
                      <img src={book.img} alt={book.title} width={100} height={150} />
                    ) : (
                      <img src={require("../../../assets/images/booksImages/01-BookExplore.jpg")} alt="Book" width={100} height={150} />
                    )}
                  </div>
                  {/* Mobile */}
                  <div className="d-flex d-sm-none justify-content-center align-items-center ">
                    {book?.img ? (
                      <img src={book.img} alt={book.title} width={100} height={150} />
                    ) : (
                      <img src={require("../../../assets/images/booksImages/01-BookExplore.jpg")} alt="Book" width={100} height={150} />
                    )}
                  </div>
                </div>
                <div className="col">
                  {/* Tablet */}
                  <div className="d-none d-sm-block">
                    <h3 className="heading-tertiary">{book.title}</h3>
                    <h5 className="card-author fw-bold my-3">{book.author}</h5>
                    <p className="card-desc fs-4 line--clamp-3">{book.description}</p>
                    <hr />
                    <p className="fs-4">Checked out on: {convertDate(book.checkoutDate)}</p>
                    <p className="fs-4">Returned on: {convertDate(book.returnDate)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2 className="heading-secondary mt-5 mb-2">Can't find the book</h2>
            <Link className="btn" to={"/searchbook"}>
              Search for a new Books
            </Link>
          </div>
        )}
        {/* If amount page > 1 then pagination will be displayed */}
        <div className="d-flex justify-content-center align-items-center my-5">
          {totalPages > 1 && <Pagination totalPage={totalPages} currentPage={currentPage} paginate={paginate} />}
        </div>
      </div>
    );
  }

  return <div className="container">{content}</div>;
}
