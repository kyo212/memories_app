import { useState } from "react";
// サードパーティ
import { VscTriangleDown } from "react-icons/vsc";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const MenuOpenModal = ({ loginUser }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;
  return (
    <>
      <VscTriangleDown
        onClick={() => setModalToggle(!modalToggle)}
        className={[
          modalToggle ? menuOpenBtnAnimation.showed : menuOpenBtnAnimation.base,
        ]}
      />
      <div
        className={[
          modalToggle ? menuOpenAnimation.showed : menuOpenAnimation.base,
        ]}
      >
        <button
          onClick={() => setModalToggle(false)}
          className="space-y-2 text-left"
        >
          <p className="text-md font-bold text-slate-700">
            "{loginUser}"
            <span className="text-md font-thin">でログイン中</span>
          </p>
          <p>並び替え</p>
          <p>フィルタを適用</p>
          <p>ヘルプ</p>
        </button>
      </div>
    </>
  );
};
