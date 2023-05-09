// Request data to BackEnd (Post data to BackEnd)
class ReviewRequestModel {
  bookId: number;
  rating: number;
  reviewDescription?: string;

  constructor(bookId: number, rating: number, reviewDescription?: string) {
    this.bookId = bookId;
    this.rating = rating;
    this.reviewDescription = reviewDescription;
  }
}

export default ReviewRequestModel;
