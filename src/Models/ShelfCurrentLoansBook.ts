import BookModel from "./BookModel";

class ShelfCurrentLoansBook {
  book: BookModel;
  daysLeft: number;

  constructor(book: BookModel, dayReturn: number) {
    this.book = book;
    this.daysLeft = dayReturn;
  }
}
export default ShelfCurrentLoansBook;
