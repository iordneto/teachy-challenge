"use client";
import db from "@/lib/dexieClient";
import { addImage } from "@/lib/store/imageSlice";
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useDispatch } from "react-redux";

interface DragAndDropContextProps {
  onImageUpload: (file: File) => void;
}

const DragAndDropContext = createContext<DragAndDropContextProps | undefined>(
  undefined
);

export const useDragAndDrop = () => {
  const context = useContext(DragAndDropContext);
  if (!context) {
    throw new Error("useDragAndDrop must be used within a DragAndDropProvider");
  }
  return context;
};

export const DragAndDropProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [, setImagePreview] = useState<string | null>(null);
  const dispatch = useDispatch();

  const handleImageUpload = useCallback(
    async (file: File) => {
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);

      console.log("Imagem carregada:", file);

      try {
        const id = await db.images.add({
          fileName: file.name,
          fileData: await file.arrayBuffer(),
        });
        console.log("Imagem salva no IndexedDB com id:", id);

        if (!id) {
          throw new Error("Erro ao salvar a imagem no IndexedDB");
        }

        dispatch(addImage({ id, fileName: file.name }));
      } catch (error) {
        console.error("Erro ao salvar a imagem no IndexedDB", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file);
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
    };

    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, [handleImageUpload]);

  return (
    <DragAndDropContext.Provider value={{ onImageUpload: handleImageUpload }}>
      {children}
    </DragAndDropContext.Provider>
  );
};
