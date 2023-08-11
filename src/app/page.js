"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import Ipaddress from "@/Components/GetIpadd";

export default function Home() {
  const notify = () => toast("Wow so easy!");
  return (
    <main className="main h-screen flex justify-center items-center ">
      <div className="w-[80%]  mx-auto h-[70%] backdrop-blur backdrop-opacity-60 backdrop-filter-none shadow-md bg-white/20 rounded-md p-4 flex items-center justify-center gap-4">
        <div className="info gap-3 flex-1 flex flex-col justify-between h-[70%] relative p-2 rounded-sm  ">
          <Image
            src="/logo-transparent-png.png"
            className="rounded-md brightness-75 "
            fill
          />
          {/* <h3 className="font-bold text-4xl w-[90%] absolute bottom-3 left-2  tracking-loose contrast-200">
            Tired of maintaining paper for seminar 😫{" "}
          </h3> */}
        </div>
        <div className="text-info flex-1 h-[70%] flex flex-col justify-center  mx-auto text-center   ">
          <h1 className="text-4xl font-bold text-blue-500 leading-loose inline-block ">
            Introducing <br></br>{" "}
            <span className="text-6xl text tracking-wide bg-gradient-to-r from-cyan-600 via-green-600 to-cyan-600 text-transparent bg-clip-text ">
              Seminar Attendance Manager
            </span>
          </h1>
          <div className="btn-contaner space-x-3 w-full ">
            <button className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400  font-bold text-xl">
              Join class
            </button>
            <button
              onClick={notify}
              className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400 font-bold text-xl"
            >
              create class
            </button>
          </div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </main>
  );
}
