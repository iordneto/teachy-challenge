"use client";
import { useDragAndDrop } from "@/contexts/DragAndDropContext";
import React, { memo } from "react";
import ImageItem from "./ImageItem";
import useImageList from "./useImageList";

const ImageList: React.FC = memo(
  () => {
    const { isUploading } = useDragAndDrop();
    const { images } = useImageList();

    return (
      <div className="grid grid-cols-3 gap-2 p-4">
        {images?.map((image) => (
          <ImageItem image={image} key={image.id} />
        ))}
        {isUploading && <ImageItem />}
      </div>
    );
  },
  () => true
);

ImageList.displayName = "ImageList";

export default ImageList;
