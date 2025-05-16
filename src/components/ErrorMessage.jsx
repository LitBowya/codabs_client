import React from "react";

const ErrorMessage = ({
                        title = "Something went wrong",
                        message = "Please try again later"
                      }) => {
  return (
    <div className="p-4 bg-red-50 border-l-4 border-red-500 rounded max-w-md mx-auto">
      <h3 className="text-lg font-medium text-red-800">{title}</h3>
      <p className="text-red-600">{message}</p>
    </div>
  );
};

export default ErrorMessage;