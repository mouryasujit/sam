import Link from "next/link";
import React from "react";

const UserClass = () => {
  return (
    <div className="flex w-full min-h-screen flex-col justify-center items-center md:h-[90vh] h-[80vh] ">
      <form
        className="md:w-[30%] w-[90vw] p-2 h-max flex flex-col gap-4 "
        // onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="E-mail"
          required
          name="email"
          className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        />
        <input
          type="password"
          placeholder="password"
          required
          name="password"
          className="h-16 rounded-lg border-2 border-green-500 p-2 font-bold text-lg bg-black text-white "
        />
        <button
          type="submit"
          className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-16 "
        >
          Login
        </button>

        <Link
          href="/dashboard/register"
          className="text-blue-500 underline text-center hover:text-red-500 "
        >
          Don't have an account register
        </Link>
        <hr className="w-full" />
      </form>
      <h1 className="font-bold text-white my-2 "> Or </h1>
      <button
        className="text-white border-2 border-green-500 bg-green-500 rounded-lg h-14 px-1 "
        // onClick={() => signIn("google")}
      >
        Login with google
      </button>
    </div>
  );
};

export default UserClass;
