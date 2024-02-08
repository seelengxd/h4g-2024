import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  XCircleIcon,
} from "@heroicons/react/20/solid";
import { useState } from "react";
import Circle from "../miscellaneous/Circle";
import ConfirmationDialog from "../feedback/ConfirmationDialog";

interface ImageGalleryProps {
  imageUrls: string[];
  height?: string;
  deletable?: boolean;
  onDelete?: (updatedImagesUrl: string[]) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageUrls,
  height = "h-56",
  deletable = false,
  onDelete,
}: ImageGalleryProps) => {
  const numberImages = imageUrls.length;
  const [index, setIndex] = useState(0);
  const [deleteIndex, setDeleteIndex] = useState(-1);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  if (numberImages === 0) return <></>;

  return (
    <div className="flex flex-col gap-2 w-full">
      {/* Images */}
      <div className={`relative w-full ${height} overflow-hidden rounded-lg`}>
        {imageUrls.map((imageUrl, imgIndex) => (
          <div className={imgIndex !== index ? " hidden" : ""}>
            <img
              src={imageUrl}
              className="object-contain absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
              alt=""
            />
            {deletable && (
              <XCircleIcon
                className="absolute top-2 right-2 w-10 h-10 fill-gray-700 hover:fill-red-700"
                onClick={() => {
                  setDeleteIndex(imgIndex);
                  setIsDialogOpen(true);
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-12">
        <div className="flex col-span-1">
          <ArrowLeftCircleIcon
            className="fill-gray-500 opacity-50 max-h-8"
            onClick={() => setIndex((index - 1) % numberImages)}
          />
        </div>

        <div className="flex flex-row col-span-10 w-full gap-2 items-center justify-center">
          {imageUrls.map((_, imgIndex) => (
            <Circle
              onClick={() => {
                setIndex(imgIndex);
              }}
              bgColor={index === imgIndex ? "bg-gray-500" : "bg-gray-300"}
            />
          ))}
        </div>

        <div className="flex col-span-1">
          <ArrowRightCircleIcon
            className="fill-gray-500 opacity-50 max-h-8"
            onClick={() => setIndex((index + 1) % numberImages)}
          />
        </div>
      </div>

      {isDialogOpen && (
        <ConfirmationDialog
          message="Delete this activity image?"
          onConfirm={() => {
            const updatedImageUrls = imageUrls.filter(
              (_item, index) => index !== deleteIndex
            );
            imageUrls = updatedImageUrls;
            onDelete && onDelete(updatedImageUrls);
            setIsDialogOpen(false);
          }}
          onCancel={() => setIsDialogOpen(false)}
        />
      )}
    </div>
  );
};

export default ImageGallery;
