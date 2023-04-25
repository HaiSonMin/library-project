import { Loans } from "./components/Loans";

const ShelfPage = function () {
  return (
    <div className="container m-5">
      <nav>
        <ul className="nav nav-tabs" id="nav-tab" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active fs-3 fw-bold"
              id="nav-loans-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-loans"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
            >
              Loans
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link fs-3 fw-bold"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
            >
              Your History
            </button>
          </li>
        </ul>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-loans" role="tabpanel" aria-labelledby="nav-loans-tab">
          <Loans />
        </div>
        <div className="tab-pane fade show" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
          Your History
        </div>
      </div>
    </div>
  );
};

export default ShelfPage;
