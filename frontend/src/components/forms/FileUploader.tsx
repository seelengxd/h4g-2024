import { DocumentArrowUpIcon } from "@heroicons/react/24/outline";
import Input, { InputProps } from "./Input";

export interface FileUploaderProps extends InputProps {
  fileConstraintLabel: string;
  icon?: JSX.Element;
  hx?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  fileConstraintLabel,
  icon,
  hx = "h-64",
  ...props
}: FileUploaderProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={`flex flex-col items-center justify-center w-full ${hx} border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden p-4`}
      >
        <label className="flex flex-col items-center justify-center w-full h-full pt-5 pb-6">
          {icon ?? (
            <DocumentArrowUpIcon className="w-8 h-8 mb-2 stroke-2 stroke-gray-500" />
          )}
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500">{fileConstraintLabel}</p>
          <Input {...props} hidden />
        </label>
      </div>
    </div>
  );
};

export default FileUploader;
