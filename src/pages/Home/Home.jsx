import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import FAQ from "./FAQ/FAQ";
import Reveiews from "./Reveiews/Reveiews";
import TopScholarshops from "./TopScholarships/TopScholarshops";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarshops></TopScholarshops>
      <Reveiews></Reveiews>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
