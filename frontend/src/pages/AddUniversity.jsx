import React from "react";

const AddUniversity = () => {
  return (
    <div className="max-w-[40%] mx-auto my-12  ">
      <h2 className="text-3xl font-semibold text-center">Add University</h2>
      <form action="#">
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="name"
            className="font-xl font-semibold text-slate-700"
          >
            University Name:
          </label>
          <input
            type="text"
            name="name"
            placeholder="University name"
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="logo"
            className="font-xl font-semibold text-slate-700"
          >
            Logo:
          </label>
          <input
            type="text"
            name="logo"
            placeholder="University logo"
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="location"
            className="font-xl font-semibold text-slate-700"
          >
            Location:
          </label>
          <input
            type="text"
            name="location"
            placeholder="Location"
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="estYear"
            className="font-xl font-semibold text-slate-700"
          >
            Established Year:
          </label>
          <input
            type="text"
            name="estYear"
            placeholder="Year of establishment"
            className="border p-2"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="category"
            className="font-xl font-semibold text-slate-700"
          >
            Category:
          </label>
          <input
            type="text"
            name="category"
            placeholder="Kind of university"
            className="border p-2 rounded-md"
          />
        </div>
        <div className="flex flex-col gap-2 my-6">
          <label
            htmlFor="description"
            className="font-xl font-semibold text-slate-700"
          >
            Description:
          </label>
          <textarea
            type="text"
            name="description"
            placeholder="University name"
            className="border p-2 rounded-md"
          />
        </div>

        <button className="block  border-2 bg-primary-dark text-white font-semibold px-4 py-2 outline-none rounded-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUniversity;
