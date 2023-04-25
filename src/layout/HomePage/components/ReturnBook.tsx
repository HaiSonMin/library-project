import { Link } from "react-router-dom";
import BookModel from "../../../Models/BookModel";

export const ReturnBook: React.FC<{ book: BookModel }> = ({ book }) => {
  return (
    <div className="col-md-3 text-center">
      {book.img ? (
        <img src={book.img} width="200" height="233" alt="book" />
      ) : (
        <img src={require("../../../assets/images/booksImages/02_BookCSharp.jpg")} width="200" alt="book" />
      )}
      <div className="py-3">
        <h5 className="mt-2 fs-2 fw-bold line--clamp-1">{book.title}</h5>
        <p className="fs-3">{book.author}</p>
        <Link className="btn btn-buy" to={`/checkoutbook/${book.id}`}>
          Reserve
        </Link>
      </div>
    </div>
  );
};
