import db from "@/lib/dexieClient"; // Certifique-se de que o db esteja corretamente configurado
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

  const transformerRef = useRef<Konva.Transformer | null>(null);
  const [selectedImage, setSelectedImage] = useState<Konva.Image | null>(null);

  useEffect(() => {
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

    images.forEach((image) => {
      loadImageFromDb(image.id);
    });
  }, [images]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const imageId = e.dataTransfer.getData("text");

    if (imageId) {
      setImages((prev) => [
        ...prev,
        { id: imageId, x: e.clientX, y: e.clientY, width: 100, height: 100 },
      ]);
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

  return {
    imagePreviews,
    images,
    selectedImage,
    transformerRef,
    handleAddNewPage,
    handleDrop,
    handleRemovePage,
    handleSelect,
    handleStageClick,
  };
};

export default usePage;
