import { PropsWithChildren } from "react";

const Container: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {children}
    </div>
  );
};

export default Container;
