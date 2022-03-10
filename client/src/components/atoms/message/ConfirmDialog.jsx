import { memo } from "react";
// アイコン
import { ErrIcon } from "../icon/ErrIcon";

export const ConfirmDialog = memo(
  ({
    message,
    setConfirmWindowOpen,
    setBookOpen,
    deleteItem,
    deleteInform,
  }) => {
    // props
    // bookId -> 削除する対象 bookTitle -> メッセージに表示
    // favorite -> お気に入り状態によって削除できるか決める
    const { bookId, bookTitle, favorite } = deleteInform;

    // スタイル共通化
    const msgBtnStyle =
      "py-1 px-2 mx-2 text-sm rounded-md border hover:bg-gray-500 hover:text-white hover:font-bold";

    const confirmSelect = (e) => {
      e.target.id === "yes" && deleteItem(bookId);
      setConfirmWindowOpen(false); // 確認ダイアログをとじる
      setBookOpen(false);
    };

    return (
      <>
        <div className="flex h-32 w-[90%] flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-200 bg-white py-4 px-2 text-gray-700 shadow-2xl">
          {favorite ? (
            <>
              <p>お気に入り中の本は削除できません</p>
              <div className="flex w-full justify-center">
                <button
                  onClick={confirmSelect}
                  className={`${msgBtnStyle} w-20 border-slate-500`}
                >
                  とじる
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="leading-6">
                <p className="flex">
                  <ErrIcon />
                  <span className="ml-1 font-bold">{`${bookTitle}`}</span>を
                  {`${message}`}
                </p>
              </div>
              <div className="w-full text-center">
                <button
                  id="yes"
                  onClick={confirmSelect}
                  className={`${msgBtnStyle} border-red-500 bg-red-500 font-bold text-white hover:bg-white hover:text-white`}
                >
                  削除
                </button>
                <button
                  onClick={confirmSelect}
                  className={`${msgBtnStyle} border-slate-500`}
                >
                  いいえ
                </button>
              </div>
            </>
          )}
        </div>
      </>
    );
  }
);
