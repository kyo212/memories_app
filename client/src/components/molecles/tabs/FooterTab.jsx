import { useState } from "react";
// サードパーティ
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const FooterTab = () => {
  const [seachToggle, setSearchToggle] = useState(false);
  const { searchOpen } = useStyle();

  return (
    <div className="fixed bottom-0 h-14 w-full border-t-2 bg-white">
      <div className="flex h-full w-full items-center space-x-2">
        <p>
          <a href="#" className="border-b mx-8 text-[12px] text-blue-700">
            みんなの思い出
          </a>
        </p>
        <button className="fixed right-2 flex items-center rounded-sm border-slate-400 bg-white">
          <input
            type="text"
            className={[seachToggle ? searchOpen.showed : searchOpen.base]}
          />
          <span
            onClick={() => setSearchToggle(!seachToggle)}
            className="px-2 py-1 text-slate-700"
          >
            <BsSearch />
          </span>
        </button>
      </div>
    </div>
  );
};
