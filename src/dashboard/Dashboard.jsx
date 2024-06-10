import { Helmet } from "react-helmet-async";

const Dashboard = () => {
  return (
    <div className="min-h-screen mt-10">
      <Helmet>
        <title> DashBoard | Apply4Scholar </title>
      </Helmet>
      <h1 className="text-4xl uppercase font-bold text-center mb-4">
        dashboard
      </h1>
    </div>
  );
};

export default Dashboard;
