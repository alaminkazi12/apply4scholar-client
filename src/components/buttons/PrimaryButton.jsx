import { FaCircleArrowRight } from "react-icons/fa6";
const PrimaryButton = ({ text }) => {
  return (
    <button className="px-10 py-4 bg-[#1A73E8] text-white text-2xl font-bold rounded-xl flex justify-center items-center gap-4">
      {text} <FaCircleArrowRight />
    </button>
  );
};

export default PrimaryButton;
