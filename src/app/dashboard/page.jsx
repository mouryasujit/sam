"use client";
// import React, { useEffect, useState } from "react";
// import styles from "./page.module.css";
// import useSWR from "swr";
// import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";


const Dashboard = () => {
  // const session = useSession();

  return (
    <div className=" min-h-screen w-full mx-auto flex md:flex-row flex-col-reverse mt-14 md:my-0 items-center justify-center gap-4 cursor-pointer  ">
      
      <div className="flex-1 h-full flex flex-col gap-4 items-center "></div>
      <form
        className=" w-[90vw] md:w-[40%]  flex flex-col gap-3  "
        //   onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-2xl">Create New Class</h1>
        <input
          type="text"
          placeholder="Title"
          className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        />
        <input
          type="text"
          placeholder="Desc"
          className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        />
        <input
          type="text"
          placeholder="Image"
          className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        />
        <textarea
          placeholder="Content"
          cols="30"
          rows="10"
          className=" h-32 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        ></textarea>
        <button className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-14 px-1 ">
          Send
        </button>
      </form>
    </div>
  );
};
// };

export default Dashboard;
