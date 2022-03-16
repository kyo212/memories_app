import { memo, useContext } from "react";
// アイコン
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Context } from "../../../App";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const AddBookBtn = memo(({ setModalToggle }) => {
  // カスタムフック
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation } = menuOpens;
  // コンテキスト
  const { modalToggle, setMenuToggle, setSearchToggle, setHeaderToggle } =
    useContext(Context);

  const modalMenuToggle = () => {
    setModalToggle(true);
    // 初期化
    setSearchToggle(false);
    setHeaderToggle(false);
    setMenuToggle(false);
  };

  return (
    <>
      <button
        onClick={modalMenuToggle}
        className={[
          modalToggle ? menuOpenBtnAnimation.showed : menuOpenBtnAnimation.base,
        ]}
      >
        <AiOutlinePlus />
      </button>
    </>
  );
});
