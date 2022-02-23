import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Tab } from "../tabs/Tab";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";

export const AddBookModal = memo(
  ({ toggle, insertItem, responseMsg, bookListItems, setBookListItems }) => {
    // props
    const { responseMsgShow, setResponseMsgShow } = responseMsg;
    const { modalToggle, setModalToggle } = toggle;
    const { setBookName, setCoverImage, setCategory } = setBookListItems;
    const { bookName, coverImage, category } = bookListItems;
    // カスタムフック
    const { modals, messageWindow } = useStyle();
    const { modalAnimation, modalWindowAnimation, modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;

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
                  onChange={(e) => {
                    setBookName(e.target.value);
                    setResponseMsgShow(false);
                  }}
                  className={[
                    responseMsgShow
                      ? errorBorderMsg.showed
                      : errorBorderMsg.base,
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
                    hidden={"hidden"}
                    animation={modalTabAnimation}
                    ulClass={"my-2 space-x-2 space-y-2"}
                    setCategory={setCategory}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* 追加ボタン */}
        <button
          onClick={insertItem}
          className="absolute bottom-3 rounded-sm bg-blue-600 bg-opacity-80 px-3 py-2 font-bold text-white"
        >
          本を追加する
        </button>
        {/* 閉じるボタン */}
        <span
          className="absolute bottom-0 right-0 inline-block p-4 text-4xl text-white hover:bg-white hover:bg-opacity-40"
          onClick={() => {
            setModalToggle(false);
            setResponseMsgShow(false);
            setCategory("家族")
            setBookName("")
          }}
        >
          <AiOutlinePlus className="rotate-45 transform" />
        </span>
      </div>
    );
  }
);
