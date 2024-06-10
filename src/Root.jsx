import { Outlet } from "react-router-dom";
import Navbar from "./shared/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </div>
  );
};

export default Root;
