import { useOktaAuth } from "@okta/okta-react";
import MessageModel from "../../../Models/MessageModel";
import { useEffect, useState } from "react";
import { Spinner } from "../../../Utils/Spinner";
import { Pagination } from "../../../Utils/Pagination";
export const MessagePage = () => {
  const { authState } = useOktaAuth();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [httpError, setHttpError] = useState<string>("");

  // Messages
  const [messages, setMessages] = useState<MessageModel[]>([]);

  // Pagination
  const [totalPage, setTotalPage] = useState<number>(0);
  const [messagePerPage] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        if (authState && authState.isAuthenticated) {
          const url = `http://localhost:9000/api/messages/search/findByUserEmail?user_email=${authState.accessToken?.claims.sub}&page=${
            currentPage - 1
          }&size=${messagePerPage}`;

          const requestOptions = {
            method: "GET",
            headers: {
              Authorization: `Bearer ${authState.accessToken?.accessToken}`,
              "Content-Type": "application/json",
            },
          };

          const response = await fetch(url, requestOptions);

          const resultMessage = await response.json();

          console.log(resultMessage);

          setMessages(resultMessage._embedded.messages);
          setTotalPage(resultMessage.page.totalPages);
          window.scrollTo(0, 0);
        }
      } catch (error: any) {
        setHttpError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [authState, currentPage, messagePerPage]);

  const paginate = (numberPage: number) => setCurrentPage(numberPage);

  let content: any;

  if (isLoading) content = <Spinner />;
  else if (httpError) {
    content = <p className="text-danger fw-bold fs-3">{httpError}</p>;
  } else {
    content = (
      <div>
        {messages.length > 0 ? (
          <>
            <h3 className="heading-tertiary my-3">Current response:</h3>
            {messages.map((mes) => (
              <div className="card shadow rounded p-4 mb-3" key={mes.id}>
                <h5 className="fs-4">
                  Case <span className="fw-bold">#{mes.id}</span>: {mes.title}
                </h5>
                <h6 className="fs-5">{mes.userEmail}</h6>
                <p className="fs-4 mb-0">Question: {mes.question}</p>
                <hr />
                <div>
                  <h5 className="fs-4">Response:</h5>
                  {mes.response && mes.adminEmail ? (
                    <>
                      <h6>{mes.adminEmail} (admin)</h6>
                      <h6>{mes.adminEmail} (admin)</h6>
                    </>
                  ) : (
                    <p className="fs-4 mb-0">
                      <i>Pending response from administration. Please be patient!!!</i>
                    </p>
                  )}
                </div>
              </div>
            ))}
          </>
        ) : (
          <h3 className="heading-tertiary">Current Q/A</h3>
        )}
        <div className="d-flex justify-content-center align-items-center">
          {totalPage > 1 && <Pagination currentPage={currentPage} paginate={paginate} totalPage={totalPage} />}
        </div>
      </div>
    );
  }

  return <div className="container">{content}</div>;
};
