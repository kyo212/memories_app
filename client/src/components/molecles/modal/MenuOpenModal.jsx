import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import { VscTriangleDown } from "react-icons/vsc";
import { BsBoxArrowUpRight, BsSortDown } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsCaretRightFill } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsBookmark } from "react-icons/bs";
import { BsSortUpAlt } from "react-icons/bs";
import { BsSortUp } from "react-icons/bs";
import { SuccessIcon } from "../../atoms/icon/SuccessIcon";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// コンポーネント
import { HeaderLogoutBtn } from "../../atoms/button/HeaderLogoutBtn";
import { Tab } from "../tabs/Tab";
// コンテキスト
import { Context } from "../../../App";

export const MenuOpenModal = ({
  loginUser,
  root,
  rootText,
  setUpdate,
  sortToggle,
  setSortToggle,
  showMenu,
}) => {
  // ルータ
  const navigate = useNavigate();
  // Toggle
  const [fillterMenu, setFillterMenu] = useState(false);
  const [sortMenu, setSortMenu] = useState(false);
  // カスタムフック
  const { menuOpens, modals } = useStyle();
  const { fillterMenuTabAnimation } = modals;
  const { menuOpenBtnAnimation, menuOpenAnimation } = menuOpens;
  // コンテキスト
  const {
    menuToggle,
    setMenuToggle,
    setSearchToggle,
    setHeaderToggle,
    fillterToggle,
    setFillterToggle,
    fillterCategory,
    setFillterCategory,
  } = useContext(Context);

  // スタイル共通化
  const menuListStyle =
    "w-full bg-opacity-50 px-1 py-2 text-left hover:bg-gray-200 flex items-center";

  const menuModalToggle = () => {
    setMenuToggle(!menuToggle);
    setSearchToggle(false);
    setHeaderToggle(false);
    setFillterMenu(false);
  };

  const bookFillter = (e) => {
    e.target.id === "favorite" && setFillterCategory("1");
    setFillterToggle(true); // フィルターを適用する
  };

  const filterMenuToggle = () => {
    setFillterMenu(!fillterMenu);
    setSortMenu(false);
  };

  const bookSort = () => {
    setSortToggle(!sortToggle);
    setUpdate((update) => !update);
  };

  const sortMenuToggle = () => {
    setSortMenu(!sortMenu);
    setFillterMenu(false);
  };

  const toPublicComponent = () => {
    navigate(`${root}`);
    setMenuToggle(false);
  };

  return (
    <>
      <div
        onClick={menuModalToggle}
        className={[
          menuToggle
            ? "absolute top-0 left-0 h-screen w-screen opacity-0"
            : "hidden",
        ]}
      />

      <button
        onClick={menuModalToggle}
        className={[
          menuToggle
            ? `${menuOpenBtnAnimation.showed} rotate-180 transform`
            : menuOpenBtnAnimation.base,
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
                "{loginUser || "gestuser"}"
                <span className="text-md font-thin">でログイン中</span>
              </p>
              {showMenu && (
                <button className="text-blue-600">ユーザー名を変更</button>
              )}
            </div>

            <button onClick={sortMenuToggle} className={menuListStyle}>
              <div className="flex items-center">
                <div className="ml-2 flex items-center">
                  {sortMenu ? ( // フィルタが適用されていないとき、フィルタメニューがtrueなら
                    <BsCaretRightFill className="mr-2 rotate-90 transform" />
                  ) : (
                    <BsCaretRightFill className="mr-2" />
                  )}
                  <p>並び替えをする</p>
                </div>
              </div>
            </button>

            <div
              className={[
                sortMenu
                  ? "flex h-20 transform flex-col items-start  border border-slate-100 p-3 transition-all duration-300"
                  : "h-0 transform transition-all duration-300",
              ]}
            >
              <div
                className={[sortMenu ? "flex flex-col items-start" : "hidden"]}
              >
                <div className="flex flex-col">
                  <div className="w-18 mb-2 flex items-center font-bold">
                    {sortToggle ? (
                      <span>日付の降順</span>
                    ) : (
                      <span>日付の昇順</span>
                    )}
                  </div>
                  <button onClick={bookSort} className="flex">
                    <span className="mx-2 text-xl">
                      {sortToggle ? <BsSortUp /> : <BsSortDown />}
                    </span>

                    {sortToggle ? (
                      <span>日付昇順にする</span>
                    ) : (
                      <span>日付降順にする</span>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button onClick={filterMenuToggle} className={menuListStyle}>
              <div className="flex items-center">
                <div className="ml-2 flex items-center">
                  {sortMenu ? ( // フィルタが適用されていないとき、フィルタメニューがtrueなら
                    <BsCaretRightFill className="mr-2 rotate-90 transform" />
                  ) : (
                    <BsCaretRightFill className="mr-2" />
                  )}
                  <p>絞り込みを適用</p>
                  {fillterToggle && ( // フィルタが適用されているときのみ
                    <span
                      onClick={() => setFillterToggle(false)}
                      className="mx-2 border-b font-bold text-red-600"
                    >
                      解除
                    </span>
                  )}
                </div>
              </div>
            </button>
            <div
              className={[
                fillterMenu
                  ? "flex h-40 transform flex-col items-start  border border-slate-100 p-1 transition-all duration-300"
                  : "h-0 transform transition-all duration-300",
              ]}
            >
              <button
                id="favorite"
                onClick={bookFillter}
                className={[fillterMenu ? "my-2 flex items-center" : "hidden"]}
              >
                {fillterCategory === "1" ? ( // お気に入り状態である場合
                  <>
                    <span className="mr-2 text-2xl text-red-500">
                      <BsFillBookmarkFill />
                    </span>
                    おきにいりのみ
                  </>
                ) : (
                  <>
                    <span className="mr-2 text-2xl">
                      <BsBookmark />
                    </span>
                    おきにいりのみ
                  </>
                )}
              </button>
              <div onClick={bookFillter} className={[!fillterMenu && "hidden"]}>
                <Tab
                  animation={fillterMenuTabAnimation}
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
            <button onClick={toPublicComponent} className={menuListStyle}>
              <span className="text-md mx-2">
                <BsBoxArrowUpRight />
              </span>
              {rootText}
            </button>
            {showMenu && (
              <div className="flex h-14 w-full items-center justify-between border-t pt-5">
                <HeaderLogoutBtn />
                <button className="mx-4 text-sm text-red-600">
                  アカウントを削除
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
