import React from "react";
import { Placeholder } from "../../components/rive/Placeholder";

interface errorDetails {
  errorCode: number;
  desc: string;
}

const Error: React.FC<errorDetails> = ({ errorCode, desc }) => {
  return (
    <div className="p-40 mt-2 flex flex-col items-center justify-center h-screen">
      <h1 className="text-pink-500 text-4xl font-bold mb-2">{errorCode}</h1>
      <h2 className="text-gray-500 text-lg mb-4">{desc}</h2>
      <Placeholder />
    </div>
  );
};

export default Error;
