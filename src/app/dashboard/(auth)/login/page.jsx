"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const [data, setData] = useState({});
  const [login, setLogin] = useState(false);

  const LoadingToast = (loading) => {
    if (loading === true) {
      toast.loading("Checking User", {
        position: "top-center",
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await toast.promise(axios.post("/api/auth/login", data), {
        position: "top-center",
        pending: "Checking User...",
        success: {
          render: () => {
            if (res.data.success) {
              // Check for success property
              console.log(res.data);
              window.localStorage.setItem("user", JSON.stringify(res.data.TokenData));
              setLogin(true);
              return "User Logged In Successfully";
            } else {
              return `${res.data.message}`;
            }
          },

          duration: 5000,
        },
      });
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: "top-center",
        autoClose: 5000,
      });
    }
  };

  const handleChange = (e) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  useEffect(() => {
    if (login) {
      router.push("/");
    }
  }, [login]);

  return (
    <>
      <ToastContainer />
      <div className="flex w-full min-h-screen flex-col justify-center items-center md:h-[90vh] h-[80vh] ">
        <form className="md:w-[30%] w-[90vw] p-2 h-max flex flex-col gap-4 ">
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
          <button
            className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-16 "
            onClick={handleLogin}
          >
            Login
          </button>

          <Link
            href="/dashboard/register"
            className="text-blue-500 underline text-center hover:text-red-500 "
          >
            Dont have an account register
          </Link>
          <hr className="w-full" />
        </form>
        <h1 className="font-bold text-white my-2 "> Or </h1>
        <button
          className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-14 px-1 "
          onClick={() => signIn("google")}
        >
          Login with google
        </button>
      </div>
    </>
  );
};

export default Login;
