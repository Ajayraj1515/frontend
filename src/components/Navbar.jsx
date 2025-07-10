import React, { useState } from "react";
import Filters from "./Filters";
import locationData from "../data/locations.json";
import { toast } from "react-toastify";
import axiosInstance from "../utils/axiosInstance";
import { useGlobalContext } from "../context/GlobalProvider";

const Navbar = () => {
  const { setJobs, jobs } = useGlobalContext();

  const [jobData, setJobData] = useState({
    title: "",
    company: "",
    location: "",
    min_salary: "",
    max_salary: "",
    job_type: "",
    deadline: "",
    description: "",
  });

  const types = ["Full-Time", "Part-Time", "Contract", "Internship"];
  const locations = locationData.locations;

  const handleCreateJob = async () => {
    const {
      title,
      company,
      location,
      job_type,
      min_salary,
      max_salary,
      deadline,
      description,
    } = jobData;

    if (!title || !company || !location || !job_type || !min_salary || !max_salary || !deadline || !description) {
      toast.error("All fields are required.");
      return;
    }

    const payload = {
      ...jobData,
      min_salary: parseInt(min_salary),
      max_salary: parseInt(max_salary),
    };

    try {
      const response = await toast.promise(
        axiosInstance.post("/api/jobs", payload),
        {
          pending: "Creating job...",
          success: "Job created successfully!",
          error: "Something went wrong!",
        }
      );

      const createdJob = response.data.job || payload;

      if (!createdJob.createdAt) {
        createdJob.createdAt = new Date().toISOString();
      }

      setJobs([createdJob, ...jobs]);

      setJobData({
        title: "",
        company: "",
        location: "",
        min_salary: "",
        max_salary: "",
        job_type: "",
        deadline: "",
        description: "",
      });

      document.getElementById("my_modal_3")?.close();
    } catch (err) {
      toast.error(err.message || "Job creation failed");
    }
  };

  const filteredSuggestions = locations
    .filter((item) =>
      item.toLowerCase().includes(jobData.location.toLowerCase())
    )
    .slice(0, 5);

  return (
    <div>
      <div className="fixed top-0 left-0 bg-white w-full shadow-md z-[100]">
        <div className="flex justify-center p-3 py-4">
          <div className="flex gap-5 items-center px-5 py-3 rounded-full font-[600] nav text-[#303030]">
            <img
              src="https://media.licdn.com/dms/image/v2/D560BAQHpPblOaplcOQ/company-logo_200_200/company-logo_200_200/0/1694017343509/cybermind_works_logo?e=2147483647&v=beta&t=N13ljMg1CHgxKadTUGz5b35KPUjx9qKRVed2giPMM00"
              alt="logo"
              className="w-[44px]"
            />
            <div className="lg:flex hidden gap-5">
              {["Home", "Find Jobs", "Find Talents", "About us", "Testimonials"].map((item) => (
                <a
                  href="/"
                  key={item}
                  className="py-1.5 px-4 hover:shadow-md rounded-md duration-200 hover:translate-x-0.5 hover:translate-y-0.5"
                >
                  {item}
                </a>
              ))}
            </div>
            <div
              onClick={() => document.getElementById("my_modal_3")?.showModal()}
              className="bg-gradient-to-b cursor-pointer from-[#A128FF] to-[#6100AD] py-2 px-4 rounded-full text-white"
            >
              Create Jobs
            </div>
          </div>
        </div>
        <Filters />
      </div>

      <div className="lg:h-[160px] md:h-[200px] h-[270px] w-full" />
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box max-w-[600px] bg-white text-black">
          <h3 className="font-bold text-lg text-center mb-4">Create Job Opening</h3>
          <form className="grid grid-cols-1 gap-4 text-sm">
            <input
              type="text"
              placeholder="Job Title"
              value={jobData.title}
              onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            />
            <input
              type="text"
              placeholder="Company Name"
              value={jobData.company}
              onChange={(e) => setJobData({ ...jobData, company: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            />
            <input
              type="text"
              placeholder="Location"
              value={jobData.location}
              onChange={(e) => setJobData({ ...jobData, location: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            />
            {jobData.location && filteredSuggestions.length > 0 && (
              <div className="border rounded p-2 bg-white text-black">
                {filteredSuggestions.map((loc) => (
                  <div
                    key={loc}
                    onClick={() => setJobData({ ...jobData, location: loc })}
                    className="cursor-pointer hover:bg-gray-100"
                  >
                    {loc}
                  </div>
                ))}
              </div>
            )}
            <select
              value={jobData.job_type}
              onChange={(e) => setJobData({ ...jobData, job_type: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            >
              <option value="">Select Job Type</option>
              {types.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Min Salary"
                value={jobData.min_salary}
                onChange={(e) => setJobData({ ...jobData, min_salary: e.target.value })}
                className="border rounded p-2 bg-white text-black"
              />
              <input
                type="text"
                placeholder="Max Salary"
                value={jobData.max_salary}
                onChange={(e) => setJobData({ ...jobData, max_salary: e.target.value })}
                className="border rounded p-2 bg-white text-black"
              />
            </div>
            <input
              type="date"
              value={jobData.deadline}
              onChange={(e) => setJobData({ ...jobData, deadline: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            />
            <textarea
              placeholder="Job Description"
              value={jobData.description}
              onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
              className="border rounded p-2 bg-white text-black"
            />
          </form>

          <div className="flex justify-between mt-5 modal-action">
            <form method="dialog">
              <button className="border px-4 py-1 rounded border-black">Save Draft</button>
            </form>
            <button
              onClick={handleCreateJob}
              className="bg-blue-600 text-white px-4 py-1 rounded"
            >
              Publish
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default Navbar;
