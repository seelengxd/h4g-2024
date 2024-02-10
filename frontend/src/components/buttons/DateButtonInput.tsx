import format from "date-fns/format";
import { forwardRef } from "react";

const ButtonInput = forwardRef<HTMLButtonElement>(
  (
    { value, onClick }: React.HTMLProps<HTMLButtonElement>,
    ref: React.Ref<HTMLButtonElement>
  ) => {
    if (value instanceof Array) value = value[0];
    const dateValue = value ? new Date(value) : new Date();
    return (
      <button
        onClick={onClick}
        ref={ref}
        type="button"
        className="inline-flex justify-start w-full px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-blue-500"
      >
        {format(dateValue, "dd MMMM yyyy")}
      </button>
    );
  }
);

export default ButtonInput;
