import BookModel from "../../../Models/BookModel";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEditAlt } from "react-icons/bi";
import { useState } from "react";
import AddBookRequest from "../../../Models/Request/AddBookRequest";
import { useOktaAuth } from "@okta/okta-react";
export const ChangeQuantity: React.FC<{ book: BookModel; handlerDeleteBook: any; handlerSaveChangeInfoBook: any }> = ({
  book,
  handlerDeleteBook,
  handlerSaveChangeInfoBook,
}) => {
  const { authState } = useOktaAuth();
  const [isChange, setIsChange] = useState<boolean>(false);

  // State handler Book
  const [title, setTitle] = useState<string>(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [copies, setCopies] = useState(book.copies);
  const [category, setCategory] = useState(book.category);
  const [selectedImage, setSelectedImage] = useState<any>(book.img);

  // Display Notification
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

  // Handler Event
  const handlerSetTitle = (e: any) => setTitle(e.target.value);
  const handlerSetAuthor = (e: any) => setAuthor(e.target.value);
  const handlerSetDescription = (e: any) => setDescription(e.target.value);
  const handlerSetCategory = (category: string) => setCategory(category);
  const handlerSetCopies = (e: any) => setCopies(+e.target.value);
  const handlerSetSelectedImage = (img: any) => setSelectedImage(img);

  const getBase64 = function (file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      handlerSetSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  };

  async function base64ConversionForImage(e: any) {
    if (e.target.files[0]) getBase64(e.target.files[0]);
  }

  const handlerEdit = () => setIsChange(!isChange);

  const onClickDeleteBook = () => handlerDeleteBook(book.id);

  const onClickSaveBook = async () => {
    if (
      authState?.isAuthenticated &&
      title.trim() !== "" &&
      author?.trim() !== "" &&
      description?.trim() !== "" &&
      copies !== null &&
      category?.trim() !== "Category" &&
      selectedImage.trim() !== ""
    ) {
      const bookAfterUpdate = new AddBookRequest(title, author, description, copies, category, selectedImage);
      handlerSaveChangeInfoBook(book.id, bookAfterUpdate);

      // When edit success
      setDisplaySuccess(true);
      setDisplayWarning(false);
      setIsChange(false);
    } else {
      setDisplaySuccess(false);
      setDisplayWarning(true);
    }
  };

  const imageExist: any = book.img ? (
    <img src={book.img} className="object-fit-cover" alt="Book" width="200px" height="300px" />
  ) : (
    <img
      src={require("../../../assets/images/booksImages/01-BookExplore.jpg")}
      className="object-fit-cover"
      alt="Book"
      width="200px"
      height="300px"
    />
  );

  return (
    <>
      {/* Modal Save */}
      <div className="modal fade" id="saveModal" tabIndex={-1} aria-labelledby="saveModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="saveModalLabel">
                Save Book
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4>Do you want to save the book?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClickSaveBook}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Save */}
      <div className="modal fade" id="deleteModal" tabIndex={-1} aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-3" id="deleteModalLabel">
                Delete Book
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <h4>Do you want to delete the book?</h4>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={onClickDeleteBook}>
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      {/*  */}
      <div className="card shadow rounded mb-5">
        <div className="card-header fs-3 fw-bold d-flex justify-content-between align-items-center">
          <p className="m-0">Information detail of book</p>
          <div className="d-flex align-items-center gap-4 fs-2">
            <BiEditAlt className="hover-opacity-70" style={{ cursor: "pointer" }} onClick={handlerEdit} />
            <RiDeleteBin5Line className="hover-opacity-70" style={{ cursor: "pointer" }} data-bs-toggle="modal" data-bs-target="#deleteModal" />
          </div>
        </div>
        <div className="card-body">
          <form method="PUT">
            <div className="row mb-3">
              <div className="col-sm-6">
                <label className="form-label fs-4" htmlFor="exampleFormControlInput1" style={{ cursor: "pointer" }}>
                  Title
                </label>
                <input
                  type="text"
                  className="form-control fs-4 py-2"
                  id="exampleFormControlInput1"
                  placeholder="Title"
                  onChange={handlerSetTitle}
                  value={title}
                  required
                  disabled={isChange ? false : true}
                />
              </div>
              <div className="col-sm-3">
                <label className="form-label fs-4" htmlFor="exampleFormControlInput2" style={{ cursor: "pointer" }}>
                  Author
                </label>
                <input
                  type="text"
                  className="form-control fs-4 py-2"
                  id="exampleFormControlInput2"
                  placeholder="Author"
                  onChange={handlerSetAuthor}
                  value={author}
                  required
                  disabled={isChange ? false : true}
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="exampleFormSelected1" className="form-label fs-4">
                  Category
                </label>
                <div className="dropdown-center" id="exampleFormSelected1">
                  <button
                    className="btn dropdown-toggle w-100 py-2 fs-4 "
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={isChange ? false : true}
                  >
                    {category}
                  </button>
                  <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                    <li onClick={() => handlerSetCategory("All")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100 " href="#">
                        All
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("BE")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        BackEnd
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("FE")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        FrontEnd
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("Data")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        Data
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("DevOps")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        DevOps
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("Love")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        Love
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("Novel")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        Novel
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("Economy")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        Economy
                      </a>
                    </li>
                    <li onClick={() => handlerSetCategory("Education")}>
                      <a className="dropdown-item fs-3 d-inline-block w-100" href="#">
                        Education
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mb-3">
                <label htmlFor="exampleFormControlTextarea1" className="form-label fs-4" style={{ cursor: "pointer" }}>
                  Description
                </label>
                <textarea
                  className="form-control fs-4"
                  id="exampleFormControlTextarea1"
                  rows={6}
                  placeholder="Description"
                  value={description}
                  onChange={handlerSetDescription}
                  disabled={isChange ? false : true}
                />
              </div>
              <div className="col-1 mb-3">
                <label htmlFor="exampleFormControlInput3" className="form-label fs-4" style={{ cursor: "pointer" }}>
                  Copies
                </label>
                <input
                  className="form-control fs-4 py-2"
                  id="exampleFormControlInput3"
                  type="number"
                  value={copies}
                  onChange={handlerSetCopies}
                  disabled={isChange ? false : true}
                />
              </div>
              <div className="mb-4 d-flex flex-column">
                <label htmlFor="formFile" className="form-label fs-4">
                  {!isChange ? "Image" : "Select Image"}
                </label>
                {isChange ? (
                  <input
                    className="form-control fs-4"
                    type="file"
                    id="formFile"
                    onChange={(e) => base64ConversionForImage(e)}
                    disabled={isChange ? false : true}
                  />
                ) : (
                  imageExist
                )}
              </div>
              {isChange && (
                <div className="">
                  <button className="btn" type="button" data-bs-target="#saveModal" data-bs-toggle="modal">
                    Save Information
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
