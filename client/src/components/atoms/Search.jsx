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
    <button
      className=" 
    flex items-center rounded-full border border-gray-500 text-gray-500"
    >
      <input
        type="text"
        placeholder="アルバムを検索"
        className={[seachToggle ? searchOpen.showed : searchOpen.base]}
      />
      <span onClick={() => setSearchToggle(!seachToggle)} className="px-2 py-1">
        <BsSearch />
      </span>
    </button>
  );
};
