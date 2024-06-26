import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

import { Toaster } from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, login } = useLogin();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await login(email, password);
  };
  return (
    <>
      <div className="max-w-[70%] md:max-w-[50%] lg:max-w-[30%] mx-auto my-12  ">
        <div className="w-24 mx-auto">
          <img className="w-24 h-24" src={logo} alt="" />
        </div>
        <h2 className="text-3xl font-semibold text-slate-700 text-center ">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2 my-6">
            <label
              htmlFor="email"
              className="font-xl font-semibold text-slate-700"
            >
              Email:
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(evt) => setEmail(evt.target.value)}
              placeholder="example@gmail.com"
              className="border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
            />
          </div>
          <div className="flex flex-col gap-2 my-6">
            <label
              htmlFor="password"
              className="font-xl font-semibold text-slate-700"
            >
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
              placeholder="your password here"
              className="border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
            />
          </div>
          <button
            disabled={loading}
            className="border-0 outline-none w-full bg-slate-800 text-white font-xl tracking-widest uppercase font-semibold px-8 py-2 rounded-md hover:bg-slate-600"
          >
            {loading ? "logging in..." : "login"}
          </button>
        </form>

        <p className="text-slate-700 font-xl font-semibold text-center my-4">
          Don't have an account ?{" "}
          <span
            className="cursor-pointer hover:text-slate-500 hover:underline uppercase tracking-wide"
            onClick={() => navigate("/signup")}
          >
            Signup
          </span>
        </p>
      </div>
      <Toaster />
    </>
  );
};

export default Login;
