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
import { useSegment } from "../../custom/useSegment";

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
    const { bookTitle } = bookListItems;
    const { setBookTitle, setCategory } = setBookListItems;
    // カスタムフック
    const { countGrapheme } = useSegment();
    const { modals, messageWindow } = useStyle();
    const { modalTabAnimation } = modals;
    const { errorBorderMsg } = messageWindow;
    // コンテキスト
    const { imageUrl, setDefaultIndex, setImageUrl } = useContext(Context);

    const inputInform = (e) => {
      const value = e.target.value;
      const num = countGrapheme(value);
      if (num <= 12) {
        setBookTitle(value);
      }
      // 追加時に足りない情報があった場合に出るエラーの際、情報を入力し始めたらエラーメッセージをオフにする
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

    const clickAddScroll = () => {
      insertItem();
      document.getElementById("main").scrollTop = 0;
    };

    return (
      <>
        <div
          id="main"
          className={`${[
            modalToggle
              ? " fixed top-0 left-0 z-50 h-screen w-screen overflow-y-scroll opacity-100"
              : "hidden",
          ]} transform bg-white transition-all duration-500`}
        >
          <div id="modal" className="mt-[60px] mb-[150px]">
            <div className="flex w-full flex-col items-center space-y-4">
              <div className="relative">
                {/* タイトルバリデーション */}
                {errMsgToggle && !bookTitle && (
                  <p className="flex text-sm text-red-600">
                    タイトルを入力してください
                  </p>
                )}
                <label className="flex flex-col">
                  {!errMsgToggle && (
                    <p className="text-sm font-bold text-slate-700">
                      フォトブックのタイトル
                    </p>
                  )}
                  <input
                    type="text"
                    value={bookTitle}
                    autoFocus
                    placeholder="フォトブックのタイトルを入力"
                    onChange={inputInform}
                    className={[
                      `${
                        errMsgToggle && !bookTitle
                          ? errorBorderMsg.showed
                          : errorBorderMsg.base
                      } w-[260px] focus:border-sky-600 md:w-[440px]`,
                    ]}
                  />
                </label>
                <div className="flex justify-end">
                  {bookTitle.length === 12 && (
                    <p className="text-sm text-red-600">
                      タイトルは12文字が最大です。
                    </p>
                  )}
                  <p className="ml-8 text-sm text-slate-500">
                    {bookTitle.length}/12
                  </p>
                </div>
              </div>

              <div className="relative">
                {!imageUrl && ( // 画像を設定されていない時だけアップロードボタンを表示
                  <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border p-4 text-xl text-slate-500">
                    <BsUpload />
                  </div>
                )}
                {/* エラーバリデーション */}
                {errMsgToggle && !imageUrl && (
                  <p className="flex text-sm text-red-600">
                    表紙の画像を設定してください
                  </p>
                )}
                <label
                  onClick={() => setErrMsgToggle(false)}
                  className="flex flex-col"
                >
                  {!errMsgToggle && (
                    <p className="text-sm font-bold text-slate-700">
                      表紙を選ぶ
                    </p>
                  )}
                  <ImageUrlCreate
                    imageUrl={imageUrl}
                    imageSize={`${[
                      errMsgToggle && !imageUrl && "border-red-400",
                    ]} inline-block border h-[215px] w-[260px] md:w-[440px] md:h-[395px]`}
                    imageStyle="h-full w-full object-cover"
                    acceptType="image/*"
                    disabled={false}
                    video={{
                      videoUrl: "",
                      videoAutoPlay: false,
                      videoCtrl: false,
                      videoLoop: false,
                    }}
                  />
                </label>
              </div>

              <div className="w-[260px] text-sm md:w-[440px]">
                <label className="flex flex-col">
                  <p className="text-sm font-bold text-slate-700">
                    カテゴリーを選ぶ
                  </p>
                  <Tab
                    animation={modalTabAnimation}
                    ulClass="flex flex-wrap items-center justify-center text-center"
                    setCategory={setCategory}
                  />
                </label>
              </div>
            </div>
            <div className="mt-7 flex w-full flex-col items-center">
              <div className="w-[240px] ">
                {/* 追加ボタン */}
                <Button clickBtn={clickAddScroll}>
                  フォトブックを追加する
                </Button>
              </div>
            </div>
          </div>
          {/* 閉じるボタン */}
          <button
            className="absolute right-0 top-0 p-3 text-4xl text-gray-600 hover:bg-black hover:bg-opacity-40 hover:text-white"
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
