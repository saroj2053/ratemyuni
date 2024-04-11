import React, { useState } from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

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
    <div className="max-w-[70%] md:max-w-[60%] lg:max-w-[50%] mx-auto my-12  ">
      <div className="w-24 mx-auto">
        <img className="w-24 h-24" src={logo} alt="" />
      </div>
      <h2 className="text-3xl font-semibold text-center">Login</h2>
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
          className="border-0 outline-none bg-primary-dark text-white font-sm tracking-widest capitalize font-semibold px-8 py-1 rounded-md"
        >
          {loading ? "logging in..." : "login"}
        </button>
      </form>

      <p className="text-slate-700 font-xl font-semibold text-center my-4">
        Don't have an account ?{" "}
        <span
          className="underline cursor-pointer hover:text-default-primary uppercase tracking-wide"
          onClick={() => navigate("/signup")}
        >
          Signup
        </span>
      </p>
    </div>
  );
};

export default Login;
