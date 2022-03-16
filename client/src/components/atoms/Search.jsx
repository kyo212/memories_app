import { memo, useContext, useState } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Search = memo(({ placeholder, searchInput, setSearchInput }) => {
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
    setSearchInput("");
  };

  const searchFunction = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className="relative flex">
      <div>
        <input
          type="search"
          value={searchInput}
          placeholder={placeholder}
          autoFocus
          onChange={searchFunction}
          className={[searchToggle ? searchOpen.showed : searchOpen.base]}
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
  );
});
