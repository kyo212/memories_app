import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import { BsReply } from "react-icons/bs";
import { BsReplyFill } from "react-icons/bs";
import { BsPencil } from "react-icons/bs";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";
import { ChangeJapanese } from "../atoms/ChangeJapanese";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Books = memo(
  ({
    item,
    index,
    bookItems,
    favoriteState,
    setConfirmWindowOpen,
    setDeleteInform,
    bookOpen,
    setBookOpen,
  }) => {
    // props
    const { bookId, bookTitle, category, coverImage, date, favorite, share } =
      item;
    // Toggle
    const [bookTitleEdit, setBookTitleEdit] = useState(false);
    // 情報
    const [bookOpenId, setBookOpenId] = useState(0);
    // ナビゲーション
    const navigate = useNavigate();
    // カスタムフック
    const { bookOpenAnimation } = useStyle();

    // スタイル共通化
    const bookStyle =
      "absolute -z-20 flex h-[360px] w-72 sm:h-[600px] sm:w-[500px] border bg-gray-100 text-slate-70 block border-slate-400";
    const bookOpenBtnStyle =
      "absolute -top-1 p-3 right-0 -rotate-45 transform text-xl text-slate-400 transition-all";
    const bookOpenTextStyle =
      "mr-1 mt-2 pb-1 border-b border-[#efefef] py-[2px] px-[5px] text-right text-[12px] hover:font-bold";

    const bookOpenToggle = (id) => {
      setBookOpenId(id);
      setBookOpen(!bookOpen);
      setBookTitleEdit(false);
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

    const bookTitleEditToggle = () => {
      setBookTitleEdit(!bookTitleEdit);
      setBookOpen(false);
    };

    const toCategoryComponent = (item) => {
      navigate(`book`, {
        state: item,
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
                  className={`${bookStyle} shadow-3xl -right-2 -top-2  rounded-sm border-slate-300`}
                />
                <span className={`${bookStyle} -right-[6px] -top-[6px]`} />
                <span className={`${bookStyle} -right-[4px] -top-[4px]`} />
                <span className={`${bookStyle} -right-[2px] -top-[2px]`} />
                <span className="absolute -top-[5px] -left-[1px] -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
                {/* 本をめくるアニメーション */}
                <div // 三角のUI
                  className={[
                    bookOpen && bookId === bookOpenId
                      ? bookOpenAnimation.showed
                      : bookOpenAnimation.base,
                  ]}
                >
                  <button // ひらくボタン
                    onClick={() => bookOpenToggle(bookId)}
                    className={[
                      bookOpen && bookId === bookOpenId
                        ? `${bookOpenBtnStyle} opacity-0 duration-300`
                        : `${bookOpenBtnStyle} opacity-100 delay-500`,
                    ]}
                  >
                    <BsReply />
                  </button>
                  <div // ひらいた後の要素
                    className={
                      bookOpen && bookId === bookOpenId
                        ? "absolute flex h-[240px] w-[190px] transform flex-col p-1 text-slate-600 transition-all delay-300 duration-300 "
                        : "transform text-slate-600 opacity-0 transition-all"
                    }
                  >
                    {bookOpen && bookId === bookOpenId && (
                      <>
                        <button
                          onClick={() => toCategoryComponent(item)}
                          className={`${bookOpenTextStyle}`}
                        >
                          ひらく
                        </button>
                        <button
                          onClick={() => favoriteBtnToggle(item)}
                          className={`${bookOpenTextStyle}`}
                        >
                          おきにいり
                        </button>
                        <button
                          onClick={() => {}}
                          className={`${bookOpenTextStyle}`}
                        >
                          この本を共有
                        </button>
                        <button // タイトル編集ボタン
                          onClick={bookTitleEditToggle}
                          className={`${bookOpenTextStyle} flex items-center justify-end`}
                        >
                          <span className="mr-1">
                            <BsPencil />
                          </span>
                          編集
                        </button>
                        <button
                          onClick={() => deleteItemToggle(item)}
                          className={`${bookOpenTextStyle}`}
                        >
                          すてる
                        </button>
                        <button
                          onClick={bookOpenToggle}
                          className="absolute bottom-0 w-12 rotate-[125deg] transform p-3 text-xl text-slate-500"
                        >
                          <BsReplyFill />
                        </button>
                      </>
                    )}
                  </div>
                </div>
                {/* 本をめくるアニメーション */}
                {/* 表紙 */}
                <div className="flex h-[360px] w-72 flex-col items-center rounded-sm  border border-slate-300 bg-white text-slate-700 shadow-inner sm:h-[600px] sm:w-[500px]">
                  <div className="text-bold flax mt-10 mb-8 flex-col text-center font-serif text-slate-800">
                    {!bookTitleEdit ? (
                      <>
                        <p
                          className={[
                            bookTitle.length >= 10
                              ? "text-md"
                              : bookTitle.length >= 8
                              ? "text-lg"
                              : "text-2xl",
                          ]}
                        >
                          {bookTitle}
                        </p>
                      </>
                    ) : (
                      <>
                        <input
                          type="text"
                          className="w-[60%] border px-2 py-1 text-lg"
                        />
                        <button onClick={bookTitleEditToggle}>*</button>
                      </>
                    )}
                    <div className="mt-2 flex select-none items-center justify-center text-[12px] leading-5 text-slate-400">
                      <p>{date}</p>
                      <p className="mx-2">-</p>
                      {!bookTitleEdit ? (
                        <p>
                          <ChangeJapanese category={category} />
                        </p>
                      ) : (
                        <input
                          type="text"
                          placeholder="カテゴリー"
                          className="w-[88px] border px-2 py-1"
                        />
                      )}
                    </div>
                  </div>
                  <ImageUrlCreate
                    imageUrl={coverImage}
                    imageSize="h-[215px] w-[260px]"
                    imageStyle="h-full w-full object-cover"
                    videoStyle="h-full w-full object-cover"
                    acceptType="image/*"
                    disabled={true}
                    video={{
                      videoUrl: "",
                      videoAutoPlay: false,
                      videoCtrl: false,
                      videoLoop: false,
                    }}
                  />
                </div>
                <div className="">
                  {share ? <p className="text-sm text-green-800">この本は共有中です</p>:<></>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
