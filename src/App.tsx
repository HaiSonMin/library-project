import React from "react";
import "./assets/sass/main.scss";
import { Navbar } from "./layout/NavAndFooter/Navbar";
import HomePage from "./layout/HomePage/HomePage";
import Footer from "./layout/NavAndFooter/Footer";
import SearchBookPage from "./layout/SearchBookPage/SearchBookPage";
import { Route, Routes, useNavigate } from "react-router-dom";
import { BookCheckoutPage } from "./layout/BookCheckoutPage/BookCheckoutPage";
import { OktaAuth, toRelativeUrl } from "@okta/okta-auth-js";
import { OktaConfig } from "./lib/OktaConfig";
import { Security, LoginCallback } from "@okta/okta-react";
import LoginWibget from "./Auth/LoginWidget";
import ReviewListPage from "./layout/BookCheckoutPage/ReviewListPage/ReviewListPage";
import ShelfPage from "./layout/ShelfPage/ShelfPage";
import Messages from "./layout/MessagePage/Messages";
import { ManagerLibraryPage } from "./layout/ManagerLibraryPage/ManagerLibraryPage";

function App() {
  const oktaAuth = new OktaAuth(OktaConfig);

  const navigate = useNavigate();

  const customAuthHandler = () => navigate("/login");

  const restoreOriginalUri = async (_oktaAuth: any, originalUri: any) =>
    navigate("/login", { replace: true, state: toRelativeUrl(originalUri || "/", window.location.origin) });

  return (
    <>
      {/* Set up min heigh is 100vh */}
      <div className="d-flex flex-column min-vh-100">
        <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri} onAuthRequired={customAuthHandler}>
          <Navbar />
          <div className="flex-grow-1">
            <Routes>
              <Route path="/" index element={<HomePage />} />
              <Route path="/searchbook" element={<SearchBookPage />} />
              <Route path="/checkoutbook/:bookId" element={<BookCheckoutPage />} />
              <Route path="/reviewlist/:bookId" element={<ReviewListPage />} />
              <Route path="/login" element={<LoginWibget />} />
              <Route path="/login/callback" Component={LoginCallback} />
              <Route path="/shelf" element={<ShelfPage />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/admin" element={<ManagerLibraryPage />} />
            </Routes>
          </div>
          <Footer />
        </Security>
      </div>
    </>
  );
}

export default App;
