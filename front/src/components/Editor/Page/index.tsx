import { IoAdd, IoText, IoTrash } from "react-icons/io5";
import { Image as KonvaImage, Layer, Stage, Transformer } from "react-konva";

import { TextBlock } from "../Text/TextBlock";
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
    pageTexts,
    transformerRef,
    handleAddNewPage,
    handleRemovePage,
    handleDrop,
    handleSelect,
    handleStageClick,
    handleAddText,
    handleSaveText,
  } = usePage();

  const textsForPage = pageTexts[pageUuid] || [];

  return (
    <div className="flex flex-col">
      <div
        className="flex flex-row gap-2 justify-end w-full py-2"
        style={{ maxWidth: width }}
      >
        <button onClick={handleAddNewPage}>
          <IoAdd color="#333333" size={20}></IoAdd>
        </button>
        <button onClick={() => handleRemovePage(pageUuid)}>
          <IoTrash color="#333333" size={20} />
        </button>
        <button onClick={() => handleAddText(pageUuid)}>
          <IoText color="#333333" size={20} />{" "}
          {/* Botão para adicionar texto */}
        </button>
      </div>
      <div className="bg-white" style={{ width, height }} onDrop={handleDrop}>
        <Stage width={width} height={height} onClick={handleStageClick}>
          <Layer>
            {images.map((image, index) => (
              <KonvaImage
                key={index}
                x={10}
                y={10}
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

            {textsForPage.map((textItem, index) => (
              <TextBlock
                key={index}
                x={50}
                y={50}
                text={textItem.text}
                onTextChange={(value) =>
                  handleSaveText(pageUuid, value, textItem.id)
                }
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
