import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Tab } from "../tabs/Tab";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";
import { useContext } from "react";
// コンテキスト
import { Context } from "../../../App";

export const AddBookModal = memo(
  ({
    toggle,
    getImage,
    insertItem,
    msgShow,
    bookListItems,
    setBookListItems,
  }) => {
    // props
    const { errMsgToggle, setErrMsgToggle } = msgShow;
    const { modalToggle, setModalToggle } = toggle;
    const { setBookTitle, setCategory } = setBookListItems;
    const { bookName } = bookListItems;
    // カスタムフック
    const { modals, messageWindow } = useStyle();
    const { modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;
    // コンテキスト
    const { modalImageUrl, setDefaultIndex, setModalImageUrl } =
      useContext(Context);

    // 共通化
    const textStyle =
      "h-20 select-none text-lg font-bold leading-[80px] text-slate-500";

    const inputInform = (e) => {
      setBookTitle(e.target.value);
      setErrMsgToggle(false);
    };

    const closeButton = () => {
      setModalToggle(false);
      setErrMsgToggle(false);
      setCategory("diary");
      setBookTitle("");
      setDefaultIndex(true);
      setModalImageUrl("");
    };

    return (
      <>
        {modalToggle && (
          <div className="fixed top-0 left-0 z-50 h-screen w-screen overflow-y-scroll bg-white">
            <div className="mt-[4%] mb-[40%]">
              <div className="flex w-full flex-col items-center">
                <p className={textStyle}>本のタイトル</p>
                <input
                  type="text"
                  value={bookName}
                  autoFocus
                  placeholder="本のタイトルを入力"
                  onChange={inputInform}
                  className={[
                    `${
                      errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base
                    } w-[280px] border-slate-200`,
                  ]}
                />
              </div>
              <div className="flex w-full flex-col items-center">
                <p className={textStyle}>フォトブックの表紙</p>
                <ImageUrlCreate
                  imageUrl={modalImageUrl}
                  acceptType="image/*"
                  imageStyle="inline-block h-[220px] w-[285px] border shadow-md"
                />
              </div>
              <div className="flex w-full flex-col items-center">
                <p className={textStyle}>カテゴリー</p>
                <div className="mb-10 w-[280px]">
                  <Tab
                    animation={modalTabAnimation}
                    ulClass=""
                    setCategory={setCategory}
                  />
                </div>
                {/* 追加ボタン */}
                <button
                  onClick={insertItem}
                  className="rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 font-bold text-white"
                >
                  本を追加する
                </button>
              </div>
            </div>
            {/* 閉じるボタン */}
            <button
              className="fixed right-0 bottom-0 p-4 text-4xl text-gray-600 hover:bg-black hover:bg-opacity-40 hover:text-white"
              onClick={closeButton}
            >
              <AiOutlinePlus className="rotate-45 transform" />
            </button>
          </div>
        )}
      </>
    );
  }
);
