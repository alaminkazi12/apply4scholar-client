import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import slider1 from "../../../assets/banner/slider-1.jpg";
import slider2 from "../../../assets/banner/slider-2.jpg";
import slider3 from "../../../assets/banner/slider-3.jpg";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const Banner = () => {
  return (
    <Carousel
      autoPlay
      interval="4000"
      transitionTime="1000"
      infiniteLoop
      showStatus={false}
      showThumbs={false}
    >
      {/* <div className="">
        <img src={slider1} />
        <div className="">
          <h2 className="text-6xl font-bold">Find Your Perfect Scholarship</h2>
          <p className="text-2xl">Unlock Your Potential with Apply4Scholar</p>
          <div>
            <PrimaryButton text={"Get Started"}></PrimaryButton>
          </div>
        </div>
      </div> */}
      <div className="relative">
        <img src={slider1} className="w-full h-auto" alt="Scholarship" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-6xl font-bold">Find Your Perfect Scholarship</h2>
          <p className="text-2xl mt-4">
            Unlock Your Potential with Apply4Scholar
          </p>
          <div className="mt-6">
            <PrimaryButton text={"Get Started"}></PrimaryButton>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src={slider2} className="w-full h-auto" alt="Scholarship" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-6xl font-bold">Top Scholarships Available</h2>
          <p className="text-2xl mt-4">
            Explore the Best Scholarships for Your Education
          </p>
          <div className="mt-6">
            <PrimaryButton text={"Browse Scholarships"}></PrimaryButton>
          </div>
        </div>
      </div>
      <div className="relative">
        <img src={slider3} className="w-full h-auto" alt="Scholarship" />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
          <h2 className="text-6xl font-bold">Featured Universities</h2>
          <p className="text-2xl mt-4">
            Discover Prestigious Universities Worldwide
          </p>
          <div className="mt-6">
            <PrimaryButton text={"Learn More"}></PrimaryButton>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default Banner;
