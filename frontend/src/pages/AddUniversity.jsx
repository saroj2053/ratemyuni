import React from "react";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";
import useCreateUniversity from "../hooks/useCreateUniversity";

const category = [
  { name: "National University" },
  { name: "Provincial University" },
  { name: "Autonomous Institute" },
];

const AddUniversity = () => {
  const [inputs, setInputs] = useState({
    name: "",
    location: "",
    establishedYear: "",
    description: "",
    websiteUrl: "",
  });
  const [selected, setSelected] = useState(category[0]);
  const [logo, setLogo] = useState();

  const { loading, createUniversity } = useCreateUniversity();

  const handleLogoChange = (evt) => {
    setLogo(evt.target.files[0]);
  };

  const universityHandler = async (evt) => {
    evt.preventDefault();
    console.log(logo);
    const data = { ...inputs, category: selected.name };
    console.log(inputs);
    const formData = new FormData();
    formData.append("logo", logo);

    await createUniversity(formData, data);
  };

  return (
    <div className="max-w-[70%] md:max-w-[60%] lg:max-w-[50%] mx-auto my-12  ">
      <h2 className="text-3xl font-semibold text-center text-slate-700">
        Add University
      </h2>
      <form onSubmit={universityHandler} encType="multipart/form-data">
        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="name" className="font-semibold text-slate-700">
            University Name:
          </label>
          <input
            type="text"
            name="name"
            value={inputs.name}
            onChange={(evt) => setInputs({ ...inputs, name: evt.target.value })}
            placeholder="University name"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="logo_input" className="font-semibold text-slate-700">
            Upload logo:
          </label>
          <input
            type="file"
            accept="image/*"
            name="logo"
            onChange={handleLogoChange}
            className="block text-grey-dark-1 border-2 p-2 rounded-md  bg-gray-50  focus:border-2 focus:outline-none focus:border-grey-dark-3"
            aria-describedby="logo_input_help"
            id="logo_input"
          />
        </div>

        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="location" className=" font-semibold text-slate-700">
            Location:
          </label>
          <input
            type="text"
            name="location"
            value={inputs.location}
            onChange={(evt) =>
              setInputs({ ...inputs, location: evt.target.value })
            }
            placeholder="Location"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="estYear" className=" font-semibold text-slate-700">
            Established Year:
          </label>
          <input
            type="text"
            name="estYear"
            value={inputs.establishedYear}
            onChange={(evt) =>
              setInputs({ ...inputs, establishedYear: evt.target.value })
            }
            placeholder="Year of establishment"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="webUrl" className=" font-semibold text-slate-700">
            Website Url:
          </label>
          <input
            type="text"
            name="webUrl"
            value={inputs.websiteUrl}
            onChange={(evt) =>
              setInputs({ ...inputs, websiteUrl: evt.target.value })
            }
            placeholder="website url"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label htmlFor="category" className=" font-semibold text-slate-700">
            Category:
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
                  {category.map((uniCategory, uniCategoryIdx) => (
                    <Listbox.Option
                      key={uniCategoryIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-grey-light-2 text-primary-light"
                            : "text-gray-900"
                        }`
                      }
                      value={uniCategory}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {uniCategory.name}
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
            htmlFor="description"
            className="font-xl font-semibold text-slate-700"
          >
            Description:
          </label>
          <textarea
            rows="4"
            type="text"
            value={inputs.description}
            onChange={(evt) =>
              setInputs({ ...inputs, description: evt.target.value })
            }
            name="description"
            placeholder="About University"
            className="text-grey-dark-1 border-2 p-2 rounded-md focus:border-2 focus:outline-none focus:border-grey-dark-3"
          />
        </div>

        <button
          className=" flex gap-2 justify-between items-center border-2 border-primary-dark text-slate-700 font-semibold px-6 py-2 outline-none rounded-md transition duration-300 ease-in hover:bg-primary-dark hover:text-white"
          onClick={universityHandler}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Data"}
        </button>
      </form>
    </div>
  );
};

export default AddUniversity;
