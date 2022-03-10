import { useContext, memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// アイコン
import { AiOutlinePlus } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
// コンポーネント
import { Tab } from "../tabs/Tab";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";
import { Button } from "../../atoms/button/Button";
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
    // Contentからのprops
    const { errMsgToggle, setErrMsgToggle } = msgShow;
    const { modalToggle, setModalToggle } = toggle;
    const { bookTitle, category } = bookListItems;
    const { setBookTitle, setCategory } = setBookListItems;
    // カスタムフック
    const { modals, messageWindow } = useStyle();
    const { modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;
    // コンテキスト
    const { imageUrl, setDefaultIndex, setImageUrl } = useContext(Context);

    const inputInform = (e) => {
      // 情報の保持
      setBookTitle(e.target.value);
      // Toggle
      setErrMsgToggle(false);
    };

    const closeButton = () => {
      // 初期化
      setCategory("diary");
      setDefaultIndex(true);
      setBookTitle("");
      setImageUrl("");
      // Toggle
      setModalToggle(false);
      setErrMsgToggle(false);
    };

    return (
      <>
        {/* {modalToggle && ( */}
        <div
          className={`${[
            modalToggle
              ? " fixed top-0 left-0 z-50 h-screen w-screen overflow-y-scroll opacity-100"
              : "-z-50 -translate-y-full opacity-0",
          ]} transform bg-white transition-all duration-500`}
        >
          <div className="mb-[40%]">
            <div className="flex w-full flex-col items-center space-y-4">
              <p className="h-12 select-none text-lg font-bold leading-[80px] text-slate-500">
                本の表紙をつくる
              </p>
              
              <div className="">
                {/* タイトルバリデーション */}
                {errMsgToggle && !bookTitle && (
                  <p className="text-sm text-red-600">
                    タイトルを入力してください
                  </p>
                )}
                <input
                  type="text"
                  value={bookTitle}
                  autoFocus
                  placeholder="本のタイトルを入力"
                  onChange={inputInform}
                  className={[
                    `${
                      errMsgToggle && !bookTitle
                        ? errorBorderMsg.showed
                        : errorBorderMsg.base
                    } w-[280px] focus:border-sky-600`,
                  ]}
                />
              </div>

              <div className="relative">
                {!imageUrl && ( // 画像を設定されていない時だけ
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border p-4 text-xl text-slate-500">
                    <BsUpload />
                  </div>
                )}
                {/* 表紙バリデーション */}
                {errMsgToggle && !imageUrl && (
                  <p className="text-sm text-red-600">
                    表紙の画像を設定してください
                  </p>
                )}
                <label onClick={() => setErrMsgToggle(false)}>
                  <ImageUrlCreate
                    imageUrl={imageUrl}
                    acceptType="image/*"
                    video={{
                      videoUrl: "",
                      videoAutoPlay: false,
                      videoCtrl: false,
                      videoLoop: false,
                    }}
                    imageStyle={`${[
                      errMsgToggle && !imageUrl && "border-red-400",
                    ]} inline-block border shadow-md h-[215px] w-[260px] `}
                  />
                </label>
              </div>

              <div className="w-full text-sm">
                <Tab
                  animation={modalTabAnimation}
                  ulClass=""
                  setCategory={setCategory}
                />
              </div>
            </div>
            <div className="flex w-full flex-col items-center">
              {/* 追加ボタン */}
              <div className="w-[75%]">
                <Button clickBtn={insertItem}>本を追加する</Button>
              </div>
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
        {/* )} */}
      </>
    );
  }
);
