import { useState, useCallback } from "react";
import Button from "./Button";
import twoFaApi from "../../api/twoFa/twoFa";

const TwoFaSgIdButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSingpassClick = useCallback(() => {
    setIsLoading(true);
    twoFaApi
      .authenticateTwoFa()
      .then(({ redirectUrl }) => {
        window.location.href = redirectUrl;
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <Button onClick={handleSingpassClick} isLoading={isLoading}>
      <div className="flex flex-row text-xl gap-3 pb-3 pt-1 px-8 items-center justify-center">
        <span>Login with </span>
        <img
          src="/singpass_logo_white-3.png"
          alt="Singpass Logo"
          width="150em"
          className="mt-2"
        />{" "}
        <span>App</span>
      </div>
    </Button>
  );
};

export default TwoFaSgIdButton;
