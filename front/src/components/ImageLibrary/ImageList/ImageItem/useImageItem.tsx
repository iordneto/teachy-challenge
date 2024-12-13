import { useState } from "react";

const useImageItem = () => {
  const [isDragging, setIsDragging] = useState(false);
  const getImageUrlFromFileData = (fileData: ArrayBuffer) => {
    const blob = new Blob([fileData]);
    return URL.createObjectURL(blob);
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    e.dataTransfer.setData("text", target.id);
    setIsDragging(true);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  return {
    getImageUrlFromFileData,
    handleDragStart,
    handleDragEnd,
    isDragging,
  };
};

export default useImageItem;
