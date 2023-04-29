import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const LibraryServices = function () {
  const { authState } = useOktaAuth();

  return (
    <section className="section-library">
      <div className="container my-5">
        <div className="row p-4 align-items-center justify-content-between border shadow-lg">
          <div className="col-lg-6 p-3">
            <h2 className="heading-secondary">Can't find what you are looking for?</h2>
            <p className="lead fs-3 my-4 text-body-secondary">
              If you cannot find what you are looking for, send our library admin's a personal message!
            </p>
            <div className="d-grid gap-2 justify-content-md-start mb-4 mb-lg-3">
              {!authState?.isAuthenticated ? (
                <Link className="btn btn--hero" to="/login">
                  Sign up
                </Link>
              ) : (
                <Link className="btn btn--hero" to="/messages">
                  Messages
                </Link>
              )}
            </div>
          </div>
          <div className="col-lg-5 shadow-lg p-0">
            <img src={require("../../../assets/images/publicImage/03-LibraryBook.jpg")} alt="Book Library" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LibraryServices;
