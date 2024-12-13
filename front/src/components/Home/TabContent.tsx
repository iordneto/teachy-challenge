import ImageLibrary from "@/components/ImageLibrary";
import { RootState } from "@/lib/store/store";

import { useSelector } from "react-redux";

const TabContent = () => {
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  return <div>{activeTab === "uploads" && <ImageLibrary />}</div>;
};

export default TabContent;
