// Same field with value
class HistoryBook {
  id: number;
  userEmail: string;
  checkoutDate: Date;
  returnDate: Date;
  title: string;
  author?: string;
  description?: string;
  img?: string;

  constructor(
    id: number,
    userEmail: string,
    checkoutDate: Date,
    returnDate: Date,
    title: string,
    author?: string,
    description?: string,
    img?: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.checkoutDate = checkoutDate;
    this.returnDate = returnDate;
    this.title = title;
    this.author = author;
    this.description = description;
    this.img = img;
  }
}
export default HistoryBook;
