import { memo, useState } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Tab } from "../tabs/Tab";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";
import { useContext } from "react";
// コンテキスト
import { TabContext } from "../../pages/Content";

export const AddBookModal = memo(
  ({ toggle, insertItem, msgShow, bookListItems, setBookListItems }) => {
    // props
    const { errMsgToggle, setErrMsgToggle } = msgShow;
    const { modalToggle, setModalToggle } = toggle;
    const { setBookName, setCoverImage, setCategory } = setBookListItems;
    const { bookName, coverImage, category } = bookListItems;
    // カスタムフック
    const { modals, messageWindow } = useStyle();
    const { modalAnimation, modalWindowAnimation, modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;
    // コンテキスト
    const { defaultIndex, setDefaultIndex } = useContext(TabContext);

    const inputInform = (e) => {
      setBookName(e.target.value);
      setErrMsgToggle(false);
    };

    const closeButton = () => {
      setModalToggle(false);
      setErrMsgToggle(false);
      setCategory("家族");
      setBookName("");
      setDefaultIndex(true);
    };

    return (
      <div
        className={[modalToggle ? modalAnimation.showed : modalAnimation.base]}
      >
        <div
          className={[
            modalToggle
              ? modalWindowAnimation.showed
              : modalWindowAnimation.base,
          ]}
        >
          <div className="flex h-[98%] w-[80%] flex-col items-center">
            <div className="my-10 flex flex-col">
              <div className="mb-4">
                <p className="mb-2 border-b text-lg font-bold text-slate-500">
                  本のタイトル
                </p>
                <input
                  type="text"
                  value={bookName}
                  autoFocus
                  placeholder="本のタイトルを入力"
                  onChange={inputInform}
                  className={[
                    errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base,
                  ]}
                />
              </div>
              <div className="mb-4">
                <p className="mb-2 border-b text-lg font-bold text-slate-500">
                  表紙
                </p>
                <ImageUrlCreate
                  className={"inline-block h-52 w-full bg-gray-100"}
                />
              </div>
              <div>
                <p className="border-b text-lg font-bold text-slate-500">
                  カテゴリー
                </p>
                <div className="mt-4 mb-10">
                  <Tab
                    animation={modalTabAnimation}
                    ulClass={"my-2 space-x-2 space-y-2"}
                    setCategory={setCategory}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <>
          {/* 追加ボタン */}
          <button
            onClick={insertItem}
            className="absolute bottom-3 rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 font-bold text-white"
          >
            本を追加する
          </button>
          {/* 閉じるボタン */}
          <button
            className="absolute bottom-0 right-0 p-4 text-4xl text-white hover:bg-white hover:bg-opacity-40"
            onClick={closeButton}
          >
            <AiOutlinePlus className="rotate-45 transform" />
          </button>
        </>
      </div>
    );
  }
);
