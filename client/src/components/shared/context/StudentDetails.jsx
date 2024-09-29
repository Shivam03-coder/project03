import React from "react";
const StudentDetails = ({ student }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-lg p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-700 text-center">
          Student Details
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600">
              Student Name
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {student.name}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Student ID
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              {student.id}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600">
              Fees Remaining
            </label>
            <p className="mt-1 text-lg font-semibold text-gray-900">
              ${student.feesRemaining}
            </p>
          </div>

          <button
            className="w-full py-2 px-4 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Pay Fees
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
