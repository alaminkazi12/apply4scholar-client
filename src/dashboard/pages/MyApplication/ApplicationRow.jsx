import { FaEdit } from "react-icons/fa";
import useSingleScholarship from "../../../hooks/useSingleScholarship";
import { FaEye, FaTrash } from "react-icons/fa6";

const ApplicationRow = ({ item }) => {
  const {
    scholarship_id,
    university_name,
    subject_name,
    scholarship_category,
    degree,
    status,
    feedback,
  } = item;

  const [scholarship] = useSingleScholarship(scholarship_id);
  const { application_fees, service_charge, university_location } = scholarship;

  return (
    <tr>
      <td>{university_name}</td>
      <td className="flex items-center">
        <span>{university_location?.city}, </span>
        <span> {university_location?.country}</span>
      </td>
      <td>{subject_name}</td>
      <td>{scholarship_category}</td>
      <td className="uppercase">{degree}</td>
      <td className="uppercase">{application_fees}</td>
      <td className="uppercase">{service_charge}</td>
      <td>{feedback ? feedback : "None"}</td>
      <td>{status}</td>
      <th>
        <button className="btn btn-ghost btn-xs text-yellow-900">
          <FaEdit />
        </button>
      </th>
      <th>
        <button className="btn btn-ghost btn-xs text-red-800">
          <FaTrash></FaTrash>
        </button>
      </th>
      <th>
        <button className="btn btn-ghost btn-xs text-green-800">
          <FaEye></FaEye>
        </button>
      </th>
      <th>
        <button className="btn btn-ghost btn-xs">Review</button>
      </th>
    </tr>
  );
};

export default ApplicationRow;
