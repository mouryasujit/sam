"use client";
// import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import React, { useEffect, useState } from "react";

const Register = () => {
  const router = useRouter();
  const [data, Setdata] = useState({});
  const [disabled, setDisabled] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleChange = (e) => {
    Setdata((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);

      await toast
        .promise(axios.post("/api/auth/register", data), {
          position: "top-center",
          pending: "Registering user...",
          success: {
            render: () => {
              setRegistrationSuccess(true);
              return "User Registered Successfully";
            },
            duration: 5000,
          },
          error: "Something went wrong",
        })
        .then(() => {
          router.push("/dashboard/login");
        });
    } catch (error) {
      console.error(error);
    } finally {
      setDisabled(false);
    }
  };

  useEffect(() => {
    if (registrationSuccess) {
      router.push("/dashboard/login");
    }
  }, [registrationSuccess]);
  return (
    <>
      <ToastContainer />
      <div className="max-w-7xl h-[80vh] md:h-[100vh] flex justify-center items-center ">
        <form
          className=" w-[90vw] md:w-[30%] p-2 h-max flex flex-col gap-4 "
          onSubmit={handleSave}
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            name="name"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="E-mail"
            required
            name="email"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="password"
            required
            name="password"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="class Division In capital"
            required
            name="division"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="Roll no"
            required
            name="rollno"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Are You student or teacher"
            required
            name="typeIs"
            className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
            onChange={handleChange}
          />
          <button
            type="submit"
            className={
              disabled
                ? "text-white border-2 border-green-500 bg-green-500 rounded-lg h-16 disabled:opacity-25 cursor-not-allowed "
                : "text-white border-2 border-green-500 bg-green-500 rounded-lg h-16"
            }
          >
            Register
          </button>
          {/* {err && (
          <p className="text-center text-red-700 ">
            Try again something went wrong
          </p>
        )} */}
          <Link
            href="/dashboard/login"
            className="text-blue-500 underline text-center hover:text-red-500 "
          >
            Login with an existing account
          </Link>
        </form>
      </div>
    </>
  );
};

export default Register;
