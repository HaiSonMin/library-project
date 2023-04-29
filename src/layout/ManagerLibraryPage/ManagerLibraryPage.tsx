import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { AddNewBookPage } from "./components/AddNewBookPage";
import { ChangeQuantityPage } from "./components/ChangeQuantityPage";
import { ResponseMessagePage } from "./components/ResponseMessagePage";
import { Navigate, redirect } from "react-router-dom";

const ADD_NEW_BOOK_PAGE: string = "add_new_book_page";
const CHANGE_QUANTITY_PAGE: string = "author_page";
const MESSAGES_PAGE: string = "messages_page";

export const ManagerLibraryPage = () => {
  const [pageActive, setPageActive] = useState<string>(ADD_NEW_BOOK_PAGE);

  const { authState } = useOktaAuth();
  const [changeQuantityOfBooksClick, setChangeQuantityOfBooksClick] = useState(false);
  const [messagesClick, setMessagesClick] = useState(false);

  const changePageClickFunction = (namePage: string) => setPageActive(namePage);

  if (authState?.accessToken?.claims.userType === undefined) return <Navigate to="/home" />;

  return (
    <div className="container">
      <h3 className="heading-tertiary mb-3">Manager Library</h3>
      <nav className="nav nav-tabs" id="nav-tab" role="tablist">
        <button
          className="nav-link active fs-3"
          role="tab"
          type="button"
          id="nav-add-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-add"
          aria-controls="nav-add"
          aria-selected="true"
          onClick={() => changePageClickFunction(ADD_NEW_BOOK_PAGE)}
        >
          Add new book
        </button>
        <button
          className="nav-link fs-3"
          role="tab"
          type="button"
          id="nav-change-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-change"
          aria-controls="nav-change"
          aria-selected="false"
          onClick={() => changePageClickFunction(CHANGE_QUANTITY_PAGE)}
        >
          Change quantity
        </button>
        <button
          className="nav-link fs-3"
          role="tab"
          type="button"
          id="nav-message-tab"
          data-bs-toggle="tab"
          data-bs-target="#nav-message"
          aria-controls="nav-message"
          aria-selected="false"
          onClick={() => changePageClickFunction(MESSAGES_PAGE)}
        >
          Messages
        </button>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-add" role="tabpanel" aria-labelledby="nav-add-tab" tabIndex={0}>
          {pageActive === ADD_NEW_BOOK_PAGE && <AddNewBookPage />}
        </div>
        <div className="tab-pane fade " id="nav-change" role="tabpanel" aria-labelledby="nav-change-tab" tabIndex={0}>
          {pageActive === CHANGE_QUANTITY_PAGE && <ChangeQuantityPage />}
        </div>
        <div className="tab-pane fade " id="nav-message" role="tabpanel" aria-labelledby="nav-message-tab" tabIndex={0}>
          {pageActive === MESSAGES_PAGE && <ResponseMessagePage />}
        </div>
      </div>
    </div>
  );
};
