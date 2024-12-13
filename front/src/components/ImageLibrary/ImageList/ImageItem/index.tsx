import { UserImage } from "@/lib/dexieClient";
import React from "react";
import useImageItem from "./useImageItem";

const areEqual = (
  prevProps: { image: UserImage },
  nextProps: { image: UserImage }
) => {
  return prevProps.image.id === nextProps.image.id;
};

const ImageItem = React.memo(({ image }: { image: UserImage }) => {
  const {
    getImageUrlFromFileData,
    handleDragStart,
    handleDragEnd,
    isDragging,
  } = useImageItem();

  return (
    <div
      className={`w-[100px] h-[100px] rounded-[8px] bg-transparent bg-cover bg-center cursor-pointer`}
      style={{
        backgroundImage: `url(${getImageUrlFromFileData(image.fileData)})`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
    ></div>
  );
}, areEqual);

ImageItem.displayName = "ImageItem";

export default ImageItem;
