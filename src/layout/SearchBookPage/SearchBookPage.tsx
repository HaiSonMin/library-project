import { useState, useEffect } from "react";
import BookModel from "../../Models/BookModel";
import { Spinner } from "../../Utils/Spinner";
import { ListBook } from "./ListBook";
import { Pagination } from "../../Utils/Pagination";

export default function SearchBookPage() {
  const [books, setBooks] = useState<BookModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookPerpage] = useState(5);
  const [totalAmountOfBook, setTotalAmountOfBook] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [changeSearch, setchangeSearch] = useState<string>("");
  const [searchUrl, setSearchUrl] = useState("");
  const [categorySelection, setCategorySelection] = useState<string>("Category");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        // const urlBase: string = "http://localhost:9000/command/books";

        // // const url: string = `${urlBase}?page=${currentPage - 1}&size=${bookPerpage}`;

        // const response = await fetch(urlBase);

        // const result = await response.json();

        // ------------ Using JPA ------------

        const urlBase: string = "http://localhost:9000/api/books";

        let url: string;

        if (searchUrl.trim() === "") {
          url = `${urlBase}?page=${currentPage - 1}&size=${bookPerpage}`;
        } else {
          let searchWithPage = searchUrl.replace("<pageNumber>", `${currentPage - 1}`);
          url = `${urlBase}${searchWithPage}`;
        }

        const response = await fetch(url);

        const responseJson = await response.json();

        const resultListBook = responseJson._embedded.books;

        const pageDetail = responseJson.page;

        setBooks(resultListBook);

        setTotalAmountOfBook(pageDetail.totalElements === undefined ? resultListBook.length : pageDetail.totalElements);

        setTotalPages(pageDetail.totalPages);
      } catch (error: any) {
        setIsLoading(true);
        setHttpError(error.message);
      } finally {
        window.scrollTo(0, 0);
        setIsLoading(false);
      }
    };
    fetchBooks();
  }, [bookPerpage, currentPage, searchUrl]);

  // Handler change input(Search for title)
  const handlerOnChangeSearch = function (e: any) {
    setchangeSearch(e.target.value);
  };

  // Handler submit(Search for title)
  const searchHandlerSubmit = function (e: any) {
    e.preventDefault();
    paginate(1);
    if (changeSearch.trim() !== "") {
      setSearchUrl(`/search/findByTitleContaining?title=${changeSearch}&page=<pageNumber>&size=${bookPerpage}`);
    } else {
      setSearchUrl("");
    }
  };

  // Handler selection category
  const categoryField = function (categoryName: string) {
    paginate(1);
    if (
      categoryName.toLowerCase() === "fe" ||
      categoryName.toLowerCase() === "be" ||
      categoryName.toLowerCase() === "data" ||
      categoryName.toLowerCase() === "devops" ||
      categoryName.toLowerCase() === "novel" ||
      categoryName.toLowerCase() === "love"
    ) {
      // <pageNumber> sẽ được replace khi render lại
      setCategorySelection(categoryName);
      setSearchUrl(`/search/findByCategoryContaining?category=${categoryName}&page=<pageNumber>&size=${bookPerpage}`);
    } else {
      setCategorySelection("All");
      setSearchUrl("");
    }
  };

  // Used for pagination slice(indexOfFirstBook, indexOfLastBook > lastItem ? lastItem : indexOfLastBook);
  const indexOfLastBook = currentPage * bookPerpage;

  const indexOfFirstBook = indexOfLastBook - bookPerpage;

  const lastItem = indexOfLastBook <= totalAmountOfBook ? indexOfLastBook : totalAmountOfBook;

  // Event function set Current page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // ------------------- Render ListBook -------------------
  let content: any;
  if (isLoading) content = <Spinner />;
  else if (isLoading) {
    content = (
      <div className="container m-5">
        <p>{httpError}</p>
      </div>
    );
  } else {
    content = (
      <>
        {books.map((book) => (
          <ListBook key={book.id} book={book} />
        ))}
      </>
    );
  }

  return (
    <div className="container">
      <div>
        <div className="row mt-5">
          <div className="col-10 col-md-6">
            <form onSubmit={searchHandlerSubmit} className="d-flex">
              <input
                className="from-control py-2 px-3 me-2 fs-3 w-100"
                type="text"
                placeholder="Search"
                aria-labelledby="Search"
                value={changeSearch}
                onChange={handlerOnChangeSearch}
              />
              <button className="btn btn--search">Search</button>
            </form>
          </div>
          <div className="col-4 mt-3 mt-md-0">
            <div className="dropdown">
              <button
                className="btn btn--dropdown dropdown-toggle d-flex justify-content-between"
                id="dropdownMenuButton1"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {categorySelection}
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li onClick={() => categoryField("All")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100 " href="#">
                    All
                  </a>
                </li>
                <li onClick={() => categoryField("BE")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    BackEnd
                  </a>
                </li>
                <li onClick={() => categoryField("FE")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    FrontEnd
                  </a>
                </li>
                <li onClick={() => categoryField("Data")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    Data
                  </a>
                </li>
                <li onClick={() => categoryField("DevOps")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    DevOps
                  </a>
                </li>
                <li onClick={() => categoryField("Love")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    Love
                  </a>
                </li>
                <li onClick={() => categoryField("Novel")}>
                  <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                    Novel
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {totalAmountOfBook > 0 ? (
          <>
            <div className="mt-3">
              <h3 className="heading-tertiary">Number of result: ({totalAmountOfBook})</h3>
            </div>
            <p className="fs-3">
              <span className="fw-bold">{indexOfFirstBook + 1}</span> to <span className="fw-bold">{lastItem}</span> of{" "}
              <span className="fw-bold">{totalAmountOfBook}</span> items
            </p>
          </>
        ) : (
          <div>
            <h2 className="heading-secondary mt-5 mb-2">Can't find the book</h2>
            <button className="btn" onClick={() => setSearchUrl("")}>
              List Book
            </button>
          </div>
        )}

        <div>
          {content}
          {/* If amount page > 1 then pagination will be displayed */}
          <div className="d-flex justify-content-center align-items-center my-5">
            {totalPages > 1 && <Pagination totalPage={totalPages} currentPage={currentPage} paginate={paginate} />}
          </div>
        </div>
      </div>
    </div>
  );
}
