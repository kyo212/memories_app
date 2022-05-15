import { memo, useContext, useState } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Search = memo(({ placeholder, searchText, setSearchText }) => {
  // カスタムフック
  const { searchOpen, menuOpens } = useStyle();
  const { menuOpenBtnAnimation } = menuOpens;
  // コンテキスト
  const { searchToggle, setSearchToggle, setMenuToggle, setHeaderToggle } =
    useContext(Context);

  const searchClickToggle = () => {
    setSearchToggle(!searchToggle);
    setMenuToggle(false);
    setHeaderToggle(false);
    setSearchText("");
  };

  const searchFunction = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div
        onClick={searchClickToggle}
        className={[
          searchToggle
            ? "absolute top-0 left-0 h-screen w-screen opacity-0"
            : "hidden",
        ]}
      />
      <div className="relative flex">
        <div>
          <input
            type="search"
            value={searchText}
            placeholder={placeholder}
            autoFocus
            onChange={searchFunction}
            className={`${[
              searchToggle ? searchOpen.showed : searchOpen.base,
            ]} focus:border-sky-600`}
          />
        </div>
        <button
          onClick={searchClickToggle}
          className={[
            searchToggle
              ? menuOpenBtnAnimation.showed
              : menuOpenBtnAnimation.base,
          ]}
        >
          <BsSearch />
        </button>
      </div>
    </>
  );
});
