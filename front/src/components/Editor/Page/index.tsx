import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";
import usePage from "./usePage";

const width = 400;
const height = 400;

type Props = {
  pageUuid: string;
};

const Page = ({ pageUuid }: Props) => {
  const {
    images,
    imagePreviews,
    transformerRef,
    handleAddNewPage,
    handleRemovePage,
    handleDrop,
    handleSelect,
    handleStageClick,
  } = usePage();

  return (
    <div className="flex flex-col ">
      <div
        className="flex flex-row gap-4 justify-end w-full"
        style={{ maxWidth: width }}
      >
        <button onClick={handleAddNewPage}>Add new page</button>
        <button onClick={() => handleRemovePage(pageUuid)}>Remove Page</button>
      </div>
      <div className="bg-white" style={{ width, height }} onDrop={handleDrop}>
        <Stage width={width} height={height} onClick={handleStageClick}>
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
                onClick={handleSelect}
                onDblClick={handleSelect}
                onTap={handleSelect}
                onDblTap={handleSelect}
              />
            ))}

            <Transformer
              ref={transformerRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 20 || newBox.height < 20) {
                  return oldBox;
                }
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default Page;
