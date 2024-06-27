"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Link from "next/link";
import Image from "next/image";
import Ipaddress from "@/Components/GetIpadd";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const { v4: uuidv4 } = require("uuid");

export default function Home() {
  const router = useRouter();
  const [unique, setUnique] = useState();
  const [latitude, setLatitude] = useState();
  const [longitude, setLongitude] = useState();
  const [ipAddTeacher, setIpAddTeacher] = useState();
  const [Join, Setjoin] = useState();
  const [blueths, setbluetooths] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [classCreater, setClass] = useState({
    name: "",
    classname: "",
    email: "",
    Image: "",
  });

  // Joining class
  const handlejoin = async (e) => {
    e.preventDefault();
    try {
      var joinData = {
        passcode: Join,
        location: { latitude, longitude },
        studentip: ipAddTeacher,
        Bluetooths: blueths,
      };

      const res = await toast.promise(axios.post("/api/joinclass", joinData), {
        position: "top-center",
        pending: "Checking details...",
        success: {
          render: (response) => {
            if (res.data.success) {
              router.push(`/class/${res?.data?.classData._id}`);
              return "Class joined successfully";
            }
          },
          duration: 5000,
        },
      });
    } catch (error) {
      console.log(error);
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  // Get unique code
  function generateUniqueCode() {
    const uniqueId = uuidv4().replace(/-/g, ""); // Remove dashes from UUID
    const uniqueCode = uniqueId.slice(0, 8); // Extract the first 8 characters

    setUnique(uniqueCode);
  }

  const getLocationandIp = async (e) => {
    e.preventDefault();

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);

      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      setIpAddTeacher(data.ip);
    } catch (error) {
      console.log("Error retrieving location or IP:", error);
    }
  };

  // For creating class
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      classCreater.Image = imageFile;
      console.log(classCreater);
      const res = await toast.promise(
        axios.post("/api/createclass", classCreater, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }),
        {
          position: "top-center",
          pending: "Checking User...",
          success: {
            render: (response) => {
              if (res.data.success) {
                router.push(`/class/${res?.data?.savedClass._id}`);
                return "Class created successfully";
              }
            },
            duration: 5000,
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      toast.error(`${error.response.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setClass((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const hClassCreaterBluetooth = async (e) => {
    e.preventDefault();
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      console.log("Bluetooth device connected:", device);
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
    }
  };

  const handleEnableBluetooth = async (e) => {
    e.preventDefault();
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
      });
      if (device) {
        setbluetooths(true);
        getLocationandIp(e);
      }
      console.log("Bluetooth device connected:", device);
    } catch (error) {
      console.error("Error connecting to Bluetooth device:", error);
    }
  };

  useEffect(() => {
    const login = localStorage.getItem("user");
    if (!login) {
      router.push("/dashboard/login");
    }
  });
  return (
    <main className="main h-screen flex justify-center items-center ">
      <div className="w-[80%]  mx-auto h-[70%] backdrop-blur backdrop-opacity-60 backdrop-filter-none shadow-md bg-white/20 rounded-md p-4 flex items-center justify-center gap-4">
        <div className="info gap-3 flex-1 flex flex-col justify-between h-[70%] relative p-2 rounded-sm  ">
          <Image
            src="/logo-transparent-png.png"
            className="rounded-md brightness-75 "
            alt=""
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
            <Popup
              trigger={
                <button className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400 font-bold text-xl">
                  Join Seminar
                </button>
              }
              modal
              lockScroll={true}
            >
              <div className="flex  h-max flex-col justify-center items-center   ">
                <form className="md:w-[100%] w-[70vw] p-2 h-max flex flex-col gap-4 ">
                  <div className="div w-full flex items-center gap-5 ">
                    <label htmlFor="passcode" className="w-[6vw]">
                      Passcode:
                    </label>
                    <input
                      type="text"
                      placeholder="Enter passcode of class"
                      required
                      name="passcode"
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={(e) => Setjoin(e.target.value)}
                    />
                  </div>

                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="Email" className="w-max">
                      Give location access:
                    </label>
                    <button
                      className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-12 w-16 "
                      onClick={getLocationandIp}
                    >
                      Allow
                    </button>
                  </div>
                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="Email" className="w-max">
                      Give Bluetooth access:
                    </label>
                    <button
                      onClick={handleEnableBluetooth}
                      className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400 font-bold text-xl"
                    >
                      Enable Bluetooth
                    </button>
                  </div>

                  <button
                    type="submit"
                    className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-12 "
                    onClick={handlejoin}
                  >
                    Join Seminar
                  </button>
                  <hr className="w-full" />
                </form>
              </div>
            </Popup>
            <Popup
              trigger={
                <button className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400 font-bold text-xl">
                  Create Seminar
                </button>
              }
              modal // Use the modal option to make it a centered modal
              lockScroll={true}
            >
              <div className="flex  h-max flex-col justify-center items-center   ">
                <form className="md:w-[100%] w-[70vw] p-2 h-max flex flex-col gap-4 ">
                  <div className="div w-full flex items-center gap-5 ">
                    <label htmlFor="Email" className="w-[6vw]">
                      Class Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Class Name"
                      required
                      name="classname"
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="name" className="w-[6vw]">
                      Name:
                    </label>
                    <input
                      type="text"
                      placeholder="Your name"
                      required
                      name="name"
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="Email" className="w-[6vw]">
                      Email:
                    </label>
                    <input
                      type="text"
                      placeholder="E-mail"
                      required
                      name="email"
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={handleChange}
                    />
                  </div>
                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="Email" className="w-max">
                      Give location access:
                    </label>
                    <button
                      className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-12 w-16 "
                      onClick={getLocationandIp}
                    >
                      Allow
                    </button>
                  </div>
                  <div className="div w-full flex  items-center  gap-5">
                    <label htmlFor="Email" className="w-[6vw]">
                      Passcode:
                    </label>
                    <input
                      type="text"
                      placeholder="Get your passcode here"
                      required
                      name="email"
                      onFocus={generateUniqueCode}
                      value={unique || ""}
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={handleChange}
                    />
                    <label htmlFor="Image" className="w-[6vw]">
                      Image:
                    </label>
                    <input
                      type="file"
                      placeholder="Upload A image Containing "
                      required
                      name="Image"
                      className="h-10 rounded-lg w-[80%] border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
                      onChange={handleFileChange}
                    />
                  </div>
                  <div className="div w-full flex items-center  gap-5 ">
                    <label htmlFor="Email" className="w-max">
                      Give Bluetooth access:
                    </label>
                    <button
                      onClick={hClassCreaterBluetooth}
                      className="bg-gradient-to-b from-cyan-400 to-green-400 p-2 rounded-md shadow-md hover:bg-gradient-to-b hover:from-green-400 hover:to-cyan-400 font-bold text-xl"
                    >
                      Enable Bluetooth
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-12 "
                    onClick={handlePost}
                  >
                    Create Seminar
                  </button>

                  <hr className="w-full" />
                </form>
              </div>
            </Popup>
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
