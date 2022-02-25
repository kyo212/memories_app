import { useState } from "react";
// サードパーティ
import { VscTriangleDown } from "react-icons/vsc";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// コンポーネント
import { HeaderLogoutBtn } from "../../atoms/button/HeaderLogoutBtn";

export const MenuOpenModal = ({ loginUser }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;

  const modalOpenClose = () => {
    setModalToggle(!modalToggle);
  };

  return (
    <>
      <span
        className={[
          modalToggle ? menuOpenBtnAnimation.showed : menuOpenBtnAnimation.base,
        ]}
      >
        <VscTriangleDown onClick={modalOpenClose} className="transform scale-125"/>
      </span>
      <div
        className={[
          modalToggle ? menuOpenAnimation.showed : menuOpenAnimation.base,
        ]}
      >
        <div className="flex flex-col items-start space-y-4 text-left">
          <p className="text-md font-bold text-slate-700">
            "{loginUser}"<span className="text-md font-thin">でログイン中</span>
          </p>
          <button>
            <p>並び替え</p>
          </button>
          <button>
            <p>フィルタを適用</p>
          </button>
          <button>
            <p>ヘルプ</p>
          </button>
          <HeaderLogoutBtn />
          <button onClick={modalOpenClose}>
            <p>閉じる</p>
          </button>
        </div>
      </div>
    </>
  );
};
