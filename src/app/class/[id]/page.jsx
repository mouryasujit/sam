import React from "react";

const SingleClass = () => {
  return (
    <div className="min-h-screen mx-auto w-full ">
      <h2 className="text-center font-bold text-2xl my-2  ">Joined students</h2>
      <table className="w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Rollno</th>
            <th>Joined time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>Name</td>
            <td>Rollno</td>
            <td>Joined time</td>
            <td>Date</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SingleClass;
