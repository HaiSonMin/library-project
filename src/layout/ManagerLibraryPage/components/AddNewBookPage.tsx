import { useState } from "react";

export const AddNewBookPage = () => {
  // Set Page Active

  const [categorySelection, setCategorySelection] = useState<string>("Category");
  const [title, setTitle] = useState<string>("");
  const [author, setAuthor] = useState<string>("");

  const categoryField = (categoryName: string) => setCategorySelection(categoryName);

  return (
    <div>
      <div className="card rounded">
        <h5 className="bg-gray">Add new book</h5>
        <form method="POST">
          <div className="row">
            <div className="col-6">
              <label htmlFor="">Title</label>
              <input className="fs-4" type="text" placeholder="Title" value={title} required />
            </div>
            <div className="col-3">
              <label htmlFor="">Author</label>
              <input className="fs-4" type="text" placeholder="Author" value={author} required />
            </div>
            <div className="col-3">
              <label htmlFor="">Category</label>
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
        </form>
      </div>
    </div>
  );
};
