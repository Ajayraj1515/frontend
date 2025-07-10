import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // assuming you're using react-router

const JobCard = ({ job }) => {
  const getTimeAgo = (val) => {
    const createdDate = new Date(val);
    const date = new Date();
    const diff = date - createdDate;
    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(diff / (1000 * 60 * 60));

    if (daysAgo >= 1) {
      return `${daysAgo}d`;
    } else {
      return `${hoursAgo}hr`;
    }
  };

  const daysAgo = getTimeAgo(job.createdAt);
  const points = job.description.split("\n");

  return (
    <div className="card p-4 rounded-lg bg-white relative z-[10] max-w-[316px]">
      <div className="absolute top-5 right-5 bg-[#B0D9FF] px-3 py-1 rounded-xl font-semibold">
        {daysAgo} Ago
      </div>

      <div>
        <div className="bg-gradient-to-b from-[#FEFEFD] to-[#F1F1F1] shadow-sm p-2 w-fit border border-white rounded-xl">
          <img
            src="/amazon.png"
            width="64"
            height="64"
            alt="company-logo"
            className="w-16 h-16"
          />
        </div>

        <div className="pt-5 pb-3 grid gap-2">
          <h1 className="text-xl font-semibold w-full truncate">{job.title}</h1>

          <div className="flex justify-between gap-2 text-[16px] text-[#5A5A5A] font-[500]">
            <div className="flex gap-1 items-center">
              <img src="/exp.svg" width="20" height="16" alt="exp" className="w-5 h-4" />
              <p>1-3 yr Exp</p>
            </div>
            <div className="flex gap-1 items-center">
              <img src="/site.svg" width="20" height="16" alt="site" className="w-5 h-4" />
              <p>Onsite</p>
            </div>
            <div className="flex gap-1 items-center">
              <img src="/lpa.svg" width="20" height="16" alt="lpa" className="w-5 h-4" />
              <p>{job.max_salary / 100000} LPA</p>
            </div>
          </div>

          <div className="list-disc h-[80px] overflow-hidden">
            {points.map((point, i) => (
              <div key={i} className="flex items-start">
                <li className="text-[#555555]"></li>
                <p className="text-sm text-[#555555] font-[500] max-h-[80px] overflow-hidden ml-[-8px]">
                  {point}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid w-full">
        <Link
          to="/"
          className="bg-[#00AAFF] text-white text-center font-semibold py-2 rounded-[12px] w-full"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
};

JobCard.propTypes = {
  job: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    max_salary: PropTypes.number.isRequired,
  }).isRequired,
};

export default JobCard;
