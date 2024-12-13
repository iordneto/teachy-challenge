import db from "@/lib/dexieClient";
import { addPage, removePage } from "@/lib/store/editorSlice";
import Konva from "konva";
import { KonvaEventObject } from "konva/lib/Node";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CanvasImage } from "../types";

const usePage = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState<CanvasImage[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: HTMLImageElement;
  }>({});
  const [pageTexts, setPageTexts] = useState<{
    [key: string]: { id: string; text: string; x: number; y: number }[];
  }>({});
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState<string>("");

  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [selectedImage, setSelectedImage] = useState<Konva.Image | null>(null);

  const loadImageFromDb = async (imageId: string) => {
    const storedImage = await db.images.get(parseInt(imageId));

    if (storedImage) {
      const img = new Image();
      img.src = URL.createObjectURL(new Blob([storedImage.fileData]));
      img.onload = () => {
        setImagePreviews((prev) => ({
          ...prev,
          [imageId]: img,
        }));
      };
    }
  };

  useEffect(() => {
    images.forEach((image) => {
      loadImageFromDb(image.id);
    });
  }, [images]);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData("text");

    if (imageId) {
      const storedImage = await db.images.get(parseInt(imageId));

      if (storedImage) {
        const img = new Image();
        img.src = URL.createObjectURL(new Blob([storedImage.fileData]));
        img.onload = () => {
          const ratio = img.height / img.width;
          const newWidth = 150;
          const newHeight = newWidth * ratio;

          setImages((prev) => [
            ...prev,
            {
              id: imageId,
              x: e.clientX,
              y: e.clientY,
              width: newWidth,
              height: newHeight,
            },
          ]);
        };
      }
    }
  };

  const handleSelect = (e: KonvaEventObject<MouseEvent>) => {
    const target = e.target as Konva.Image;

    if (target === selectedImage) {
      setSelectedImage(null);
    } else {
      setSelectedImage(target);
    }
  };

  useEffect(() => {
    if (selectedImage) transformerRef.current?.nodes([selectedImage]);
    const layer = transformerRef.current?.getLayer();
    layer?.batchDraw();
  }, [selectedImage]);

  const handleStageClick = (e: KonvaEventObject<MouseEvent>) => {
    if (e.target === e.target.getStage()) {
      setSelectedImage(null);
      transformerRef.current?.nodes([]);
      const layer = transformerRef.current?.getLayer();
      layer?.batchDraw();
    }
  };

  const handleAddNewPage = () => {
    dispatch(addPage());
  };

  const handleRemovePage = (pageUuid: string) => {
    dispatch(removePage(pageUuid));
  };

  const handleAddText = (pageUuid: string) => {
    const newTextItem = {
      id: Date.now().toString(),
      text: "Novo Texto",
      x: 50,
      y: 50,
    };

    setPageTexts((prev) => {
      const updatedTexts = { ...prev };
      if (!updatedTexts[pageUuid]) {
        updatedTexts[pageUuid] = [];
      }
      updatedTexts[pageUuid].push(newTextItem);
      return updatedTexts;
    });
  };

  const handleEditText = (pageUuid: string, textId: string) => {
    const textItem = pageTexts[pageUuid]?.find((item) => item.id === textId);
    if (textItem) {
      setEditingTextId(textId);
      setEditingText(textItem.text);
    }
  };

  const handleSaveText = (
    pageUuid: string,
    newText: string,
    textId: string
  ) => {
    if (textId && newText) {
      const updatedTexts = pageTexts[pageUuid]?.map((item) =>
        item.id === textId ? { ...item, text: newText } : item
      );
      setPageTexts((prev) => ({
        ...prev,
        [pageUuid]: updatedTexts || [],
      }));
    }
  };

  return {
    imagePreviews,
    images,
    pageTexts,
    selectedImage,
    transformerRef,
    handleAddNewPage,
    handleAddText,
    handleDrop,
    handleRemovePage,
    handleSelect,
    handleStageClick,
    handleEditText,
    handleSaveText,
    editingTextId,
    editingText,
    setEditingText,
  };
};

export default usePage;
