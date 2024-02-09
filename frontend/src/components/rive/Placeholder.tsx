import React from "react";
import Rive from "@rive-app/react-canvas";

export const Placeholder = () => {
  return (
    <Rive
      src="https://cdn.rive.app/animations/vehicles.riv"
      stateMachines="bumpy"
    />
  );
};
