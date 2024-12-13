import { useEffect, useState } from "react";
import { Group } from "react-konva";
import { EditableText } from "./EditableText";

type Props = {
  text: string;
  x: number;
  y: number;
  onTextChange: (text: string) => void;
};

export function TextBlock({ text, x, y, onTextChange }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [selected, setSelected] = useState(false);
  const [width, setWidth] = useState(200);
  const [height, setHeight] = useState(200);

  const handleClick = () => {
    setSelected(!selected);
  };

  const handleTextClick = (newSelected: boolean) => {
    setSelected(newSelected);
  };

  const handleRezise = (newWidth: number, newHeight: number) => {
    setWidth(newWidth);
    setHeight(newHeight);
  };

  useEffect(() => {
    if (!selected && isEditing) {
      setIsEditing(false);
    } else if (!selected && isTransforming) {
      setIsTransforming(false);
    }
  }, [selected, isEditing, isTransforming]);

  function toggleEdit() {
    setIsEditing(!isEditing);
    handleTextClick(!isEditing);
  }

  function toggleTransforming() {
    setIsTransforming(!isTransforming);
    handleTextClick(!isTransforming);
  }

  return (
    <Group x={x} y={y} onClick={handleClick}>
      <EditableText
        x={20}
        y={40}
        text={text}
        width={width}
        height={height}
        onResize={handleRezise}
        isEditing={isEditing}
        isTransforming={isTransforming}
        onToggleEdit={toggleEdit}
        onToggleTransform={toggleTransforming}
        onChange={onTextChange}
      />
    </Group>
  );
}
