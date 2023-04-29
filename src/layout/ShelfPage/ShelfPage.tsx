import { HistoryPage } from "./components/HistoryPage";
import { Loans } from "./components/Loans";
import { useState } from "react";

const ShelfPage = function () {
  const [historyClick, setHistoryClick] = useState(false);

  return (
    <div className="container m-5">
      <nav>
        <ul className="nav nav-tabs" id="nav-tab" role="tablist">
          <li className="nav-item">
            <button
              className="nav-link active fs-3 fw-bold"
              id="nav-loans-tab"
              data-bs-toggle="tab" // Toggle with elements same name "tab"
              data-bs-target="#nav-loans" // refer with id id="nav-loans"
              type="button"
              role="tab"
              aria-controls="nav-loans"
              aria-selected="true"
              onClick={() => setHistoryClick(false)}
            >
              Loans
            </button>
          </li>
          <li className="nav-item">
            <button
              className="nav-link fs-3 fw-bold"
              id="nav-history-tab"
              data-bs-toggle="tab"
              data-bs-target="#nav-history" // refer with id id="nav-history"
              type="button"
              role="tab"
              aria-controls="nav-history"
              aria-selected="false"
              onClick={() => setHistoryClick(true)}
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
        <div className="tab-pane fade" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
          {historyClick ? <HistoryPage /> : <></>}
        </div>
      </div>
    </div>
  );
};

export default ShelfPage;
