import { PhotoIcon } from "@heroicons/react/24/outline";
import FileUploader, { FileUploaderProps } from "./FileUploader";
import Input from "./Input";

interface ImageUploaderProps extends FileUploaderProps {
  fileConstraintLabel: string;
  imgDisplayUrl?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ fileConstraintLabel, imgDisplayUrl, ...props }: ImageUploaderProps) => {
  const imageIcon = <PhotoIcon className="w-8 h-8 stroke-2 stroke-gray-500 mb-2"/>;

  if (imgDisplayUrl) {
    return (
      <div className="flex items-center justify-center w-full">
        <label className="group relative flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 overflow-hidden p-4">
          <div className="w-fit">
            <img className="object-contain" src={imgDisplayUrl} alt="uploaded" />
            <div
              className="absolute top-0 left-0 w-full h-0 flex flex-col justify-center items-center bg-gray-100 opacity-0 group-hover:h-full group-hover:opacity-100 duration-500">
              {imageIcon}
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag and drop
              </p>
            </div>
          </div>
          <Input {...props} hidden />
        </label>
      </div>
    )
  };

  return (
    <FileUploader
      fileConstraintLabel="Upload an image file"
      icon={imageIcon}
      {...props}
    />
  );
};

export default ImageUploader;
