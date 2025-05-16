import StatCard from "../../../components/Admin/StatCard.jsx";
import Spinner from "../../../components/Spinner.jsx"; // Your spinner
import ErrorMessage from "../../../components/ErrorMessage.jsx"; // Your error component
import { FaUsers, FaBlog, FaBuilding, FaCalendarCheck } from "react-icons/fa";
import { useGetCountQuery } from "../../../redux/services/analyticsApi.js";


const StatsDisplay = () => {
  const { data: counts, isLoading, isError } = useGetCountQuery();

  const stats = [
    {
      icon: <FaUsers size={24} />,
      value: counts?.data?.totalUsers ?? 0,
      text: "Total Users"
    },
    {
      icon: <FaBlog size={24} />,
      value: counts?.data?.totalBlogs ?? 0,
      text: "Total Blogs"
    },
    {
      icon: <FaBuilding size={24} />,
      value: counts?.data?.totalProjects ?? 0,
      text: "Total Projects"
    },
    {
      icon: <FaCalendarCheck size={24} />,
      value: counts?.data?.totalAppointments ?? 0,
      text: "Total Appointments"
    }
  ];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-5">
        {isLoading
          ? Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="flex justify-center items-center p-4 bg-gray-800 rounded-lg h-40">
              <Spinner />
            </div>
          ))
          : isError
            ? Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx}
                   className="flex justify-center items-center p-4 bg-red-500 rounded-lg h-40">
                <ErrorMessage message="Failed to load data" />
              </div>
            ))
            : stats.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={stat.icon}
                value={stat.value}
                text={stat.text}
              />
            ))}
      </div>

    </div>
  );
};
export default StatsDisplay;
