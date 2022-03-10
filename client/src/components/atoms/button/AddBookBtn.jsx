import { memo, useContext } from "react";
// アイコン
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Context } from "../../../App";

export const AddBookBtn = memo(({ setModalToggle }) => {
  // コンテキスト
  const { setMenuToggle, setSearchToggle, setHeaderToggle } =
    useContext(Context);

  const modalToggle = () => {
    setModalToggle(true);
    // 初期化
    setSearchToggle(false);
    setHeaderToggle(false);
    setMenuToggle(false);
  };

  return (
    <>
      <div className="transform rounded-full">
        <label className="mx-2 flex items-center justify-center rounded-full border border-gray-300 bg-white p-1 shadow-md">
          <button
            onClick={modalToggle}
            className="text-2xl font-bold text-slate-500"
          >
            <AiOutlinePlus className="transform transition-transform duration-700 hover:rotate-45" />
          </button>
        </label>
      </div>
    </>
  );
});
