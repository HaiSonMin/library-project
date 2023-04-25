import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-dark">
      <footer
        className="container d-flex flex-wrap 
      justify-content-between align-items-center py-5 "
      >
        <p className="col-md-4 mb-0 text-white fs-4">© Library App</p>
        <ul className="nav navbar-dark col-md-4 justify-content-end">
          <li className="nav-item">
            <Link to="/" className="nav-link px-2 fs-3 mr-5 text-white">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/searchbook" className="nav-link px-2 fs-3 text-white">
              Search Books
            </Link>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
