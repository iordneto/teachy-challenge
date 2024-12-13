"use client";
import { Image as KonvaImage, Layer, Stage } from "react-konva";
import useEditor from "./useEditor";

const width = 400;
const height = 400;

const Editor = () => {
  const { images, imagePreviews, handleDrop } = useEditor();

  return (
    <div
      className="flex flex-1 justify-center items-center bg-slate-300 h-screen overflow-y-auto"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="bg-white" style={{ width, height }}>
        <Stage width={width} height={height}>
          <Layer>
            {images.map((image, index) => (
              <KonvaImage
                key={index}
                x={0}
                y={0}
                width={image.width}
                height={image.height}
                image={imagePreviews[image.id]}
                draggable
              />
            ))}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Editor;
