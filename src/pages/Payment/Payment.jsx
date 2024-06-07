import { loadStripe } from "@stripe/stripe-js";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useSingleScholarship from "../../hooks/useSingleScholarship";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
  const { id } = useParams();
  const [scholarship] = useSingleScholarship(id);
  const { application_fees } = scholarship;
  const fee = parseInt(application_fees?.replace("$", "")) || 0;
  console.log(fee);

  return (
    <div>
      <PageTitle
        title={"Checkout"}
        subtitle={"Pay and apply your favorite scholarship"}
      ></PageTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm fee={fee} id={id}></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
