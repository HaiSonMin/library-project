import ShelfCurrentLoansBook from "../../../Models/ShelfCurrentLoansBook";

export const LoansModal: React.FC<{
  shelfCurrentLoansBook: ShelfCurrentLoansBook;
  mobile: boolean;
  handlerReturnBook: any;
  handlerRenewLoan: any;
}> = ({ shelfCurrentLoansBook, mobile, handlerReturnBook, handlerRenewLoan }) => {
  return (
    <div
      className="modal fade"
      id={mobile ? `modalmobile${shelfCurrentLoansBook.book.id}` : `modal${shelfCurrentLoansBook.book.id}`}
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="staticBackdropLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title" id="staticBackdropLabel">
              Loan Options
            </h4>
            <button className="btn-close" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <div className="container">
              <div className="row">
                <div className="col-2">
                  {shelfCurrentLoansBook.book?.img ? (
                    <img src={shelfCurrentLoansBook.book.img} alt={shelfCurrentLoansBook.book.title} width={60} height={90} />
                  ) : (
                    <img src={require("../../../assets/images/booksImages/01-BookExplore.jpg")} alt="Book" width={60} height={90} />
                  )}
                </div>
                <div className="col-10">
                  <h6>{shelfCurrentLoansBook.book.author}</h6>
                  <h4>{shelfCurrentLoansBook.book.title}</h4>
                </div>
              </div>
              <hr />
              {shelfCurrentLoansBook.daysLeft > 0 && (
                <p className="fs-4">
                  Due in <span className=" fw-bold">{shelfCurrentLoansBook.daysLeft}</span> days
                </p>
              )}
              {shelfCurrentLoansBook.daysLeft === 0 && <p className="text-success fw-bold">Due Today</p>}
              {shelfCurrentLoansBook.daysLeft < 0 && <p className="text-danger fw-bold">Due in {shelfCurrentLoansBook.daysLeft} days</p>}
              <div className="list-group">
                <button
                  className="list-group-item list-group-item-action fs-4"
                  data-bs-dismiss="modal"
                  onClick={() => handlerReturnBook(shelfCurrentLoansBook.book.id)}
                >
                  Return book
                </button>
                <button
                  className={`list-group-item list-group-item-action ${shelfCurrentLoansBook.daysLeft < 0 && "disabled"} fs-4`}
                  data-bs-dismiss="modal"
                  onClick={() => handlerRenewLoan(shelfCurrentLoansBook.book.id)}
                >
                  {shelfCurrentLoansBook.daysLeft < 0 ? "Late dues cannot be renewed" : "Renew loan for 7days"}
                </button>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn--close" data-bs-dismiss="modal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
