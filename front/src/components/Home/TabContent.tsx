import ImageLibrary from "@/components/ImageLibrary";
import { RootState } from "@/lib/store/store";

import { useSelector } from "react-redux";

const TabContent = () => {
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  return (
    <div>
      {activeTab === "uploads" && <ImageLibrary />}
      {activeTab === "text" && (
        <div className="p-4">
          <h2>Add Text Component Placeholder</h2>
          <p>Este é o componente que será mostrado para a aba Text.</p>
        </div>
      )}
    </div>
  );
};

export default TabContent;
