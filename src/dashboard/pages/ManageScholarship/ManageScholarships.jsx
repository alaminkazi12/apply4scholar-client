import { Helmet } from "react-helmet-async";
import useScholarship from "../../../hooks/useScholarship";
import ManageScholarshipRow from "./ManageScholarshipRow";

const ManageScholarships = () => {
  const [scholarship, refetch] = useScholarship();
  console.log(scholarship);
  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> Manage Scholarship | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14 w-[80%] mx-auto">
        Manage Scholarship
      </h1>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>Scholarship Name</th>
              <th>University Name</th>
              <th>Scholarship Category</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {scholarship.map((item, idx) => (
              <ManageScholarshipRow
                key={idx}
                item={item}
                refetch={refetch}
              ></ManageScholarshipRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageScholarships;
