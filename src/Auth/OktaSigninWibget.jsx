import { useRef, useEffect } from "react";
import OktaSignIn from "@okta/okta-signin-widget";
import "@okta/okta-signin-widget/css/okta-sign-in.min.css";
import { OktaConfig } from "../lib/OktaConfig";

const OktaSigninWibget = function ({ onSuccess, onError }) {
  const widgetRef = useRef(); // Referent old value then re-render

  useEffect(() => {
    if (!widgetRef.current) return false;
    const widget = new OktaSignIn(OktaConfig);

    widget
      .showSignInToGetTokens({
        el: widgetRef.current,
      })
      .then(onSuccess)
      .catch(onError);

    // Clean up when every re-render
    return () => widget.remove();
  }, [onError, onSuccess]);

  return (
    <div className="container my-5">
      <div ref={widgetRef}></div>
    </div>
  );
};

export default OktaSigninWibget;
