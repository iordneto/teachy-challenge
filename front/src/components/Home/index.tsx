"use client";
import Editor from "@/components/Editor";

import Sidebar from "./SideBar";
import TabContent from "./TabContent";

const Home = () => {
  return (
    <>
      <header></header>
      <main className="p-0">
        <div className="flex flex-row">
          <Sidebar />
          <TabContent />
          <Editor />
        </div>
      </main>
      <footer></footer>
    </>
  );
};

export default Home;
