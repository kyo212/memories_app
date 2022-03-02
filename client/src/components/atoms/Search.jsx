import { useState } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Search = () => {
  // カスタムフック
  const { searchOpen } = useStyle();
  // Toggle
  const [searchToggle, setSearchToggle] = useState(false);

  return (
    <button
      className={`${[
        searchToggle && "bg-gray-500 text-white ",
      ]} flex items-center rounded-full border border-gray-500 text-gray-500`}
    >
      <input
        type="text"
        placeholder="アルバムを検索"
        className={[searchToggle ? searchOpen.showed : searchOpen.base]}
      />
      <span
        onClick={() => setSearchToggle(!searchToggle)}
        className="px-2 py-1"
      >
        <BsSearch />
      </span>
    </button>
  );
};
