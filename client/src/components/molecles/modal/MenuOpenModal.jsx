import { useContext } from "react";
// サードパーティ
import { VscTriangleDown } from "react-icons/vsc";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// コンポーネント
import { HeaderLogoutBtn } from "../../atoms/button/HeaderLogoutBtn";
// コンテキスト
import { Context } from "../../../App";

export const MenuOpenModal = ({ loginUser }) => {
  // カスタムフック
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;
  // コンテキスト
  const { modalToggle, setModalToggle, setSearchToggle, setHeaderToggle } =
    useContext(Context);

  const modalOpenClose = () => {
    setModalToggle(!modalToggle);
    setSearchToggle(false);
    setHeaderToggle(false);
  };

  return (
    <>
      <button
        onClick={modalOpenClose}
        className={[
          modalToggle ? menuOpenBtnAnimation.showed : menuOpenBtnAnimation.base,
        ]}
      >
        <VscTriangleDown className="scale-125 transform" />
      </button>
      {modalToggle && (
        <div
          className={[
            modalToggle ? menuOpenAnimation.showed : menuOpenAnimation.base,
          ]}
        >
          <div className="flex w-full flex-col space-y-4 text-left">
            <p className="text-md w-full border-b pb-3 font-bold text-slate-700">
              "{loginUser}"
              <span className="text-md font-thin">でログイン中</span>
            </p>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>並び替え</p>
            </button>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>フィルタを適用</p>
            </button>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>ヘルプ</p>
            </button>
            <div className="w-full h-14 border-t pt-5 flex items-center">
              <HeaderLogoutBtn />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
