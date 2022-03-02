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
    const { setBookName, setCategory } = setBookListItems;
    const { bookName } = bookListItems;
    // カスタムフック
    const { modals, messageWindow } = useStyle();
    const { modalAnimation, modalWindowAnimation, modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;
    // コンテキスト
    const { modalImageUrl, setDefaultIndex, setModalImageUrl } =
      useContext(Context);

    const inputInform = (e) => {
      setBookName(e.target.value);
      setErrMsgToggle(false);
    };

    const closeButton = () => {
      setModalToggle(false);
      setErrMsgToggle(false);
      setCategory("日記");
      setBookName("");
      setDefaultIndex(true);
      setModalImageUrl("");
    };

    return (
      <>
        {modalToggle && (
          <div className="fixed top-0 left-0 z-40 flex h-screen w-screen transform items-center justify-center overflow-hidden bg-black bg-opacity-80 pt-2 transition-all duration-300 ease-in">
            <div className="flex h-[75%] w-[92%] transform items-center justify-center overflow-scroll rounded-sm bg-white py-6 opacity-100 transition-all duration-1000">
              <div className="flex w-[88%] flex-col items-center pt-40">
                <>
                  <p className="mb-2 select-none text-lg font-bold text-slate-500">
                    本のタイトル
                  </p>
                  <input
                    type="text"
                    value={bookName}
                    autoFocus
                    placeholder="本のタイトルを入力"
                    onChange={inputInform}
                    className={[
                      `${
                        errMsgToggle
                          ? errorBorderMsg.showed
                          : errorBorderMsg.base
                      } w-[280px] border-slate-200`,
                    ]}
                  />
                </>
                <div className="m-8 items-center">
                  <p className="mb-2 select-none text-center text-lg font-bold text-slate-500">
                    フォトブックの表紙
                  </p>
                  <ImageUrlCreate
                    coverImage={modalImageUrl}
                    imageStyle="inline-block h-[260px] w-[285px] border shadow-md"
                  />
                </div>
                <>
                  <p className="select-none text-lg font-bold text-slate-500">
                    カテゴリー
                  </p>
                  <div className="mt-4 mb-10">
                    <Tab
                      animation={modalTabAnimation}
                      ulClass="my-2"
                      setCategory={setCategory}
                    />
                  </div>
                </>
                <>
                  {/* 追加ボタン */}
                  <button
                    onClick={insertItem}
                    className="rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 mb-10 font-bold text-white"
                  >
                    本を追加する
                  </button>
                </>
              </div>
            </div>
            {/* 閉じるボタン */}
            <button
              className="fixed right-[4%] bottom-[12.3%] p-4 text-4xl text-gray-600 hover:bg-black hover:bg-opacity-40 hover:text-white"
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
