import React from "react";
import Rive from "@rive-app/react-canvas";

export const Placeholder = () => {
  console.log("Rendering Placeholder component"); // Add this line for debugging
  return (
    <Rive
      src="https://cdn.rive.app/animations/vehicles.riv"
      stateMachines="bumpy"
    />
  );
};
