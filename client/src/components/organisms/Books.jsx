import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
// アイコン
import {
  BsReply,
  BsReplyFill,
  BsShare,
  BsBookmark,
  BsTrash,
  BsSticky,
} from "react-icons/bs";
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
    favoriteState,
    setConfirmWindowOpen,
    shareState,
    setDeleteInform,
    bookOpen,
    publicBookMenu,
    setBookOpen,
    bottomText,
  }) => {
    // props
    const { bookId, bookTitle, category, coverImage, date, favorite, shareId } =
      item;
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
      "mr-1 mt-2 pb-1 border-b border-b-slate-200 py-[2px] px-[5px] text-right text-[12px] hover:font-bold  flex items-center justify-end";

    const bookOpenToggle = (bookId) => {
      setBookOpenId(bookId);
      setBookOpen(!bookOpen);
    };

    const deleteItemToggle = ({ bookId, bookTitle, favorite }) => {
      setConfirmWindowOpen(true); // 確認ダイアログを出現させる
      setDeleteInform({ deleteId: bookId, bookTitle, favorite }); // 削除するアイテムの情報を保持
      setBookOpen(false);
    };

    const shareBtnToggle = ({ bookId, shareId }) => {
      // 対象のidと現在の共有状態(0か1)の逆をsetStateとして保持する
      shareState({ bookId, shareId: !shareId });
      setBookOpen(false);
    };

    const favoriteBtnToggle = ({ bookId, favorite }) => {
      // 対象のidと現在のお気に入り状態(0か1)の逆をsetStateとして保持する
      favoriteState(bookId, !favorite);
      setBookOpen(false);
    };

    const toCategoryComponent = (
      { category, bookId, bookTitle, username, coverImage, date, favorite },
      publicBookMenu
    ) => {
      navigate(`book`, {
        state: {
          category,
          bookId,
          bookTitle,
          username,
          coverImage,
          date,
          favorite,
          publicBookMenu,
        },
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
                  className={`${bookStyle} -right-2 -top-2  rounded-sm border-slate-300`}
                />
                <span className={`${bookStyle} -right-[6px] -top-[6px]`} />
                <span className={`${bookStyle} -right-[4px] -top-[4px]`} />
                <span className={`${bookStyle} -right-[2px] -top-[2px]`} />
                <span className="absolute -top-[5px] -left-[1px] -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
                {/* 本をめくるアニメーション */}
                <div // 三角のUI
                  className={[
                    bookOpen && bookOpenId
                      ? bookOpenAnimation.showed
                      : bookOpenAnimation.base,
                  ]}
                >
                  <button // ひらくボタン
                    id="bookOpen"
                    onClick={() => bookOpenToggle(bookId)}
                    className={[
                      bookOpen && bookOpenId
                        ? `${bookOpenBtnStyle} opacity-0 duration-300`
                        : `${bookOpenBtnStyle} opacity-100 delay-500`,
                    ]}
                  >
                    <BsReply />
                  </button>
                  <div // ひらいた後の要素
                    className={
                      bookOpen && bookOpenId
                        ? "absolute flex h-[255px] w-[190px] transform flex-col p-1 text-slate-600 transition-all delay-300 duration-300 "
                        : "transform text-slate-600 opacity-0 transition-all"
                    }
                  >
                    {bookOpen && bookOpenId && (
                      <>
                        <button
                          onClick={() =>
                            toCategoryComponent(item, publicBookMenu)
                          }
                          className={`${bookOpenTextStyle}`}
                        >
                          <span>ひらく</span>
                          <span className="ml-2 text-sky-800">
                            <BsSticky />
                          </span>
                        </button>
                        {publicBookMenu && (
                          <>
                            <button
                              onClick={() => favoriteBtnToggle(item)}
                              className={`${bookOpenTextStyle}`}
                            >
                              <span>おきにいり</span>
                              <span className="ml-2 text-sky-800">
                                <BsBookmark />
                              </span>
                            </button>
                            <button
                              onClick={() => shareBtnToggle(item)}
                              className={`${bookOpenTextStyle}`}
                            >
                              {shareId ? (
                                <span>共有をやめる</span>
                              ) : (
                                <span>共有する</span>
                              )}
                              <span className="ml-2 text-sky-800">
                                <BsShare />
                              </span>
                            </button>
                            <button
                              onClick={() => deleteItemToggle(item)}
                              className={`${bookOpenTextStyle}`}
                            >
                              <span>すてる</span>
                              <span className="ml-2 text-sky-800">
                                <BsTrash />
                              </span>
                            </button>
                          </>
                        )}
                        <button
                          id="bookClose"
                          onClick={() => bookOpenToggle(bookId)}
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
                  <div className="text-bold flax mt-10 mb-8 flex-col text-center text-slate-800">
                    <p
                      className={[
                        bookTitle.length >= 10
                          ? "text-md"
                          : bookTitle.length >= 8
                          ? "text-lg"
                          : "text-xl",
                      ]}
                    >
                      {bookTitle}
                    </p>
                    <div className="mt-2 flex select-none items-center justify-center text-[12px] leading-5 text-slate-400">
                      <p>{date}</p>
                      <p className="mx-2">-</p>
                      <p>
                        <ChangeJapanese category={category} />
                      </p>
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
                <div>
                  {shareId ? (
                    <div className="absolute left-1/2 w-full -translate-x-1/2 transform">
                      <p className="animate-pulse text-sm font-bold text-slate-500 ">
                        {bottomText}
                      </p>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
);
