import { FiClock, FiPlay, FiCheckCircle } from "react-icons/fi";
import Spinner from "../../../components/Spinner.jsx";
import ErrorMessage from "../../../components/ErrorMessage.jsx";
import StatCard from "../../../components/Admin/StatCard.jsx";

const StatsDisplay = ({ projects, isLoading, isError }) => {
  const statusCounts = projects.reduce((acc, project) => {
    const { status } = project;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, { starting: 0, ongoing: 0, completed: 0 }); // initialise all three keys :contentReference[oaicite:3]{index=3}

// 2) Map that into your stats array
  const stats = [
    {
      icon: <FiClock size={24} />,
      value: statusCounts.starting,
      text: "Starting Projects"
    },
    {
      icon: <FiPlay size={24} />,
      value: statusCounts.ongoing,
      text: "Ongoing Projects"
    },
    {
      icon: <FiCheckCircle size={24} />,
      value: statusCounts.completed,
      text: "Completed Projects"
    }
  ];
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
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
