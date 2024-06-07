import { Link, useParams } from "react-router-dom";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { motion } from "framer-motion";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import useSingleScholarship from "../../hooks/useSingleScholarship";

const ScholershipDetails = () => {
  const { id } = useParams();
  const [scholarship] = useSingleScholarship(id);
  console.log(scholarship);

  const {
    application_deadline,
    application_fees,
    post_date,
    reviews,
    scholarship_category,
    scholarship_description,
    service_charge,
    stipend,
    subject_name,
    university_image,
    university_location,
    university_name,
  } = scholarship;

  return (
    <div>
      <PageTitle
        title={university_name}
        subtitle={scholarship_description?.slice(0, 70)}
      ></PageTitle>
      <motion.div
        className="max-w-4xl mx-auto mt-10 bg-white shadow-md rounded-lg overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img
          className="w-full h-64 object-cover"
          src={university_image}
          alt={university_name}
        />
        <div className="p-6">
          <motion.h2
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row  justify-between">
              <div>{university_name}</div>
              <div>
                <Link to={`/payment/${id}`}>
                  <SecondaryButton text={"Apply Now"}></SecondaryButton>
                </Link>
              </div>
            </div>
          </motion.h2>
          <motion.p
            className="text-gray-600 mb-4 flex gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <span>City: {university_location?.city}</span>
            <span>Country: {university_location?.country}</span>
          </motion.p>
          <div className="mb-4">
            <span className="inline-block bg-blue-200 text-blue-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">
              {scholarship_category}
            </span>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Description</h3>
            <p className="text-gray-700">{scholarship_description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Subject</h4>
              <p className="text-gray-700">{subject_name}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Stipend</h4>
              <p className="text-gray-700">{stipend}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">
                Application Deadline
              </h4>
              <p className="text-gray-700">{application_deadline}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Application Fees</h4>
              <p className="text-gray-700">{application_fees}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Service Charge</h4>
              <p className="text-gray-700">{service_charge}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Post Date</h4>
              <p className="text-gray-700">{post_date}</p>
            </motion.div>
          </div>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2">Reviews</h3>
            {/* reviews will be shown here  */}
            <div></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScholershipDetails;
