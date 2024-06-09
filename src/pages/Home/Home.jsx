import Banner from "./Banner/Banner";
import ContactUs from "./ContactUs/ContactUs";
import FAQ from "./FAQ/FAQ";
import TopScholarshops from "./TopScholarships/TopScholarshops";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <TopScholarshops></TopScholarshops>
      <FAQ></FAQ>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
