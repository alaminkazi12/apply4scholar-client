import { FaCircleArrowRight } from "react-icons/fa6";

const PrimaryButton = ({ text }) => {
  return (
    <button className="px-10 py-4 bg-[#1A73E8] text-white text-2xl font-bold rounded-xl flex justify-center items-center gap-4 transition-all duration-300 hover:scale-105 hover:bg-[#155ab8] hover:shadow-xl group">
      {text}
      <FaCircleArrowRight className="transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-90" />
    </button>
  );
};

export default PrimaryButton;
