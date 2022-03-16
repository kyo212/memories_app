import { memo, useContext, useState } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Search = memo(({ searchInput, setSearchInput }) => {
  // カスタムフック
  const { searchOpen } = useStyle();
  // コンテキスト
  const { searchToggle, setSearchToggle, setMenuToggle, setHeaderToggle } =
    useContext(Context);

  const searchClickToggle = () => {
    setSearchToggle(!searchToggle);
    setMenuToggle(false);
    setHeaderToggle(false);
    setSearchInput("")
  };

  const searchFunction = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div
      className={`${[
        searchToggle
          ? "bg-gray-500 text-white"
          : "bg-white text-gray-500 shadow-md",
      ]} flex items-center rounded-full border border-gray-300`}
    >
      <input
        type="search"
        value={searchInput}
        placeholder="タイトルを検索"
        onChange={searchFunction}
        className={[searchToggle ? searchOpen.showed : searchOpen.base]}
      />
      <button onClick={searchClickToggle} className="px-2 py-1">
        <BsSearch />
      </button>
    </div>
  );
});
