"use client";
import ClassOwner from "@/Components/ClassOwner";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleClass = () => {
  const router = usePathname();
  // console.log(router.split("/")[2]);
  const id = router.split("/")[2];
  const [tableData, setTableData] = useState([]);

  console.log(tableData);
  useEffect(() => {
    const intervalId = setInterval(() => {
      const getData = async () => {
        try {
          const res = await axios.get(`/api/myclass/${id}`);

          let datas = res.data?.CLassDetails.students;
          setTableData(datas);
        } catch (error) {}
      };
      console.log("Tabledata", tableData);
      getData();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <>
      <div className="min-h-screen mx-auto w-full ">
        <ClassOwner id={id} />
        <h2 className="text-center font-bold text-2xl my-2  ">
          Joined students
        </h2>
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Rollno</th>
              <th>Joined time</th>
              <th>Date</th>
            </tr>
          </thead>
          {tableData ? (
            <tbody className="text-center">
              {Array.isArray(tableData) && tableData.length > 0 ? (
                tableData.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.name}</td>
                    <td>{data?.rollno}</td>
                    <td>{data?.joinedTime}</td>
                    <td>{data?.date}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No data found</td>
                </tr>
              )}
            </tbody>
          ) : (
            <tr>
              <td colSpan="4">No data found</td>
            </tr>
          )}
        </table>
      </div>
    </>
  );
};

export default SingleClass;
