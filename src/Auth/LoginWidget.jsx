import { useOktaAuth } from "@okta/okta-react";
import { Spinner } from "../Utils/Spinner";
import OktaSigninWibget from "./OktaSigninWibget";
import { Navigate } from "react-router-dom";

const LoginWibget = function () {
  const { authState, oktaAuth } = useOktaAuth();
  const onSuccess = (tokens) => oktaAuth.handleLoginRedirect(tokens);
  const onError = (err) => console.log("Sign in Error " + err);
  console.log(authState, oktaAuth);

  if (!authState) return <Spinner />;

  return authState?.isAuthenticated ? <Navigate to="/home" /> : <OktaSigninWibget onSuccess={onSuccess} onError={onError} />;
};

export default LoginWibget;
