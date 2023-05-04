import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import MessageModel from "../../../Models/MessageModel";
import { MdDoneAll } from "react-icons/md";
import { BsFillPenFill } from "react-icons/bs";
export const SendMessage = () => {
  const { authState } = useOktaAuth();
  const [title, setTitle] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [displayWarning, setDisplayWarning] = useState(false);
  const [displaySuccess, setDisplaySuccess] = useState(false);

  const handlerChangeTitleInput = (e: any) => setTitle(e.target.value);

  const handlerChangeQuestionInput = (e: any) => setQuestion(e.target.value);

  async function handlerSendMessage() {
    try {
      if (authState && authState.isAuthenticated && question.trim() !== "" && title.trim() !== "") {
        const newMessage = new MessageModel(title, question, authState.accessToken?.claims.sub);

        const url = `${process.env.REACT_APP_COMMAND}/messages/secure/post-message`;

        const requestOptions = {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMessage),
        };

        await fetch(url, requestOptions);

        setTitle("");
        setQuestion("");
        setDisplayWarning(false);
        setDisplaySuccess(true);
      } else {
        setDisplayWarning(true);
        setDisplaySuccess(false);
      }
    } catch (error: any) {
      throw new Error("Something went wrong!!!");
    }
  }

  return (
    <div className="card rounded shadow p-3">
      {displaySuccess && (
        <div className="alert alert-success fs-3" role="alert">
          Question added successfully <MdDoneAll className="mb-2" />
        </div>
      )}
      {displayWarning && (
        <div className="alert alert-danger fs-3" role="alert">
          All fields must be filled out <BsFillPenFill className="mb-2" />
        </div>
      )}
      <div className="card-header fs-4">
        Add question to Admin <span className="fw-bold">MountainSea</span>
      </div>
      <div className="card-body">
        <form method="POST">
          <div className="mb-4">
            <label className="form-label fs-4" htmlFor="exampleFormControlInput1" style={{ cursor: "pointer" }}>
              Title:
            </label>
            <input
              type="text"
              className="form-control fs-4"
              id="exampleFormControlInput1"
              placeholder="Title"
              onChange={handlerChangeTitleInput}
              value={title}
              required
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="form-label fs-4" htmlFor="exampleFormControlTextarea1" style={{ cursor: "pointer" }}>
              Question:
            </label>
            <textarea
              rows={4}
              className="form-control fs-4"
              id="exampleFormControlTextarea1"
              placeholder="Question"
              onChange={handlerChangeQuestionInput}
              value={question}
            />
          </div>
          <div className="mb-4">
            <button type="button" className="btn" onClick={handlerSendMessage}>
              Send Question
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
