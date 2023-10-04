"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const ClassOwner = ({ id }) => {
  const [Data, setData] = useState({});
  useEffect(() => {
    const getClassInfo = async () => {
      try {
        const res = await axios.get(`/api/myclass/${id}`);
        // console.log(res.data.CLassDetails);
        setData(res.data.CLassDetails);
      } catch (error) {
        toast.error(`${error.response.data.message}`, {
          position: "top-center",
          autoClose: 5000,
        });
      }
    };
    getClassInfo();
  }, []);
  return (
    <>
      <div className="mx-12 bg-orange-500  px-4 h-[200px] flex items-center flex-col  shadow-md rounded-md ">
        <h1 className=" font-bold text-3xl text-center text-white p-4 ">
          Class Owners Infomation
        </h1>

        <div className=" flex items-center w-full justify-between">
          <div className="left h-full shadow-md p-3 rounded-md bg-blue-300 ">
            <h2 className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">ClassName:</span>{" "}
              {Data?.classname}
            </h2>
            <h2 className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">
                Owner Name:
              </span>{" "}
              {Data?.name}
            </h2>
            <h2 className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">
                Owner Email:
              </span>{" "}
              {Data?.email}
            </h2>
          </div>
          <div className="shadow-md p-3 rounded-md bg-blue-300 ">
            <p className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">
                Class Passcode:
              </span>{" "}
              {Data?.passcode}
            </p>
            <p className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">
                Class Created At:
              </span>{" "}
              {Data?.createdAt?.split("T")[0]}
            </p>
            <p className="font-bold text-2xl">
              <span className="font-bold text-2xl text-white ">
                Class Created Time:
              </span>{" "}
              {Data?.createdAt?.split("T")[1]}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassOwner;
