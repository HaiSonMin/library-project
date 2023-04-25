import { useEffect, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";
import ShelfCurrentLoansBook from "../../../Models/ShelfCurrentLoansBook";
import { Spinner } from "../../../Utils/Spinner";

export const Loans = () => {
  const { authState } = useOktaAuth();
  const [shelfCurrentLoans, setShelfCurrentLoans] = useState<ShelfCurrentLoansBook[]>([]);
  const [isLoadingCurrent, setIsLoadingCurrent] = useState(true);
  const [httpError, setHttpError] = useState<string>("");

  useEffect(() => {
    const fetchUserCurrentLoans = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url = "localhost:9000/command/books/secure/current-loans";

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
  }, [authState]);

  let content: any;
  if (isLoadingCurrent) content = <Spinner />;
  else if (httpError)
    content = (
      <div className="container m-5">
        <h2 className="heading-secondary text-danger">{httpError}</h2>
      </div>
    );

  // Desktop
  content = (
    <div className="d-none d-md-block">
      {shelfCurrentLoans.length > 0 ? (
        <div>
          <h2 className="heading-secondary">Current Loans {shelfCurrentLoans.length}</h2>
          {shelfCurrentLoans.map((shelfCurrentLoan) => (
            <div key={shelfCurrentLoan.book.id} className="row">
              <div className="col-sm-4">
                {shelfCurrentLoan.book?.img ? (
                  <img src={shelfCurrentLoan.book.img} alt={shelfCurrentLoan.book.title} width="220" height="330" />
                ) : (
                  <img src={require("../../../assets/images/publicImage/01-HeroBook.jpg")} alt="Book" width="220" height="330" />
                )}
              </div>
              <div className="card col-sm-3 py-3 px-2">
                <h3 className="heading-tertiary">Loan Options</h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );

  return (
    <div>
      <h2>Loans</h2>
    </div>
  );
};
