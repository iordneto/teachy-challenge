import db from "@/lib/dexieClient"; // Certifique-se de que o db esteja corretamente configurado
import { useEffect, useState } from "react";
import { CanvasImage } from "./types";

const useEditor = () => {
  const [images, setImages] = useState<CanvasImage[]>([]);
  const [imagePreviews, setImagePreviews] = useState<{
    [key: string]: HTMLImageElement;
  }>({});

  useEffect(() => {
    const loadImageFromDb = async (imageId: string) => {
      const storedImage = await db.images.get(parseInt(imageId));

      if (storedImage) {
        const img = new Image(); // Agora sem o erro, o construtor é chamado corretamente
        img.src = URL.createObjectURL(new Blob([storedImage.fileData]));
        img.onload = () => {
          setImagePreviews((prev) => ({
            ...prev,
            [imageId]: img,
          }));
        };
      }
    };

    // Carregar as imagens do IndexedDB com base nos IDs
    images.forEach((image) => {
      loadImageFromDb(image.id);
    });
  }, [images]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    console.log(e.clientX, e.clientY);
    const imageId = e.dataTransfer.getData("text");

    if (imageId) {
      setImages((prev) => [
        ...prev,
        { id: imageId, x: e.clientX, y: e.clientY, width: 100, height: 100 },
      ]);
    }
  };

  return {
    images,
    imagePreviews,
    handleDrop,
  };
};

export default useEditor;
