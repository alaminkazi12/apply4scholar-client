import { Helmet } from "react-helmet-async";
import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import FAQ from "./FAQ/FAQ";
import Reveiews from "./Reveiews/Reveiews";
import TopScholarshops from "./TopScholarships/TopScholarshops";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home | Apply4Scholar.com</title>
      </Helmet>
      <Banner></Banner>
      <TopScholarshops></TopScholarshops>
      <Reveiews></Reveiews>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
