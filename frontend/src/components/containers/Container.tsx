import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex flex-col justify-center min-h-full px-6 py-12 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
