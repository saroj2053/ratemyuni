import React from "react";
import logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";
import useSignup from "../hooks/useSignup";

const type = [
  { name: "Student" },
  { name: "Teacher" },
  { name: "Administrator" },
];
const Signup = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(type[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, signup } = useSignup();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const inputData = { ...formData, userType: selected.name };
    await signup(inputData);
  };

  return (
    <div className="max-w-[70%] md:max-w-[60%] lg:max-w-[50%] mx-auto my-12  ">
      <div className="w-24 mx-auto">
        <img className="w-24 h-24" src={logo} alt="" />
      </div>
      <h2 className="text-3xl font-semibold text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="name"
            className="font-xl font-semibold text-slate-700"
          >
            Name:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={(evt) =>
              setFormData({ ...formData, name: evt.target.value })
            }
            placeholder="your name here"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="email"
            className="font-xl font-semibold text-slate-700"
          >
            Email:
          </label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={(evt) =>
              setFormData({ ...formData, email: evt.target.value })
            }
            placeholder="example@gmail.com"
            className=" text-grey-dark-1 border-2  p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="usertype"
            className="font-xl font-semibold text-slate-700"
          >
            User Type:
          </label>
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-md bg-white p-2 pl-3 pr-10 text-left border-2 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 text-grey-dark-1">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiChevronUpDown
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none">
                  {type.map((person, personIdx) => (
                    <Listbox.Option
                      key={personIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-grey-light-2 text-primary-light"
                            : "text-gray-900"
                        }`
                      }
                      value={person}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {person.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-default-primary">
                              <FaCheck className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
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
            value={formData.password}
            onChange={(evt) =>
              setFormData({ ...formData, password: evt.target.value })
            }
            placeholder="your password here"
            className="text-grey-dark-1 border-2  p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="confirmPassword"
            className="font-xl font-semibold text-slate-700"
          >
            Confirm Password:
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={(evt) =>
              setFormData({ ...formData, confirmPassword: evt.target.value })
            }
            placeholder="your password here"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3 "
          />
        </div>
        <button className="border-0 outline-none bg-primary-dark text-white font-xl tracking-widest uppercase font-semibold px-10 py-2 rounded-md">
          Signup
        </button>
      </form>

      <p className="text-slate-700 font-xl font-semibold text-center my-6 ">
        Already have an account ?{" "}
        <span
          className="underline cursor-pointer hover:text-default-primary uppercase tracking-wide"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </p>
    </div>
  );
};

export default Signup;
