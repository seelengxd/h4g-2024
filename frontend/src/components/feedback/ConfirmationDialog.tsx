interface Props {
  message: string;
  onDelete: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  confirmationLabel?: string;
  cancelLabel?: string;
}

const ConfirmationDialog: React.FC<Props> = ({
  message,
  onDelete,
  onCancel,
  confirmationLabel = "Delete",
  cancelLabel="Cancel",
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur confirm-dialog">
      <div className="relative min-h-screen px-4 md:flex md:items-center md:justify-center">
        <div className="absolute inset-0 z-10 w-full h-full opacity-25"></div>
        <div className="fixed inset-x-0 bottom-0 z-50 p-4 mx-4 mb-4 bg-white rounded-lg shadow-lg md:max-w-md md:mx-auto md:relative">
          <div className="items-center md:flex">
            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 mx-auto border border-gray-300 rounded-full">
              <i className="text-3xl bx bx-error">&#9888;</i>
            </div>
            <div className="mt-4 text-center md:mt-0 md:ml-6 md:text-left">
              <p className="font-bold">Warning!</p>
              <p className="mt-1 text-sm text-gray-700">{message}</p>
            </div>
          </div>
          <div className="mt-4 text-center md:text-right md:flex md:justify-end">
            <button
              id="confirm-delete-btn"
              className="block w-full px-4 py-3 text-sm font-semibold text-red-700 bg-red-200 rounded-lg md:inline-block md:w-auto md:py-2 md:ml-2 md:order-2"
              onClick={onDelete}
            >
              {confirmationLabel}
            </button>
            <button
              id="confirm-cancel-btn"
              className="block w-full px-4 py-3 mt-4 text-sm font-semibold bg-gray-200 rounded-lg md:inline-block md:w-auto md:py-2 md:mt-0 md:order-1"
              onClick={onCancel}
            >
              {cancelLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
