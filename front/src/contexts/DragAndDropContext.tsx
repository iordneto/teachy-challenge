"use client";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

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

  // Função para lidar com o upload da imagem
  const handleImageUpload = (file: File) => {
    setImagePreview(URL.createObjectURL(file)); // Gerar o preview da imagem
    console.log("Imagem carregada:", file); // Você pode armazenar ou fazer upload aqui
  };

  // Registrar os eventos de drag and drop globalmente
  useEffect(() => {
    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file && file.type.startsWith("image/")) {
        handleImageUpload(file); // Chama a função de upload de imagem
      }
    };

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault(); // Necessário para permitir o "drop"
    };

    // Adicionando os ouvintes de evento no `document` globalmente
    document.addEventListener("dragover", handleDragOver);
    document.addEventListener("drop", handleDrop);

    // Limpeza dos ouvintes de evento quando o componente for desmontado
    return () => {
      document.removeEventListener("dragover", handleDragOver);
      document.removeEventListener("drop", handleDrop);
    };
  }, []);

  return (
    <DragAndDropContext.Provider value={{ onImageUpload: handleImageUpload }}>
      {children}
    </DragAndDropContext.Provider>
  );
};
