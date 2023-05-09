import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import ShelfCurrentLoansBook from "../../../Models/ShelfCurrentLoansBook";
import { Spinner } from "../../../Utils/Spinner";
import { Link } from "react-router-dom";
import { LoansModal } from "./LoansModal";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [httpError, setHttpError] = useState<string>("");

  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoansBook[]>([]);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(true);
  const [checkout, setCheckout] = useState<boolean>(false);
  const [renewLoan, setRenewLoan] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url = `${process.env.REACT_APP_COMMAND}/books/secure/current-loans`;

          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const resultCurrentLoans = await response.json();

          console.log(resultCurrentLoans);
          setShelfCurrentLoans(resultCurrentLoans);
        }
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoadingCurrent(false);
      }
    };

    fetchUserCurrentLoans();
  }, [authState, checkout, renewLoan]);

  async function handlerReturnBook(bookId: number) {
    const url: string = `${process.env.REACT_APP_COMMAND}/books/secure/return-book?book_id=${bookId}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) throw new Error("Some thing went wrong!!!");

    setCheckout(!checkout);
  }

  async function handlerRenewLoan(bookId: number) {
    const url: string = `${process.env.REACT_APP_COMMAND}/books/secure/renew-loan?book_id=${bookId}`;

    const requestOptions = {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, requestOptions);
    if (!response.ok) throw new Error("Some thing went wrong!!!");
    setRenewLoan(!renewLoan);
  }

  let content: any;
  if (isLoadingCurrent) content = <Spinner />;
  else if (httpError)
    content = (
      <div className="container m-5">
        <h2 className="heading-secondary text-danger">{httpError}</h2>
      </div>
    );

  content = (
    <>
      {/* Desktop */}
      <div className="d-none d-sm-block">
        {shelfCurrentLoans.length > 0 ? (
          <div className="mt-3">
            <h3 className="heading-tertiary mb-5">Current Loans: {shelfCurrentLoans.length} books</h3>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <>
                <div key={shelfCurrentLoan.book.id} className="row justify-content-around">
                  <div className="col-sm-4">
                    {shelfCurrentLoan.book?.img ? (
                      <img src={shelfCurrentLoan.book.img} className="object-fit-cover" alt={shelfCurrentLoan.book.title} width="200" height="300" />
                    ) : (
                      <img
                        src={require("../../../assets/images/publicImage/01-HeroBook.jpg")}
                        className="object-fit-cover"
                        alt="Book"
                        width="200"
                        height="300"
                      />
                    )}
                  </div>
                  <div className="card col-lg-3 col-sm-5 py-5 px-4">
                    <h3 className="heading-tertiary">Loan Options</h3>
                    {shelfCurrentLoan.daysLeft > 0 && (
                      <p className="fs-4">
                        Due in <span className=" fw-bold">{shelfCurrentLoan.daysLeft}</span> days
                      </p>
                    )}
                    {shelfCurrentLoan.daysLeft === 0 && <p className="text-success fw-bold fs-4">Due Today</p>}
                    {shelfCurrentLoan.daysLeft < 0 && (
                      <p className="text-danger fs-4">
                        Due in <span className="fw-bold">{shelfCurrentLoan.daysLeft} </span>
                        days
                      </p>
                    )}
                    <div className="list-group">
                      <button
                        className="list-group-item list-group-item-action fs-4"
                        aria-current="true"
                        data-bs-toggle="modal" // toggle elements with same name "modal"
                        data-bs-target={`#modal${shelfCurrentLoan.book.id}`} // refer with id id="modal-{book.id}"
                      >
                        Manager Loan
                      </button>
                      <Link className="list-group-item list-group-item-action fs-4" to={"/searchbook"}>
                        Search more books
                      </Link>
                    </div>
                    <hr />
                    <p className="fs-4">Help other find their adventure by reviewing your loans</p>
                    <div className="text-center">
                      <Link to={`/checkoutbook/${shelfCurrentLoan.book.id}`} className="btn btn--loans w-60">
                        Review
                      </Link>
                    </div>
                  </div>
                  <LoansModal
                    shelfCurrentLoansBook={shelfCurrentLoan}
                    mobile={false}
                    handlerReturnBook={handlerReturnBook}
                    handlerRenewLoan={handlerRenewLoan}
                  />
                </div>
                <hr className="my-5" />
              </>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <h3 className="heading-tertiary mb-3">Currently no book loans!!!</h3>
            <Link className="btn" to={"/searchbook"}>
              Search for a new Books
            </Link>
          </div>
        )}
      </div>
      {/*  Mobile */}
      <div className="d-sm-none">
        {shelfCurrentLoans.length > 0 ? (
          <div className="mt-3">
            <h3 className="heading-tertiary mb-5">Current Loans: {shelfCurrentLoans.length} books</h3>
            {shelfCurrentLoans.map((shelfCurrentLoan) => (
              <>
                <div key={shelfCurrentLoan.book.id}>
                  <div className="d-flex justify-content-center">
                    {shelfCurrentLoan.book?.img ? (
                      <img src={shelfCurrentLoan.book.img} alt={shelfCurrentLoan.book.title} width="200" height="280" />
                    ) : (
                      <img src={require("../../../assets/images/publicImage/01-HeroBook.jpg")} alt="Book" width="200" height="300" />
                    )}
                  </div>
                  <div className="card py-5 px-4 mt-4">
                    <h3 className="heading-tertiary">Loan Options</h3>
                    {shelfCurrentLoan.daysLeft > 0 && (
                      <p className="fs-4">
                        Due in <span className=" fw-bold">{shelfCurrentLoan.daysLeft}</span> days
                      </p>
                    )}
                    {shelfCurrentLoan.daysLeft === 0 && <p className="text-success fw-bold">Due Today</p>}
                    {shelfCurrentLoan.daysLeft < 0 && <p className="text-danger fw-bold">Due in {shelfCurrentLoan.daysLeft} days</p>}
                    <div className="list-group">
                      <button
                        className="list-group-item list-group-item-action fs-4"
                        aria-current="true"
                        data-bs-toggle="modal" // toggle elements with same name "modal"
                        data-bs-target={`#modalmobile${shelfCurrentLoan.book.id}`} // refer with id id="modal-{book.id}"
                      >
                        Manager Loan
                      </button>
                      <Link className="list-group-item list-group-item-action fs-4" to={"/searchbook"}>
                        Search more books
                      </Link>
                    </div>
                    <hr />
                    <p className="fs-4">Help other find their adventure by reviewing your loans</p>
                    <div className="text-center">
                      <Link to={`/checkoutbook/${shelfCurrentLoan.book.id}`} className="btn btn--loans w-60">
                        Review
                      </Link>
                    </div>
                  </div>
                  <LoansModal
                    shelfCurrentLoansBook={shelfCurrentLoan}
                    mobile={false}
                    handlerReturnBook={handlerReturnBook}
                    handlerRenewLoan={handlerRenewLoan}
                  />
                </div>
                <hr className="my-5" />
              </>
            ))}
          </div>
        ) : (
          <div className="mt-3">
            <h3 className="heading-t">Currently no book loans </h3>
            <Link className="btn" to={"/searchbook"}>
              Search for a new Books
            </Link>
          </div>
        )}
      </div>
    </>
  );

  return <div>{content}</div>;
};
