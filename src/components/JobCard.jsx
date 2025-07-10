import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const getTimeAgo = (val) => {
    const createdDate = new Date(val);
    const now = new Date();
    const diff = now - createdDate;

    const daysAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hoursAgo = Math.floor(diff / (1000 * 60 * 60));

    return daysAgo >= 1 ? `${daysAgo}d` : `${hoursAgo}hr`;
  };

  const daysAgo = getTimeAgo(job.createdAt);
  const points = job.description.split("\n");

  return (
    <div className="card p-4 rounded-lg bg-white relative z-[10] max-w-[316px]">
      <div className="absolute top-5 right-5 bg-[#B0D9FF] px-3 py-1 rounded-xl font-semibold text-black">
        {daysAgo} Ago
      </div>

      <div>
        <div className="bg-gradient-to-b from-[#FEFEFD] to-[#F1F1F1] shadow-sm p-2 w-fit border border-white rounded-xl">
          <img
            src={
              job.company_logo ||
              "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png"
            }
            alt={job.company}
            className="w-10 h-10 object-contain rounded"
          />
        </div>

        <div className="pt-5 pb-3 grid gap-2">
          <h1 className="text-xl font-semibold w-full truncate text-gray-500">
            {job.title}
          </h1>

          <div className="flex justify-between gap-2 text-[16px] text-[#5A5A5A] font-[500]">
            <div className="flex gap-1 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4gsDN_wRRvmuopRDLMlNkyYjZJ6cId8Gh88clIFegYc1dr2oZpZYfyueC-rcwxzpiAKg&usqp=CAU"
                width="20"
                height="16"
                alt="exp"
                className="w-5 h-4"
              />
              <p>1-3 yr Exp</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiw9_dxJoagjYpdSKl_A-EHFe09f5-bbOPDqqO04TWTSM39DlnvAZdHEYS0lN2Xgxn0PA&usqp=CAU"
                width="20"
                height="16"
                alt="site"
                className="w-5 h-4"
              />
              <p>Onsite</p>
            </div>
            <div className="flex gap-1 items-center">
              <img
                src="https://i.pinimg.com/564x/f0/ba/38/f0ba38acc9854c0df174293649628939.jpg"
                width="20"
                height="16"
                alt="lpa"
                className="w-5 h-4"
              />
              <p>{job.max_salary / 100000} LPA</p>
            </div>
          </div>

          <div className="list-disc h-[80px] overflow-hidden">
            {points.map((point, i) => (
              <div key={i} className="flex items-start">
                <li className="text-[#555555]"></li>
                <p className="text-sm text-gray-500 font-[500] max-h-[80px] overflow-hidden ml-[-8px]">
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
    company: PropTypes.string.isRequired,
    company_logo: PropTypes.string,
    max_salary: PropTypes.number.isRequired,
  }).isRequired,
};

export default JobCard;
