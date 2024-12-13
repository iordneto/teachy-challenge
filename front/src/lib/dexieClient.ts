import Dexie, { EntityTable } from "dexie";

export interface UserImage {
  id?: number;
  fileName: string;
  fileData: ArrayBuffer;
}

const db = new Dexie("ImageDatabase") as Dexie & {
  images: EntityTable<UserImage, "id">;
};
db.version(1).stores({
  images: "++id, fileName, fileData",
});

export default db;
