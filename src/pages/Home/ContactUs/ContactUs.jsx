import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import contactBg from "../../../assets/pageImages/contact-bg.png";
import PrimaryButton from "../../../components/buttons/PrimaryButton";

const ContactUs = () => {
  return (
    <div
      className="relative bg-cover bg-center py-12"
      style={{
        backgroundImage: `url(${contactBg})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      <div className="relative z-10 py-12">
        <SectionTitle
          heading={"Contact Us"}
          subheading={"We're here to help! Reach out to us with any concerns"}
        />

        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-center items-center gap-60">
            {/* Contact Info Section */}
            <div className="text-white space-y-6 border-2 border-yellow-500 p-16 rounded-xl">
              <div className="flex items-center space-x-4">
                <FaPhoneAlt className="text-3xl text-yellow-500" />
                <div>
                  <h4 className="text-xl font-bold">Call Us</h4>
                  <p>+123 456 7890</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaEnvelope className="text-3xl text-yellow-500" />
                <div>
                  <h4 className="text-xl font-bold">Email Us</h4>
                  <p>contact@example.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <FaMapMarkerAlt className="text-3xl text-yellow-500" />
                <div>
                  <h4 className="text-xl font-bold">Visit Us</h4>
                  <p>123 Street, City, Country</p>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <div className="bg-white rounded-lg shadow-lg p-8 md:p-16">
              <form className="space-y-6">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">WHAT IS YOUR NAME? *</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Write Your Name Here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>

                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">EMAIL: *</span>
                  </div>
                  <input
                    type="email"
                    placeholder="Write Your Email Here"
                    className="input input-bordered w-full max-w-xs"
                  />
                </label>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">YOUR MESSAGE *</span>
                  </div>
                  <textarea
                    placeholder="Type your message here"
                    className="textarea textarea-bordered"
                    rows="5"
                    cols="50"
                  ></textarea>
                </label>

                <div className="flex justify-center">
                  <PrimaryButton text={"SUBMIT"}></PrimaryButton>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-12 text-center text-white">
            <p className="text-lg">
              Or reach us directly at:{" "}
              <a
                href="mailto:contact@example.com"
                className="text-yellow-300 underline"
              >
                contact@example.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
