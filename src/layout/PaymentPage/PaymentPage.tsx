import { useOktaAuth } from "@okta/okta-react";
import { useState, useEffect } from "react";
import { Spinner } from "../../Utils/Spinner";
import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import { Link } from "react-router-dom";
import PaymentInfoRequest from "../../Models/Request/PaymentInfoRequest";

export const PaymentPage = () => {
  const { authState } = useOktaAuth();
  const [fees, setFees] = useState<number>(0);
  const [isLoadingFees, setIsLoadingFees] = useState<boolean>(true);
  const [httpErrorFees, setHttpErrorFees] = useState<string>("");
  const [submitDisable, setSubmitDisable] = useState<boolean>(false);

  useEffect(() => {
    async function fetchFees() {
      try {
        const url = `${process.env.REACT_APP_API}/payments/search/findByUserEmail?user_email=${authState?.accessToken?.claims.sub}`;
        console.log(url);

        const requestOptions = {
          method: "GET",
          headers: { "Content-type": "application/json" },
        };

        const paymentResponse = await fetch(url, requestOptions);

        const paymentResult = await paymentResponse.json();

        setFees(paymentResult.amount);
      } catch (error: any) {
        setHttpErrorFees(error.message);
      } finally {
        setIsLoadingFees(false);
      }
    }
    fetchFees();
  }, [authState]);

  const elements = useElements();
  const stripe = useStripe();

  async function handlerPaymentFees() {
    try {
      if (!elements || !stripe || !elements.getElement(CardElement)) return;
      setSubmitDisable(true);

      const paymentInfo = new PaymentInfoRequest(Math.round(fees * 100), "USD", authState?.accessToken?.claims.sub);

      const url = `${process.env.REACT_APP_COMMAND}/payments/secure/payment-intent`;

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(paymentInfo),
      };
      const responsePayment = await fetch(url, requestOptions);

      const resultPayment = await responsePayment.json();

      stripe
        .confirmCardPayment(
          resultPayment.client_secret,
          {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: { email: authState?.accessToken?.claims.sub },
            },
          },
          { handleActions: false }
        )
        .then(async function (result: any) {
          if (result.error) {
            setSubmitDisable(false);
            alert("There was an error");
          } else {
            try {
              const url = `${process.env.REACT_APP_COMMAND}/payments/secure/payment-complete`;
              const requestOptions = {
                method: "PUT",
                headers: {
                  Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                  "Content-Type": "application/json",
                },
              };

              await fetch(url, requestOptions);
              setFees(0);
            } catch (error: any) {
              setHttpErrorFees(error.messages);
            } finally {
              setSubmitDisable(false);
            }
          }
        });
    } catch (error: any) {
      setHttpErrorFees(error.message);
    }
  }

  let content: any;
  if (isLoadingFees) content = <Spinner />;
  else if (httpErrorFees)
    content = (
      <div className="m-5">
        <p className="text-danger fs-4 fw-bold">{httpErrorFees}</p>
      </div>
    );
  else {
    content = (
      <>
        {fees > 0 && (
          <div className="card rounded shadow">
            <h4 className="card-header">
              Fees pending: <span className="text-danger fs-4 fw-bold">{fees.toFixed(2)}$</span>
            </h4>
            <div className="card-body p-5">
              <h4 className="card-title fw-bold">Credit card:</h4>
              <CardElement id="card-element" className="my-5" />
              <button className="btn btn--submit" type="button" disabled={submitDisable} onClick={handlerPaymentFees}>
                Pay Fees
              </button>
            </div>
          </div>
        )}
        {fees === 0 && (
          <>
            <h2 className="heading-secondary mt-5 mb-2">Don't have fees to payment</h2>
            <Link className="btn" to={"/searchbook"}>
              Explore the books in library
            </Link>
          </>
        )}
      </>
    );
  }

  return <div className="container">{content}</div>;
};
