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
            <div className="w-full border-b pb-3 leading-8 text-slate-700">
              <p className="text-md font-bold">
                "{loginUser}"
                <span className="text-md font-thin">でログイン中</span>
              </p>
              <button className="text-blue-600">ユーザー名を変更</button>
            </div>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>並び替え</p>
            </button>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>フィルタを適用</p>
            </button>
            <button className="w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200">
              <p>ヘルプ</p>
            </button>
            <div className="flex h-14 w-full items-center justify-between border-t pt-5">
              <HeaderLogoutBtn />
              <button className="mx-4 text-sm text-red-600">
                アカウントを削除
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
