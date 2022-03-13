import { useContext, useState } from "react";
// アイコン
import { VscTriangleDown } from "react-icons/vsc";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// コンポーネント
import { HeaderLogoutBtn } from "../../atoms/button/HeaderLogoutBtn";
import { Tab } from "../tabs/Tab";
// コンテキスト
import { Context } from "../../../App";

export const MenuOpenModal = ({ loginUser }) => {
  // カテゴリー
  const [fillterMenu, setFillterMenu] = useState(false);
  // カスタムフック
  const { menuOpens } = useStyle();
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;
  // コンテキスト
  const {
    menuToggle,
    setMenuToggle,
    setSearchToggle,
    setHeaderToggle,
    fillterToggle,
    setFillterToggle,
    setFillterCategory,
  } = useContext(Context);

  // スタイル共通化
  const menuListStyle =
    "w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200 flex items-center";

  const menuModalToggle = () => {
    setMenuToggle(!menuToggle);
    setSearchToggle(false);
    setHeaderToggle(false);
  };

  const bookFillter = (e) => {
    e.target.id === "favorite" && setFillterCategory("1");
    setFillterToggle(true);
  };

  const filterMenuToggle = () => {
    setFillterMenu(!fillterMenu);
  };

  return (
    <>
      <button
        onClick={menuModalToggle}
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
          <div className="flex w-full flex-col text-left">
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
            <button onClick={filterMenuToggle} className={menuListStyle}>
              <>
                <span
                  className={[
                    fillterMenu ? "mx-2 rotate-90 transform" : "mx-2",
                  ]}
                >
                  <BsCaretRightFill />
                </span>
                {fillterToggle ? (
                  <p className="font-bold text-green-700">フィルタを適用中</p>
                ) : (
                  <p>フィルタを適用</p>
                )}
              </>
            </button>
            <div
              className={[
                fillterMenu
                  ? "flex h-32 transform flex-col items-start transition-all duration-300"
                  : "h-0 transform transition-all duration-300",
              ]}
            >
              {fillterToggle && ( // フィルタが適用されているときのみ
                <button
                  onClick={() => setFillterToggle(false)}
                  className={[
                    fillterMenu
                      ? "ml-2 rounded-full border border-slate-600 px-2"
                      : "hidden",
                  ]}
                >
                  解除
                </button>
              )}
              <button
                id="favorite"
                onClick={bookFillter}
                className={[!fillterMenu && "hidden"]}
              >
                おきにいりのみ
              </button>
              <div onClick={bookFillter} className={[!fillterMenu && "hidden"]}>
                <Tab
                  animation={""}
                  ulClass={"flex flex-wrap"}
                  setCategory={setFillterCategory}
                />
              </div>
            </div>
            <button className={menuListStyle}>
              <span className="text-md mx-2">
                <BsQuestionCircle />
              </span>
              <p>このアプリの使い方</p>
            </button>
            <button className={menuListStyle}>
              <span className="text-md mx-2">
                <BsBoxArrowUpRight />
              </span>
              みんなの本を見にいく
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
