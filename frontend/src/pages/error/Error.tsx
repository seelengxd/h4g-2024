import React from "react";
import { Link } from "react-router-dom";

interface errorDetails {
  errorCode: number;
  desc: string;
  subDesc?: string;
}

const Error: React.FC<errorDetails> = ({ errorCode, desc, subDesc = "" }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-40 mt-2">
      <h1 className="mb-2 font-bold text-[16rem] bg-gradient-to-r text-transparent bg-clip-text from-primary-800 via-primary-600 to-primary-800">
        {errorCode}
      </h1>
      <h2 className="mb-4 text-3xl font-bold text-gray-500 uppercase ">
        {desc}
      </h2>
      <p className="mt-4 text-gray-800">{subDesc}</p>
      <div className="flex gap-8 mt-8">
        <Link
          to="/"
          className="p-4 px-8 text-white uppercase rounded-3xl bg-primary-700"
        >
          Return Home
        </Link>
        <Link
          to="https://github.com/seelengxd/h4g-2024/issues/new"
          className="p-4 px-8 uppercase border-2 text-primary-700 rounded-3xl border-primary-700"
        >
          Report Problem
        </Link>
      </div>
    </div>
  );
};

export default Error;
