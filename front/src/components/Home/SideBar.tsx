import { RootState } from "@/lib/store/store";
import { setActiveTab } from "@/lib/store/uiSlice";
import { IoCloudUpload, IoText } from "react-icons/io5";

import { useDispatch, useSelector } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  const tabs = [
    { id: "text", component: <IoText size={30} />, label: "Text" },
    { id: "uploads", component: <IoCloudUpload size={25} />, label: "Uploads" },
  ];

  return (
    <aside className="flex flex-col gap-3 border-r-1 border-solid border-black p-4">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          onClick={() => dispatch(setActiveTab(tab.id))}
          className={`flex flex-col gap-1 justify-center items-center cursor-pointer bg-slate-200 rounded-[8px] w-[80px] h-[80px] p-2 
            ${activeTab === tab.id ? "bg-blue-300" : ""} shadow-sm`}
        >
          {tab.component}
          <div className="font-medium text-sm text-slate-600">{tab.label}</div>
        </div>
      ))}
    </aside>
  );
};

export default Sidebar;