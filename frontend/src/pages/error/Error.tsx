import React from "react";
import { Placeholder } from "../../components/rive/Placeholder";

interface errorDetails {
  errorCode: number;
  desc: string;
}

const Error: React.FC<errorDetails> = ({ errorCode, desc }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen p-40 mt-2">
      <h1 className="mb-2 text-4xl font-bold text-pink-500">{errorCode}</h1>
      <h2 className="mb-4 text-lg text-gray-500">{desc}</h2>
      <Placeholder />
    </div>
  );
};

export default Error;
