import { useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

const Heros = function () {
  const { authState } = useOktaAuth();

  return (
    <section className="section-hero">
      <div className="d-none d-lg-block">
        <div className="section-hero__context row g-0 mt-5">
          <div className="col-sm-6 col-md-6">
            <div className="col-image-left"></div>
          </div>
          <div className="col-4 col-md-4 container d-flex justify-content-center align-items-center">
            <div className="ml-2">
              <h3 className="heading-tertiary">What have you been reading?</h3>
              <p className="lead fs-4 my-4 text-body-secondary">
                The library team would love to know what you have been reading. Whether it is to learn a new skill or grow within one, we will be able
                to provide the top content for you!
              </p>
              {!authState?.isAuthenticated ? (
                <Link className="btn btn--hero" to="/login">
                  Sign up
                </Link>
              ) : (
                <Link className="btn btn--hero" to="/searchbook">
                  Explore
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="section-hero__context row g-0">
          <div
            className="col-4 col-md-4 container d-flex 
                        justify-content-center align-items-center"
          >
            <div className="ml-2">
              <h3 className="heading-tertiary">Our collection is always changing!</h3>
              <p className="lead fs-4 my-4 text-body-secondary">
                Try to check in daily as our collection is always changing! We work nonstop to provide the most accurate book selection possible for
                our Luv 2 Read students! We are diligent about our book selection and our books are always going to be our top priority.
              </p>
              {!authState?.isAuthenticated ? (
                <Link className="btn btn--hero" to="/login">
                  Sign up
                </Link>
              ) : (
                <Link className="btn btn--hero" to="/searchbook">
                  Explore
                </Link>
              )}
            </div>
          </div>
          <div className="col-sm-6 col-md-6">
            <div className="col-image-right"></div>
          </div>
        </div>
      </div>

      {/* Mobile Heros */}
      <div className="d-lg-none">
        <div className="container">
          <div className="m-2">
            <div className="col-image-left"></div>
            <div className="mt-2">
              <h3 className="heading-tertiary">What have you been reading?</h3>
              <p className="lead fs-4 my-4 text-body-secondary">
                The library team would love to know what you have been reading. Whether it is to learn a new skill or grow within one, we will be able
                to provide the top content for you!
              </p>
              <Link className="btn btn--hero" to="/login">
                Sign up
              </Link>
            </div>
          </div>
          <div className="m-2">
            <div className="col-image-right"></div>
            <div className="mt-2">
              <h3 className="heading-tertiary">Our collection is always changing!</h3>
              <p className="lead fs-4 my-4 text-body-secondary">
                Try to check in daily as our collection is always changing! We work nonstop to provide the most accurate book selection possible for
                our Luv 2 Read students! We are diligent about our book selection and our books are always going to be our top priority.
              </p>
              <Link className="btn btn--hero" to="/login">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Heros;
