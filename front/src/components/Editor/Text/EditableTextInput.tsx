import React from "react";
import { Html } from "react-konva-utils";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
};

export function EditableTextInput({
  x,
  y,
  width,
  height,
  value,
  onChange,
  onKeyDown,
}: Props) {
  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <textarea
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          border: "none",
          padding: "0px",
          margin: "0px",
          background: "none",
          outline: "none",
          resize: "none",
          color: "black",
          fontSize: "24px",
          fontFamily: "sans-serif",
          marginTop: "-4px",
        }}
      />
    </Html>
  );
}
