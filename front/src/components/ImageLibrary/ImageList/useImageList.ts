import db, { UserImage } from "@/lib/dexieClient";
import { RootState } from "@/lib/store/store";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useImageList = () => {
  const [images, setImages] = useState<UserImage[] | undefined>([]);
  const imageMetadata = useSelector((state: RootState) => state.image.images);

  const loadImages = useCallback(async () => {
    const loadedImages: UserImage[] = [];

    for (const image of imageMetadata) {
      const storedImage = await db.images.get(image.id);
      if (storedImage) {
        loadedImages.push({
          id: storedImage.id,
          fileName: storedImage.fileName,
          fileData: storedImage.fileData,
        });
      }
    }

    setImages((prevImages) => {
      const prevIds = prevImages?.map((img) => img.id) || [];
      const newIds = loadedImages.map((img) => img.id);
      if (JSON.stringify(prevIds) === JSON.stringify(newIds)) {
        return prevImages;
      }
      return loadedImages;
    });
  }, [imageMetadata]);

  useEffect(() => {
    loadImages();
  }, [imageMetadata, loadImages]);

  return { images };
};

export default useImageList;
