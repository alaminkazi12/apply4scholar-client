import { loadStripe } from "@stripe/stripe-js";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import useSingleScholarship from "../../hooks/useSingleScholarship";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_stripe_key);

const Payment = () => {
  const { id } = useParams();
  const [scholarship] = useSingleScholarship(id);
  const {
    application_fees,
    scholarship_category,
    subject_name,
    university_name,
    subject_category,
    university_country,
    university_city,
  } = scholarship;
  const fee = parseInt(application_fees?.replace("$", "")) || 0;
  console.log(subject_name, scholarship_category);

  return (
    <div>
      <Helmet>
        <title>Payment | Apply4Scholar.com</title>
      </Helmet>
      <PageTitle
        title={"Checkout"}
        subtitle={"Pay and apply your favorite scholarship"}
      ></PageTitle>
      <div>
        <Elements stripe={stripePromise}>
          <CheckoutForm
            fee={fee}
            id={id}
            scholarship_category={scholarship_category}
            subject_name={subject_name}
            university_name={university_name}
            subject_category={subject_category}
            university_country={university_country}
            university_city={university_city}
          ></CheckoutForm>
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
