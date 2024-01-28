import { PropsWithChildren } from "react";

const Center: React.FC<PropsWithChildren> = ({ children }) => {
  return <div className="sm:mx-auto sm:w-full sm:max-w-sm">{children}</div>;
};

export default Center;
