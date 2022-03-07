import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import { BsReply } from "react-icons/bs";
import { BsReplyFill } from "react-icons/bs";
import { BsChevronCompactLeft } from "react-icons/bs";
import { BsChevronCompactRight } from "react-icons/bs";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";
import { ConfirmDialog } from "../atoms/message/ConfirmDialog";
import { ChangeJapanese } from "../atoms/ChangeJapanese";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Books = memo(
  ({ item, index, bookItems, deleteItem, favoriteState }) => {
    const { bookId, bookTitle, category, coverImage, date, favorite } = item;
    // ナビゲーション
    const navigate = useNavigate();
    // カスタムフック
    const { bookOpenAnimation } = useStyle();
    // Toggle
    const [bookOpen, setBookOpen] = useState(false);
    const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
    // 情報
    const [deleteInform, setDeleteInform] = useState({});
    // スタイル共通化
    const bookStyle =
      "absolute -z-20 flex h-[360px] w-72 sm:h-[600px] sm:w-[500px] border bg-gray-100 text-slate-70 block border-slate-400";
    const bookOpenBtnStyle =
      "absolute -top-1 p-3 right-0 -rotate-45 transform text-xl text-slate-400 transition-all";
    const bookOpenTextStyle =
      "absolute mr-1 border-b py-[2px] px-[5px] text-[12px] hover:font-bold";

    const bookOpenToggle = () => {
      setBookOpen(!bookOpen);
    };

    const deleteItemToggle = (item) => {
      const { bookId, bookTitle, favorite } = item;
      setConfirmWindowOpen(true); // 確認ダイアログを出現させる
      setDeleteInform({ bookId, bookTitle, favorite }); // 削除するアイテムの情報を保持
    };

    const favoriteBtnToggle = (item) => {
      const { bookId, favorite } = item;
      favoriteState(bookId, !favorite);
      setBookOpen(false);
    };

    const toCategoryComponent = (item) => {
      const { category, bookId, bookTitle, username, coverImage, date } = item;
      navigate(`book`, {
        state: { category, bookId, bookTitle, username, coverImage, date },
      });
    };

    return (
      <>
        <div className="flex h-screen w-screen items-center">
          <div key={bookId} className="h-screen w-screen">
            {/* オブジェクトひとつずつのスクリーン幅 */}
            <div className="flex h-screen w-screen items-center justify-center">
              <div className="relative space-y-4">
                {/* 本の厚み */}
                <BookRibbon favorite={favorite} bookId={bookId} />
                <span
                  className={`${bookStyle} -right-2 -top-2 rounded-sm  border-slate-300 shadow-xl`}
                />
                <span className={`${bookStyle} -right-[6px] -top-[6px]`} />
                <span className={`${bookStyle} -right-[4px] -top-[4px]`} />
                <span className={`${bookStyle} -right-[2px] -top-[2px]`} />
                <span className="absolute -top-[5px] -left-[1px] -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
                {/* 本をめくるアニメーション */}
                <div // 三角のUI
                  className={[
                    bookOpen && bookId
                      ? bookOpenAnimation.showed
                      : bookOpenAnimation.base,
                  ]}
                />
                <button // ひらくボタン
                  onClick={bookOpenToggle}
                  className={[
                    bookOpen && bookId
                      ? `${bookOpenBtnStyle} opacity-0 duration-300`
                      : `${bookOpenBtnStyle} opacity-100 delay-500`,
                  ]}
                >
                  <BsReply />
                </button>
                <div // ひらいた後の要素
                  className={
                    bookOpen && bookId
                      ? "transform text-slate-600 transition-all delay-300 duration-300"
                      : "transform text-slate-600 opacity-0 transition-all"
                  }
                >
                  {bookOpen && bookId && (
                    <>
                      <button
                        onClick={() => toCategoryComponent(item)}
                        className={`${bookOpenTextStyle} top-0 right-0 my-1`}
                      >
                        ひらく
                      </button>
                      <button
                        onClick={() => deleteItemToggle(item)}
                        className={`${bookOpenTextStyle} top-4 right-0 mt-4`}
                      >
                        すてる
                      </button>
                      <button
                        onClick={() => favoriteBtnToggle(item)}
                        className={`${bookOpenTextStyle} top-10 right-0 mt-5`}
                      >
                        おきにいり
                      </button>
                      <button
                        onClick={bookOpenToggle}
                        className="absolute top-[160px] left-[52%] rotate-[125deg] transform p-3 text-xl text-slate-500"
                      >
                        <BsReplyFill />
                      </button>
                    </>
                  )}
                </div>
                {/* 本をめくるアニメーション */}
                {/* 表紙 */}
                <div className="z-10 flex h-[360px] w-72 flex-col items-center rounded-sm  border border-slate-300 bg-white text-slate-700 shadow-inner sm:h-[600px] sm:w-[500px]">
                  <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                    <p className="border-b">{bookTitle}</p>
                    <div className="mt-2 flex select-none flex-col items-center text-[12px] leading-5 text-slate-400">
                      <p>{date}</p>
                      <p>
                        <ChangeJapanese category={category} />
                      </p>
                    </div>
                  </div>
                  <ImageUrlCreate
                    imageUrl={coverImage}
                    acceptType="image/*"
                    video={{
                      videoUrl: "",
                      videoAutoPlay: false,
                      videoCtrl: false,
                      videoLoop: false,
                    }}
                    imageStyle="h-[220px] w-[90%]"
                  />
                </div>
                {/* index → オブジェクトごとの数字 */}
                {/* Items.length → Items配列の中のオブジェクトの総数 */}
                <div className="flex w-full items-center justify-center text-sm">
                  <a
                    href={`#${index - 1}`}
                    className="text-lg text-slate-500 active:text-black"
                  >
                    <BsChevronCompactLeft />
                  </a>
                  <p className="mx-4 select-none space-x-1 text-slate-500">
                    {`${index + 1} / ${bookItems.length}`}
                  </p>
                  <a
                    href={`#${index + 1}`}
                    className="text-lg text-slate-500 active:text-black"
                  >
                    <BsChevronCompactRight />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={[
            confirmWindowOpen
              ? "absolute top-0 left-0 z-50 flex h-screen w-screen transform items-center justify-center overflow-hidden bg-black bg-opacity-10 transition-transform duration-100"
              : "absolute top-0 left-0 z-50 flex h-screen w-screen -translate-x-full transform items-center justify-center overflow-hidden transition-transform duration-100",
          ]}
        >
          <ConfirmDialog
            message="削除しますか？"
            deleteInform={deleteInform} // 削除するアイテムのid
            deleteItem={deleteItem} // 削除する関数
            setConfirmWindowOpen={setConfirmWindowOpen}
            setBookOpen={setBookOpen}
          />
        </div>
      </>
    );
  }
);
