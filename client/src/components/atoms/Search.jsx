import { useState } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Search = () => {
  // カスタムフック
  const { searchOpen } = useStyle();
  // Toggle
  const [seachToggle, setSearchToggle] = useState(false);

  return (
    <button className="fixed right-20 flex items-center rounded-full border-slate-300 bg-gray-500">
      <input
        type="text"
        placeholder="アルバムを検索"
        className={[seachToggle ? searchOpen.showed : searchOpen.base]}
      />
      <span
        onClick={() => setSearchToggle(!seachToggle)}
        className="px-2 py-1 text-white"
      >
        <BsSearch />
      </span>
    </button>
  );
};
