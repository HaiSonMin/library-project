import { useState } from "react";
import { SendMessage } from "./components/SendMessage";
import { MessagePage } from "./components/MessagePage";

export default function Messages() {
  const [messagesClick, setMessagesClick] = useState(false);
  return (
    <div className="container">
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button
            onClick={() => setMessagesClick(false)}
            className="nav-link active fs-4"
            id="nav-send-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-send-message"
            role="tab"
            type="button"
            aria-controls="nav-send-message"
            aria-selected="true"
          >
            Send Message
          </button>
          <button
            onClick={() => setMessagesClick(true)}
            className="nav-link fs-4"
            id="nav-message-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-message"
            role="tab"
            type="button"
            aria-controls="nav-message"
            aria-selected="false"
          >
            Q/A Response/Pending
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-send-message" role="tabpanel" aria-labelledby="nav-send-message-tab">
          <SendMessage />
        </div>
        <div className="tab-pane fade " id="nav-message" role="tabpanel" aria-labelledby="nav-message-tab">
          {messagesClick ? <MessagePage /> : <></>}
        </div>
      </div>
    </div>
  );
}
