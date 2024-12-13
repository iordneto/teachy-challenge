"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import Page from "./Page";

const Editor = () => {
  const pagesCount = useSelector((state: RootState) => state.editor.pagesCount);

  const pageComponents = Array.from({ length: pagesCount }).map((_, index) => (
    <Page key={index} />
  ));

  return (
    <div
      className="flex flex-1 flex-col gap-10 justify-center items-center bg-slate-300 p-10"
      onDragOver={(e) => e.preventDefault()}
    >
      {pageComponents}
    </div>
  );
};

export default Editor;
