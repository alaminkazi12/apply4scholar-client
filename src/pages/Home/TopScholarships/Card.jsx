import { MdOutlineShareLocation } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
const Card = ({ item }) => {
  console.log(item);
  const {
    application_deadline,
    application_fees,
    reviews,
    scholarship_category,
    university_name,
    university_image,
    university_location,
  } = item;
  console.log(reviews);
  const total_rating = reviews.reduce(
    (sum, review) => sum + review.rating_point,
    0
  );
  const averageRating = total_rating / reviews.length;

  return (
    <div className="p-6 border-2 border-[#FF7A00] rounded-2xl space-y-2">
      <div>
        <img
          className="rounded-2xl w-full"
          src={university_image}
          alt={university_name}
        />
      </div>
      <div className=" space-y-2">
        <h1 className="text-2xl font-bold">{university_name}</h1>
        <p>
          <span className="font-bold">Application Deadline:</span>{" "}
          {application_deadline}
        </p>
        <ul className="flex items-center gap-10 text-lg">
          <li className="flex items-center gap-2">
            <MdOutlineShareLocation /> {university_location.country}
          </li>
          <li className="flex items-center gap-2">
            {" "}
            <BiCategoryAlt /> {scholarship_category}
          </li>
        </ul>
        <ul className="flex items-center gap-10 text-lg">
          <li className="flex items-center gap-2">
            <FaDollarSign /> {application_fees}
          </li>
          <li className="flex items-center gap-2">
            <FaRegStar /> {averageRating}
          </li>
        </ul>
        <div className="mt-6 pt-4">
          <Link>
            <PrimaryButton text={"View Details"}></PrimaryButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
