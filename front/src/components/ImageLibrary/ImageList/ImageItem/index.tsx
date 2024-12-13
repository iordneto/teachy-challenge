import { UserImage } from "@/lib/dexieClient";
import Image from "next/image";
import React from "react";
import useImageItem from "./useImageItem";

const areEqual = (
  prevProps: { image?: UserImage },
  nextProps: { image?: UserImage }
) => {
  return prevProps.image?.id === nextProps.image?.id;
};

const ImageItem = React.memo(({ image }: { image?: UserImage }) => {
  const {
    getImageUrlFromFileData,
    handleDragStart,
    handleDragEnd,
    isDragging,
  } = useImageItem();

  const backgroundImage: string | null = image?.fileData
    ? getImageUrlFromFileData(image.fileData)
    : null;

  const imageTitle = image?.fileName || "Imagem sendo carregada";

  return (
    <div
      className={`w-[100px] h-[100px] rounded-[8px] bg-transparent bg-cover bg-center cursor-pointer overflow-hidden
        ${!backgroundImage && "bg-slate-200"}
        ${isDragging ? "cursor-grabbing" : "cursor-grab"} `}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt={imageTitle}
          className={`w-full h-full object-cover pointer-events-none`}
          draggable={false}
          width={100}
          height={100}
        />
      )}
    </div>
  );
}, areEqual);

ImageItem.displayName = "ImageItem";

export default ImageItem;
