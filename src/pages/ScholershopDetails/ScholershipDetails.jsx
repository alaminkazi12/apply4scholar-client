import { Link, useParams } from "react-router-dom";
import PageTitle from "../../shared/PageTitle/PageTitle";
import { motion } from "framer-motion";
import SecondaryButton from "../../components/buttons/SecondaryButton";
import useSingleScholarship from "../../hooks/useSingleScholarship";
import useSholarshipReveiw from "../../hooks/useSholarshipReveiw";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Pagination } from "swiper/modules";
import ReviewCard from "../Home/Reveiews/ReveiwCard";
import "swiper/css/bundle";
import { Helmet } from "react-helmet-async";

const ScholershipDetails = () => {
  const { id } = useParams();
  const [scholarship] = useSingleScholarship(id);
  const [ScholarshipReviews] = useSholarshipReveiw(id);
  console.log(ScholarshipReviews);

  const {
    scholarship_name,
    university_name,
    university_image,
    university_country,
    university_city,
    university_world_rank,
    subject_category,
    scholarship_category,
    degree,
    tuition_fees,
    application_fees,
    service_charge,
    application_deadline,
    post_date,
    scholarship_description,
  } = scholarship;

  return (
    <div>
      <Helmet>
        <title> {`${scholarship_name} | Apply4Scholar`} </title>
      </Helmet>
      <PageTitle
        title={scholarship_name}
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
            <span>City: {university_city}</span>
            <span>Country: {university_country}</span>
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
              <h4 className="text-lg font-semibold mb-1">Subject Category</h4>
              <p className="text-gray-700">{subject_category}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Tuition Fees</h4>
              <p className="text-gray-700">{tuition_fees}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">
                University World Rank
              </h4>
              <p className="text-gray-700">{university_world_rank}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <h4 className="text-lg font-semibold mb-1">Degree</h4>
              <p className="text-gray-700">{degree}</p>
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
            <div>
              <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                pagination={{
                  clickable: true,
                }}
                modules={[FreeMode, Pagination]}
                className="mySwiper"
              >
                {ScholarshipReviews.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <ReviewCard item={item}></ReviewCard>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ScholershipDetails;
