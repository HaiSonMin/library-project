import { useState, useEffect } from "react";
import { useOktaAuth } from "@okta/okta-react";
import MessageModel from "../../../Models/MessageModel";
import { Spinner } from "../../../Utils/Spinner";
import { Pagination } from "../../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../Models/Request/AdminMessageRequest";

export const AdminMessagePage = () => {
  const { authState } = useOktaAuth();

  // Loading and Error
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");
  const [httpErrorAdminMessage, setHttpErrorAdminMessage] = useState<string>();

  // Data messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [messagePerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(0);

  // Recall useEffect
  const [submitQuestion, setSubmitQuestion] = useState<boolean>(false);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url = `${process.env.REACT_APP_API}/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagePerPage}`;

          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const resultMessages = await response.json();

          setMessages(resultMessages._embedded.messages);
          setTotalPage(resultMessages.page.totalPages);
        }
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [authState, currentPage, messagePerPage, submitQuestion]);

  async function submitResponseToQuestion(id: number, response: string) {
    try {
      if (authState && authState.isAuthenticated && id !== null && response.trim() !== "") {
        const adminMessageRequest = new AdminMessageRequest(id, response);
        const url = `${process.env.REACT_APP_COMMAND}/messages/secure/put-message`;
        const responseOptions = {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(adminMessageRequest),
        };

        await fetch(url, responseOptions);
        setSubmitQuestion(!submitQuestion);
      }
    } catch (error: any) {
      setHttpErrorAdminMessage(error.message);
    }
  }
  const paginate = (numberPage: number) => setCurrentPage(numberPage);

  let content: any;

  if (isLoading) content = <Spinner />;
  else if (httpError || httpErrorAdminMessage)
    content = (
      <div className="m-5">
        <p>{httpError}</p>
      </div>
    );
  else {
    content = (
      <>
        {messages.length > 0 ? (
          <div className="m-5">
            <h3 className="heading-tertiary">Pending Q/A</h3>
            {messages.map((mes) => (
              <AdminMessage message={mes} submitResponseToQuestion={submitResponseToQuestion} />
            ))}
            {totalPage > 1 && <Pagination currentPage={currentPage} paginate={paginate} totalPage={totalPage} />}
          </div>
        ) : (
          <h2 className="heading-secondary mt-5 mb-2">No pending Q/A</h2>
        )}
      </>
    );
  }

  return <div className="container">{content}</div>;
};
