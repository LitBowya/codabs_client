import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { format, parseISO, eachMonthOfInterval, startOfYear, endOfYear } from "date-fns";
import Spinner from "../../../components/Spinner";
import ErrorMessage from "../../../components/ErrorMessage";

const MonthlyVisitCharts = ({ visitsData, isLoading, isError, refetch }) => {
  // Process the data to group visits by month
  const processVisitData = () => {
    const currentYear = new Date().getFullYear();
    const yearStart = startOfYear(new Date(currentYear, 0, 1));
    const yearEnd = endOfYear(new Date(currentYear, 11, 31));

    // Create all months of the year with 0 visits initially
    const months = eachMonthOfInterval({
      start: yearStart,
      end: yearEnd
    }).map((month) => ({
      name: format(month, "MMM"), // Short month name (Jan, Feb, etc.)
      fullMonth: format(month, "MMMM yyyy"), // Full month name with year
      visits: 0
    }));

    // Count visits per month
    visitsData?.forEach((visit) => {
      const visitDate = parseISO(visit.createdAt);
      const visitMonth = format(visitDate, "MMM");
      const monthIndex = months.findIndex((m) => m.name === visitMonth);

      if (monthIndex !== -1) {
        months[monthIndex].visits += 1;
      }
    });

    return months;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64 bg-white rounded-lg shadow">
        <Spinner size={48} color="#3b82f6" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-white p-4 rounded-lg shadow">
        <ErrorMessage
          title="Error loading visit data"
          message="Failed to fetch analytics data"
          onRetry={refetch}
        />
      </div>
    );
  }

  const chartData = processVisitData();

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Monthly Page Visits ({new Date().getFullYear()})</h2>
        <button
          onClick={refetch}
          className="px-3 py-1 pointer-cursor text-sm bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          Refresh Data
        </button>
      </div>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="name"
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#ccc" }}
            />
            <YAxis
              tick={{ fill: "#555" }}
              axisLine={{ stroke: "#ccc" }}
              allowDecimals={false}
            />
            <Tooltip
              formatter={(value) => [`${value} visits`, "Visits"]}
              labelFormatter={(label) => {
                const month = chartData.find((m) => m.name === label)?.fullMonth;
                return month || label;
              }}
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #eee",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="visits"
              name="Page Visits"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyVisitCharts;