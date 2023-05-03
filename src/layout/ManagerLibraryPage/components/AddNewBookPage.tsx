import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { AiOutlineWarning } from "react-icons/ai";
import { GiCheckMark } from "react-icons/gi";
import AddBookRequest from "../../../Models/Request/AddBookRequest";

export const AddNewBookPage = () => {
  const { authState } = useOktaAuth();

  // State handler Book
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [copies, setCopies] = useState<number>(0);
  const [category, setCategory] = useState<string>("Category");
  const [selectedImage, setSelectedImage] = useState<any>(null);

  // Handler Event
  const handlerSetTitle = (e: any) => setTitle(e.target.value);
  const handlerSetAuthor = (e: any) => setAuthor(e.target.value);
  const handlerSetDescription = (e: any) => setDescription(e.target.value);
  const handlerSetCategory = (category: string) => setCategory(category);
  const handlerSetCopies = (e: any) => setCopies(+e.target.value);
  const handlerSetSelectedImage = (img: any) => setSelectedImage(img);

  // Display Notification
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);
  const [displaySuccess, setDisplaySuccess] = useState<boolean>(false);

  function getBase64(file: any) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      handlerSetSelectedImage(reader.result);
    };
    reader.onerror = function (error) {
      console.log(error);
    };
  }

  async function base64ConversionForImage(e: any) {
    if (e.target.files[0]) getBase64(e.target.files[0]);
  }

  async function createBookResponse() {
    if (
      authState?.isAuthenticated &&
      title.trim() !== "" &&
      author.trim() !== "" &&
      description.trim() !== "" &&
      copies !== null &&
      category.trim() !== "Category" &&
      selectedImage.trim() !== ""
    ) {
      const url = "http://localhost:9000/command/books/secure/create-book";
      const newBook = new AddBookRequest(title, author, description, copies, category, selectedImage);

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBook),
      };

      await fetch(url, requestOptions);

      setDisplaySuccess(true);
      setDisplayWarning(false);
      setTitle("");
      setAuthor("");
      setDescription("");
      setCategory("Category");
      setCopies(0);
    } else {
      setDisplayWarning(true);
      setDisplaySuccess(false);
    }
    try {
    } catch (error) {
      setDisplayWarning(true);
    }
  }

  return (
    <div>
      <div className="card rounded mt-5">
        {displaySuccess && (
          <div className="alert alert-success fs-4 fw-bold" role="alert">
            Add book successfully <GiCheckMark className=" mb-1" />
          </div>
        )}
        {displayWarning && (
          <div className="alert alert-warning fs-4 fw-bold" role="alert">
            All fields must be filled out <AiOutlineWarning className="mb-1" />
          </div>
        )}
        <div className="card-header fs-3">Add new book</div>
        <div className="card-body p-4">
          <form method="POST">
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
                  autoFocus
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
                />
              </div>
              <div className="col-sm-3">
                <label htmlFor="exampleFormSelected1" className="form-label fs-4">
                  Category
                </label>
                <div className="dropdown-center" id="exampleFormSelected1">
                  <button className="btn dropdown-toggle w-100 py-2 fs-4 " type="button" data-bs-toggle="dropdown" aria-expanded="false">
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
              />
            </div>
            <div className="col-1 mb-3">
              <label htmlFor="exampleFormControlInput3" className="form-label fs-4" style={{ cursor: "pointer" }}>
                Copies
              </label>
              <input className="form-control fs-4 py-2" id="exampleFormControlInput3" type="number" value={copies} onChange={handlerSetCopies} />
            </div>
            <div className="mb-4">
              <label htmlFor="formFile" className="form-label fs-4">
                Select image
              </label>
              <input className="form-control fs-4" type="file" id="formFile" onChange={(e) => base64ConversionForImage(e)} />
            </div>
            <div className="">
              <button className="btn" type="button" onClick={createBookResponse}>
                Create new book
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
