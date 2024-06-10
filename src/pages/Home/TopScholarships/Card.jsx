import { FaRegStar } from "react-icons/fa6";
import { BiCategoryAlt } from "react-icons/bi";
import { FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdOutlineShareLocation } from "react-icons/md";
import PrimaryButton from "../../../components/buttons/PrimaryButton";
import useSholarshipReveiw from "../../../hooks/useSholarshipReveiw";

const Card = ({ item }) => {
  console.log(item);
  const {
    university_name,
    university_image,
    scholarship_category,
    application_fees,
    application_deadline,
    subject_category,
    university_country,
    university_city,
    _id,
  } = item;

  const [ScholarshipReviews] = useSholarshipReveiw(_id);
  const totalRating = ScholarshipReviews.reduce(
    (sum, review) => sum + parseFloat(review.rating),
    0
  );

  // Calculate average rating
  const avgRating =
    ScholarshipReviews.length > 0 ? totalRating / ScholarshipReviews.length : 0;

  return (
    <div className=" p-3 md:p-6 border-2 border-[#FF7A00] rounded-2xl shadow-lg transform transition duration-500 hover:scale-105 hover:shadow-2xl flex flex-col justify-between h-full">
      <div>
        <img
          className="rounded-2xl w-full h-48 object-cover mb-4"
          src={university_image}
          alt={university_name}
        />
      </div>
      <div className="flex-grow space-y-2">
        <h1 className="text-xl md:text-2xl font-bold">{university_name}</h1>
        <p>
          <span className="font-bold text-sm">Subject Category: </span>{" "}
          {subject_category}
        </p>
        <p>
          <span className="font-bold">Application Deadline:</span>{" "}
          {application_deadline}
        </p>
        <ul className="flex items-center gap-4 text-lg mt-2">
          <li className="flex items-center gap-2">
            <MdOutlineShareLocation /> {university_city}, {university_country}
          </li>
          <li className="flex items-center gap-2">
            <BiCategoryAlt /> {scholarship_category}
          </li>
        </ul>
        <ul className="flex items-center gap-4 text-lg mt-2">
          <li className="flex items-center gap-2">
            <FaDollarSign /> {application_fees}
          </li>
          <li className="flex items-center gap-2">
            <FaRegStar /> {avgRating}
          </li>
        </ul>
      </div>
      <div className="mt-4">
        <Link to={`/scholarship/${item._id}`}>
          <PrimaryButton text={"View Details"} className="w-full" />
        </Link>
      </div>
    </div>
  );
};

export default Card;
