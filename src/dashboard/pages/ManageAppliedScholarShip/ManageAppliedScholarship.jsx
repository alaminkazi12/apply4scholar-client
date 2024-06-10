import { Helmet } from "react-helmet-async";
import useAppliedScholarship from "../../../hooks/useAppliedScholarship";
import AllAppliedScholarshipRow from "../AllAppliedScholarships/AllAppliedScholarshipRow";

const ManageAppliedScholarship = () => {
  const [appliedScholarship, refetch] = useAppliedScholarship();
  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> Manage Applied Scholarships | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-xl md:text-4xl uppercase font-bold text-center mb-4 mt-14 w-[80%] mx-auto">
        MANAGE APPLIED <br /> SCHOLARSHIPS
      </h1>
      <div className="overflow-x-auto max-w-[1000px] border-2 p-6 rounded-xl shadow-xl">
        <table className="table">
          {/* head */}
          <thead className="text-sm text-black">
            <tr>
              <th>University Name</th>
              <th>Scholarship Name</th>
              <th>Scholarship Category</th>
              <th>Subject Category</th>
              <th>Applied Degree</th>
              <th>Application Fees</th>
              <th>Service Charge</th>
              <th>Application Status</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {appliedScholarship.map((item, idx) => (
              <AllAppliedScholarshipRow
                key={idx}
                item={item}
                refetch={refetch}
              ></AllAppliedScholarshipRow>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppliedScholarship;
