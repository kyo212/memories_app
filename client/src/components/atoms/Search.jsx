import { useContext } from "react";
// アイコン
import { BsSearch } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Search = () => {
  // カスタムフック
  const { searchOpen } = useStyle();
  // コンテキスト
  const { searchToggle, setSearchToggle, setMenuToggle, setHeaderToggle } =
    useContext(Context);

  const searchOpenClose = () => {
    setSearchToggle(!searchToggle);
    setMenuToggle(false);
    setHeaderToggle(false);
  };

  return (
    <button
      className={`${[
        searchToggle ? "bg-gray-500 text-white" : "text-gray-500 bg-white shadow-md",
      ]} flex items-center rounded-full border border-gray-300`}
    >
      <input
        type="search"
        placeholder="アルバムを検索"
        className={[searchToggle ? searchOpen.showed : searchOpen.base]}
      />
      <span onClick={searchOpenClose} className="px-2 py-1">
        <BsSearch />
      </span>
    </button>
  );
};
