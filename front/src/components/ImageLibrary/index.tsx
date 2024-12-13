import ImageList from "./ImageList";

const ImageLibrary = () => {
  return (
    <div className="flex justify-center items-start bg-white h-screen overflow-y-auto border-1 border-solid border-[rgba(57,76,96,.15)]">
      <ImageList />
    </div>
  );
};

export default ImageLibrary;
