"use client";
import { Layer, Stage } from "react-konva";

const width = 400;
const height = 400;

const Editor = () => {
  return (
    <div className="flex flex-1 justify-center items-center bg-slate-300 h-screen overflow-y-auto">
      <div className="bg-white" style={{ width, height }}>
        <Stage width={width} height={height}>
          <Layer></Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Editor;
