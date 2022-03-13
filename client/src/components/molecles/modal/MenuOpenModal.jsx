import { useContext, useState } from "react";
// アイコン
import { VscTriangleDown } from "react-icons/vsc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// コンポーネント
import { HeaderLogoutBtn } from "../../atoms/button/HeaderLogoutBtn";
import { Tab } from "../tabs/Tab";
// コンテキスト
import { Context } from "../../../App";

export const MenuOpenModal = ({ loginUser }) => {
  // カテゴリー
  const [category, setCategory] = useState("");
  // カスタムフック
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;
  // コンテキスト
  const { menuToggle, setMenuToggle, setSearchToggle, setHeaderToggle } =
    useContext(Context);

  console.log(category);

  // スタイル共通化
  const menuListStyle =
    "w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200 flex items-center";

  const modalOpenClose = () => {
    setMenuToggle(!menuToggle);
    setSearchToggle(false);
    setHeaderToggle(false);
  };

  return (
    <>
      <button
        onClick={modalOpenClose}
        className={[
          menuToggle ? menuOpenBtnAnimation.showed : menuOpenBtnAnimation.base,
        ]}
      >
        <VscTriangleDown className="scale-125 transform" />
      </button>
      {menuToggle && (
        <div
          className={[
            menuToggle ? menuOpenAnimation.showed : menuOpenAnimation.base,
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
            {/* <button onClick={} className={menuListStyle}>
              <p>並び替え</p>
            </button>
            <div className="">
              <button>昇順</button>
              <button>降順</button>
              </div> */}
            <button className={menuListStyle}>
              <p>フィルタを適用</p>
            </button>
            <div className="flex flex-col items-start">
              <button>おきにいりのみ</button>
              <Tab animation={""} ulClass={"flex flex-wrap"} setCategory={setCategory} />
            </div>
            <button className={menuListStyle}>
              <span className="text-md mx-2">
                <BsQuestionCircle />
              </span>
              <p>ヘルプ</p>
            </button>
            <button className={menuListStyle}>
              <span className="text-md mx-2">
                <BsBoxArrowUpRight />
              </span>
              みんなの本を見る
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
