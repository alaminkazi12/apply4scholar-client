import { FaCircleArrowRight } from "react-icons/fa6";

const SecondaryButton = ({ text }) => {
  return (
    <button className="px-8 py-3 bg-[#FF7A00] text-white text-xl font-bold rounded-xl flex items-center gap-4">
      {text} <FaCircleArrowRight />
    </button>
  );
};

export default SecondaryButton;
