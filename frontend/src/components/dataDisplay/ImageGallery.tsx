import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import Circle from "../miscellaneous/Circle";

interface ImageGalleryProps {
  imageUrls: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ imageUrls }: ImageGalleryProps) => {
  const numberImages = imageUrls.length;
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col gap-2">
      {/* Images */}
      <div className="relative w-full h-56 overflow-hidden rounded-lg">
        {imageUrls.map((imageUrl, imgIndex) => (
            <div className={imgIndex === index ? " hidden" : ""}>
              <img src={imageUrl} className="object-contain absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="" />
            </div>
          ))}
      </div>

      {/* Controls */}
      <div className="grid grid-cols-12" data-carousel="slide">
        <div className="flex col-span-1">
          <ArrowLeftCircleIcon className="fill-gray-500 opacity-50 max-h-8" onClick={() => setIndex((index - 1) % numberImages)}/>
        </div>

        <div className="flex flex-row col-span-10 w-full gap-2 items-center justify-center">
          {imageUrls.map((_, imgIndex) => <Circle onClick={() => {setIndex(imgIndex);}} bgColor={index === imgIndex ? "bg-gray-500" : "bg-gray-300"} />)}
        </div>

      <div className="flex col-span-1">
        <ArrowRightCircleIcon className="fill-gray-500 opacity-50 max-h-8" onClick={() => setIndex((index + 1) % numberImages)}/>
      </div>
    </div>
  </div>
  );
};

export default ImageGallery;
