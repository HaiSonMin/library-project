import BookModel from "../../Models/BookModel";
import { Link } from "react-router-dom";

export const ListBook: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="card shadow p-3 mb-3 bg-body rounded">
      <div className="row p-5">
        <div className="col-md-2 d-flex align-items-center justify-content-center">
          {/* Laptop */}
          <div className="">
            {book.img ? (
              <img src={book.img} alt={`Book ${book.category}`} className="object-fit-cover" width="120px" height="190px" />
            ) : (
              <img
                src={require("../../assets/images/publicImage/02-HeroBook.jpg")}
                className="object-fit-cover"
                alt="Book"
                width="120px"
                height="190px"
              />
            )}
          </div>
        </div>
        <div className="col-md-7">
          <div className="card-body">
            <h3 className="heading-tertiary">{book.title}</h3>
            <h5 className="card-author fw-bold my-3">{book.author}</h5>
            <p className="card-desc fs-5 line--clamp-5">{book.description}</p>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <Link className="btn" to={`/checkoutbook/${book.id}`}>
            View Detail
          </Link>
        </div>
      </div>
    </div>
  );
};
