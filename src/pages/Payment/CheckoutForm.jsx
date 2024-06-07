import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const CheckoutForm = ({ fee, id }) => {
  const [error, setError] = useState("");
  const [tnxid, setTnxid] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const { user } = useContext(AuthContext);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    if (fee > 0) {
      axiosSecure.post("/create-payment-intent", { price: fee }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [axiosSecure, fee]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }

    // confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymouse",
            name: user?.displayName || "anonymouse",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm Error");
    } else {
      console.log("Payment intent, ", paymentIntent);
      if (paymentIntent.status === "succeeded") {
        setTnxid(paymentIntent.id);

        // now save the paymnet to the database
        const payment = {
          email: user.email,
          price: fee,
          date: new Date(),
          scholarship_id: id,
          tnxid: paymentIntent.id,
          status: "pending",
        };

        const res = await axiosSecure.post("/payments", payment);
        console.log("Paymnet saved", res.data);
        if (res.data.insertedId) {
          toast.success("Payment Successfull");
        }
      }
    }
  };
  return (
    <form
      className=" md:w-[500px] shadow-xl flex flex-col mx-auto space-y-10 mt-10 border-2 p-6 rounded-xl"
      onSubmit={handleSubmit}
    >
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />

      <button
        className="btn btn-primary"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        $ {fee}
      </button>
      <div>
        <p className="text-red-700 text-center">{error}</p>
        {tnxid && (
          <p className="text-green-700 text-center">
            Your Transaction Id: {tnxid}
          </p>
        )}
      </div>
    </form>
  );
};

export default CheckoutForm;
