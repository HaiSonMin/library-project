import logoPage from "../../assets/images/booksImages/01-LogoPage.png";
import { BiUser, BiLogOut } from "react-icons/bi";
import { Link, NavLink } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
export const Navbar = () => {
  const { authState, oktaAuth } = useOktaAuth();

  const handlerLogout = async () => {
    oktaAuth.signOut();
  };

  return (
    <>
      <header className="header">
        {/* Nav Bar */}
        <nav className="navbar navbar-expand-sm p-5 ">
          <div className="container-fluid d-flex align-items-center">
            <button
              className="navbar-toggler w-5r h-4r"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarDropDown"
              aria-controls="navbarDropDown"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <Link className="navbar-brand header__logo mb-sm-2" to="/home">
              <img src={require("../../assets/images/booksImages/01-LogoPage.png")} className="header__logo" />
            </Link>
            <div className="collapse navbar-collapse d-flex-sm justify-content-between" id="navbarDropDown">
              <ul className="navbar-nav ms-sm-5 mb-3 mb-sm-0  d-flex-sm gap-sm-5">
                <li className="nav-item">
                  <NavLink className="nav-link fs-2 lh-sm" aria-current="page" to="/home">
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link fs-2 lh-sm" to="searchbook">
                    SearchBook
                  </NavLink>
                </li>
                {authState?.isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link fs-2 lh-sm" to="shelf">
                      ShelfBooks
                    </NavLink>
                  </li>
                )}
                {authState?.isAuthenticated && (
                  <li className="nav-item">
                    <NavLink className="nav-link fs-2 lh-sm" to="admin">
                      Admin
                    </NavLink>
                  </li>
                )}
              </ul>
              {!authState?.isAuthenticated ? (
                <Link className="btn btn--login" to={"/login"}>
                  Sign in {<BiUser />}{" "}
                </Link>
              ) : (
                <button className="btn btn--login" onClick={handlerLogout}>
                  Logout {<BiLogOut />}{" "}
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};
