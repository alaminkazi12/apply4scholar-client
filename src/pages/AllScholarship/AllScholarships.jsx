import { useEffect, useState } from "react";
import PageTitle from "../../shared/PageTitle/PageTitle";
import Card from "../Home/TopScholarships/Card";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const AllScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const [scholarships, setScholarships] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axiosPublic
      .get(`/all-scholarships?page=${currentPage}&search=${searchQuery}`)
      .then((res) => {
        setScholarships(res.data.scholarships);
        setTotalPages(res.data.totalPages);
      });
  }, [axiosPublic, currentPage, searchQuery]);

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Helmet>
        <title> All Scholarships | Apply4Scholar </title>
      </Helmet>
      <PageTitle
        title={"All Scholarships"}
        subtitle={"Explore Scholarships to Fuel Your Future"}
      ></PageTitle>
      <div className="flex items-center justify-center gap-8 mt-10">
        <div>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              onChange={handleSearch}
              value={searchQuery}
            />
            <button>
              <FaSearch></FaSearch>
            </button>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
        {scholarships.map((item) => (
          <Card item={item} key={item._id}></Card>
        ))}
      </div>
      <div className="join grid grid-cols-2 mt-10">
        <button
          className="join-item btn btn-outline"
          onClick={goToPreviousPage}
          disabled={currentPage === 1}
        >
          Previous page
        </button>
        <button
          className="join-item btn btn-outline"
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AllScholarships;
