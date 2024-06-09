import SectionTitle from "../../../shared/sectionTitle/SectionTitle";
import faqImg from "../../../assets/pageImages/faq.png";
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const questionsAnswers = [
    {
      question: "How do I apply for a scholarship?",
      answer:
        "To apply for a scholarship, visit our scholarship section, select the scholarship you're interested in, and follow the application instructions provided.",
    },
    {
      question: "What are the eligibility criteria?",
      answer:
        "Eligibility criteria vary for each scholarship. Please check the specific requirements for each scholarship on its details page.",
    },
    {
      question: "Can I apply for more than one scholarship?",
      answer:
        "Yes, you can apply for multiple scholarships as long as you meet the eligibility criteria for each.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can reach out to our support team via the contact form on our Contact Us page or email us directly at contact@example.com.",
    },
    {
      question: "When will I be notified if I receive a scholarship?",
      answer:
        "Notification dates vary depending on the scholarship. Generally, notifications are sent within a few weeks after the application deadline.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-12 bg-gray-100">
      <SectionTitle
        heading={"Frequently Asked Questions"}
        subheading={
          "Find answers to common questions about our services and support"
        }
      />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="md:w-1/2 p-4">
            <img
              src={faqImg}
              alt="FAQ"
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
          </div>
          <div className="md:w-1/2 space-y-4 mt-8 md:mt-0">
            {questionsAnswers.map((item, index) => (
              <div
                key={index}
                className={`overflow-hidden transition-all duration-300 ease-in-out transform ${
                  activeIndex === index
                    ? "max-h-96 scale-105 shadow-lg"
                    : "max-h-12"
                } bg-white rounded-lg p-4 cursor-pointer`}
                onClick={() => toggleAnswer(index)}
              >
                <div className="text-xl font-medium flex justify-between items-center">
                  <span>{item.question}</span>
                  <span
                    className={`transform transition-transform duration-300 ${
                      activeIndex === index ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </div>
                <div
                  className={`mt-4 ${
                    activeIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
