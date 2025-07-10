// src/pages/Home.js
import React from 'react';
import JobCard from "../components/JobCard";
import Loader from "../components/Loader";
import axiosInstance from "../utils/axiosInstance";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/GlobalProvider"; // adjust path as needed

export default function Home() {
  const { filters, jobs, setJobs } = useGlobalContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      try {
        const query = new URLSearchParams({
          search: filters.search,
          location: filters.location,
          min_salary: filters.min_salary * 1000,
          max_salary: filters.max_salary * 1000,
          job_type: filters.job_type,
        }).toString();
        const res = await axiosInstance.get(`/api/jobs?${query}`);
        setJobs(res.data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [filters,setJobs]);

  return (
    <div className="bg-[#FBFBFF] lg:px-10 py-10 min-h-screen">
      {loading ? (
        <Loader />
      ) : (
        <div className="flex justify-center">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-5">
            {jobs &&
              jobs.map((job) => (
                <div key={job._id}>
                  <JobCard job={job} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
