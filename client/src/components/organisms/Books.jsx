import { memo, useState } from "react";
// アイコン
import { BsReply } from "react-icons/bs";
import { BsReplyFill } from "react-icons/bs";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";
import { ConfirmWindow } from "../atoms/message/ConfirmWindow";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Books = memo(({ Items, deleteItem, favoriteState }) => {
  const [bookOpen, setBookOpen] = useState(false);
  // カスタムフック
  const { bookOpenAnimation } = useStyle();
  // Toggle
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  // 情報
  const [deleteId, setDeleteId] = useState();

  // スタイル共通化
  const bookStyle =
    "absolute -z-20 flex h-[400px] w-80 sm:h-[600px] sm:w-[500px] border bg-gray-100 text-slate-70 block border-slate-400";
  const bookOpenBtnStyle =
    "absolute top-2 right-3 -rotate-45 transform text-xl text-slate-400 transition-all";

  const bookOpenToggle = () => {
    setBookOpen(!bookOpen);
  };

  const deleteItemToggle = (id) => {
    setConfirmWindowOpen(true); // 確認ダイアログを出現
    setDeleteId(id); // 削除するアイテムのidを保持
  };

  const favoriteBtnToggle = (id, num) => {
    favoriteState(id, num);
    setBookOpen(false);
  };

  return (
    <>
      <div className="flex h-screen w-screen snap-x items-center overflow-x-scroll scroll-smooth">
        {Items.map((item, index) => {
          return (
            <div
              key={item.bookId}
              className="h-screen w-screen snap-start snap-always"
            >
              {/* オブジェクトひとつずつのスクリーン幅 */}
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="relative space-y-4">
                  {/* 本の厚み */}
                  <BookRibbon favorite={item.favorite} bookId={item.bookId} />
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
                      bookOpen && item.bookId
                        ? bookOpenAnimation.showed
                        : bookOpenAnimation.base,
                    ]}
                  />
                  <button // ひらくボタン
                    onClick={bookOpenToggle}
                    className={[
                      bookOpen && item.bookId
                        ? `${bookOpenBtnStyle} opacity-0 duration-300`
                        : `${bookOpenBtnStyle} opacity-100 delay-500`,
                    ]}
                  >
                    <BsReply />
                  </button>
                  <div // ひらいた後の要素
                    className={
                      bookOpen && item.bookId
                        ? "transform text-slate-600 transition-all delay-100 duration-300"
                        : "transform text-slate-600 opacity-0 transition-all"
                    }
                  >
                    {bookOpen && item.bookId && (
                      <>
                        <button className="absolute top-0 right-0 my-1 mr-1 border-b py-[2px] px-[5px] text-[10px]">
                          ひらく
                        </button>
                        <button
                          onClick={() => deleteItemToggle(item.bookId)}
                          className="absolute top-4 right-0 mr-1 mt-3 border-b py-[2px] px-[5px] text-[10px]"
                        >
                          すてる
                        </button>
                        <button
                          onClick={() =>
                            favoriteBtnToggle(item.bookId, !item.favorite)
                          }
                          className="absolute top-10 right-0 mr-1 mt-3 border-b py-[2px] px-[5px] text-[10px]"
                        >
                          おきにいり
                        </button>
                        <button
                          onClick={bookOpenToggle}
                          className="absolute top-[173px] left-[60%] rotate-[125deg] transform text-xl text-slate-500"
                        >
                          <BsReplyFill />
                        </button>
                      </>
                    )}
                  </div>
                  {/* 本をめくるアニメーション */}
                  {/* 表紙 */}
                  <div className="z-10 flex h-[400px] w-80 flex-col items-center rounded-sm  border border-slate-300 bg-white text-slate-700 shadow-inner sm:h-[600px] sm:w-[500px]">
                    <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                      <p className="border-b">{item.bookName}</p>
                      <div className="mt-2 flex select-none flex-col items-center text-[12px] leading-5 text-slate-400">
                        <p>{item.date}</p>
                        <p>{item.category}</p>
                      </div>
                    </div>
                    <ImageUrlCreate
                      coverImage={item.coverImage}
                      imageStyle="h-[250px] w-[90%]"
                    />
                  </div>
                  <p className="select-none space-x-1 text-sm text-slate-400">
                    -{/* index → オブジェクトごとの数字 */}
                    {/* Items.length → Items配列の中のオブジェクトの総数 */}
                    <span className="mx-4 font-bold">{`${index + 1} / ${
                      Items.length
                    }`}</span>
                    -
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div
        className={[
          confirmWindowOpen
            ? "absolute top-0 left-0 z-50 flex h-screen w-screen transform items-center justify-center overflow-hidden transition-transform duration-500"
            : "absolute top-0 left-0 z-50 flex h-screen w-screen -translate-x-full transform items-center justify-center overflow-hidden duration-500 transition-transform",
        ]}
      >
        <div>
          <ConfirmWindow
            message="削除しますか？"
            deleteId={deleteId}
            deleteItem={deleteItem}
            setConfirmWindowOpen={setConfirmWindowOpen}
            setBookOpen={setBookOpen}
          />
        </div>
      </div>
    </>
  );
});
