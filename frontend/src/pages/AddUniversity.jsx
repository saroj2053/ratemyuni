import React, { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FaCheck } from "react-icons/fa6";
import { HiChevronUpDown } from "react-icons/hi2";
import useCreateUniversity from "../hooks/useCreateUniversity";

const categories = [
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
  const [selected, setSelected] = useState(categories[0]);
  const [logo, setLogo] = useState();

  const { loading, createUniversity } = useCreateUniversity();

  const handleLogoChange = (evt) => {
    setLogo(evt.target.files[0]);
  };

  const universityHandler = async (evt) => {
    evt.preventDefault();
    const data = { ...inputs, category: selected.name };
    const formData = new FormData();
    formData.append("logo", logo);
    await createUniversity(formData, data);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Add University
        </h2>

        <form
          onSubmit={universityHandler}
          encType="multipart/form-data"
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              University Name
            </label>
            <input
              type="text"
              id="name"
              value={inputs.name}
              onChange={(evt) => setInputs({ ...inputs, name: evt.target.value })}
              placeholder="Enter university name"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="logo_input"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Logo
            </label>
            <input
              type="file"
              accept="image/*"
              id="logo_input"
              onChange={handleLogoChange}
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              value={inputs.location}
              onChange={(evt) =>
                setInputs({ ...inputs, location: evt.target.value })
              }
              placeholder="Enter location"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="estYear"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Established Year
            </label>
            <input
              type="text"
              id="estYear"
              value={inputs.establishedYear}
              onChange={(evt) =>
                setInputs({ ...inputs, establishedYear: evt.target.value })
              }
              placeholder="e.g. 1991"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="webUrl"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Website URL
            </label>
            <input
              type="text"
              id="webUrl"
              value={inputs.websiteUrl}
              onChange={(evt) =>
                setInputs({ ...inputs, websiteUrl: evt.target.value })
              }
              placeholder="example.edu"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <Listbox value={selected} onChange={setSelected}>
              <div className="relative">
                <Listbox.Button className="relative w-full cursor-default rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-10 text-left text-sm focus:outline-none focus:ring-2 focus:ring-gray-400">
                  <span className="block truncate text-gray-800">
                    {selected.name}
                  </span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <HiChevronUpDown
                      className="h-4 w-4 text-gray-400"
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
                  <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-lg bg-white py-1 text-sm shadow-lg ring-1 ring-black/5 focus:outline-none z-10">
                    {categories.map((cat, idx) => (
                      <Listbox.Option
                        key={idx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                          }`
                        }
                        value={cat}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? "font-medium" : "font-normal"
                              }`}
                            >
                              {cat.name}
                            </span>
                            {selected && (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-800">
                                <FaCheck className="h-4 w-4" aria-hidden="true" />
                              </span>
                            )}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </Listbox>
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={5}
              value={inputs.description}
              onChange={(evt) =>
                setInputs({ ...inputs, description: evt.target.value })
              }
              placeholder="About the university"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-800 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 transition-colors"
          >
            {loading ? "Saving..." : "Save University"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUniversity;
