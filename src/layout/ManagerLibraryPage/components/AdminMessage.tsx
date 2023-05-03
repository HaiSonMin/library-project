import { useState } from "react";
import MessageModel from "../../../Models/MessageModel";

export const AdminMessage: React.FC<{ message: MessageModel; submitResponseToQuestion: any }> = ({ message, submitResponseToQuestion }) => {
  const [responseInput, setResponseInput] = useState<string>("");
  const [displayWarning, setDisplayWarning] = useState<boolean>(false);

  const handlerResponseQuestion = () => {
    if (message.id !== null && responseInput.trim() !== "") {
      submitResponseToQuestion(message.id, responseInput);
      setDisplayWarning(false);
    } else {
      setDisplayWarning(true);
    }
  };

  return (
    <div key={message.id} className="card rounded shadow p-4 mb-3">
      <h3 className="">
        Case <span className="fw-bold">#{message.id}</span>: {message.title}
      </h3>
      <h4 className="">{message.userEmail}</h4>
      <p className="fs-4 mb-0">Question: {message.question}</p>
      <hr />
      <div>
        <h5 className="fs-4">Response:</h5>
        <form method="PUT">
          {displayWarning && (
            <div className="alert alert-danger" role="alert">
              All fields must be fielded out!!!
            </div>
          )}
          <textarea rows={4} className="p-2 fs-4 w-100 mb-2" value={responseInput} onChange={(e) => setResponseInput(e.target.value)} />
          <button type="button" className="btn btn--submit" onClick={handlerResponseQuestion}>
            Response Question
          </button>
        </form>
      </div>
    </div>
  );
};
