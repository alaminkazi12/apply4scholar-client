import { FaStar } from "react-icons/fa";

const ReviewCard = ({ item }) => {
  const { rating, comment, data, university_name, userName, userImage } = item;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-400 to-indigo-600 text-white">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full object-cover border-2 border-white"
            src={userImage}
            alt={userName}
          />
          <div className="ml-4">
            <h2 className="text-lg font-bold">{userName}</h2>
            <p className="text-sm">{university_name}</p>
          </div>
        </div>
        <div className="flex items-center">
          <FaStar className="text-yellow-400" />
          <span className="ml-1 font-semibold">{rating}</span>
        </div>
      </div>
      <div className="px-6 py-4">
        <p className="text-gray-800 text-base">{comment}</p>
      </div>
      <div className="flex justify-between items-center px-6 py-4 bg-gray-100 border-t">
        <span className="text-gray-600 text-sm">
          {new Date(data).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

export default ReviewCard;
