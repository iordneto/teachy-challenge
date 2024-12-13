import { useDragAndDrop } from "@/contexts/DragAndDropContext";
import { useRef } from "react";
import { IoCloudUpload } from "react-icons/io5";
import ImageList from "./ImageList";
import useImageList from "./ImageList/useImageList";

const ImageLibrary = () => {
  const { onImageUpload } = useDragAndDrop();
  const { images } = useImageList();
  const isListEmpty = images?.length === 0;

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
    e.target.value = ""; // Reseta o input para permitir o upload do mesmo arquivo novamente.
  };

  return (
    <div
      className={`flex flex-col ${
        isListEmpty
          ? "justify-center items-center"
          : "justify-between items-start"
      }  px-3 py-6 bg-white h-screen overflow-y-auto border-r-[1px] border-solid border-[rgba(57,76,96,.15)]  shadow-md min-w-[320px]`}
    >
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {isListEmpty && (
        <button
          onClick={handleButtonClick}
          className="flex flex-col items-center gap-2 p-4 w-full text-[#0D1216] rounded-lg border-[1px] border-dashed border-[rgba(57,76,96,.15)] max-w-[160px]"
        >
          <IoCloudUpload size={50} />
          Upload Image or Drag and Image
        </button>
      )}

      <ImageList />
      {!isListEmpty && (
        <button
          onClick={handleButtonClick}
          className="flex flex-row  items-center justify-center gap-2 p-4 w-full text-[#0D1216] rounded-lg border-[1px] border-solid border-[rgba(57,76,96,.15)] text-center hover:bg-slate-100 "
        >
          <IoCloudUpload size={25} />
          Upload Image
        </button>
      )}
    </div>
  );
};

export default ImageLibrary;
