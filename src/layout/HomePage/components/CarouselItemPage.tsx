import BookModel from "../../../Models/BookModel";
import { ReturnBook } from "./ReturnBook";

export const CarouselItemPage: React.FC<{ indexStart: number; indexEnd: number; books: BookModel[] }> = ({ indexStart, indexEnd, books }) => {
  return (
    <div className="row d-flex justify-content-center align-items-center">
      <div className="row justify-content-center">
        {books.slice(indexStart, indexEnd).map((book) => (
          <ReturnBook book={book} key={book.id} />
        ))}
      </div>
    </div>
  );
};
