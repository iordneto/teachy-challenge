"use client";

import { RootState } from "@/lib/store/store";
import { useSelector } from "react-redux";
import Page from "./Page";

const Editor = () => {
  const pages = useSelector((state: RootState) => state.editor.pages);

  const pageComponents = pages.map((page) => (
    <Page key={page.id} pageUuid={page.id} />
  ));

  return (
    <div
      className="flex flex-1 flex-col gap-10 justify-center items-center bg-slate-200 p-10"
      onDragOver={(e) => e.preventDefault()}
    >
      {pageComponents}
    </div>
  );
};

export default Editor;
