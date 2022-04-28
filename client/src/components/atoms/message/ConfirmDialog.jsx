import { memo } from "react";
// アイコン
import { ErrIcon } from "../icon/ErrIcon";

export const ConfirmDialog = memo(
  ({ message, setConfirmWindowOpen, deleteItem, deleteInform }) => {
    // props
    // bookId -> 削除する対象 bookTitle -> メッセージに表示
    // favorite -> お気に入り状態によって削除できるか決める
    const { deleteId, bookTitle, favorite } = deleteInform;

    // スタイル共通化
    const msgBtnStyle =
      "py-1 px-2 mx-2 text-sm rounded-md border hover:text-white hover:font-bold";

    const confirmDeleteSelect = (e) => {
      e.target.id === "yes" && deleteItem(deleteId);
      setConfirmWindowOpen(false);
    };

    return (
      <>
        {favorite ? (
          <>
            <p>お気に入り中の本は削除できません</p>
            <div className="flex w-full justify-center">
              <button
                onClick={confirmDeleteSelect}
                className={`${msgBtnStyle} w-20 bg-sky-600 font-bold text-white active:bg-sky-900`}
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
                {bookTitle === "" ? (
                  <p>{message}</p>
                ) : (
                  <>
                    <span className="ml-1text-md font-bold">
                      "{bookTitle}"を{message}
                    </span>
                  </>
                )}
              </p>
              <p className="text-[12px] text-slate-500">
                <span className="mr-1">※</span>
                削除したら元に戻すことはできません
              </p>
            </div>

            <div className="w-full text-center">
              <button
                id="yes"
                onClick={confirmDeleteSelect}
                className={`${msgBtnStyle} border-red-500 bg-red-500 font-bold text-white hover:bg-red-700 hover:text-white`}
              >
                削除
              </button>
              <button
                onClick={() => setConfirmWindowOpen(false)}
                className={`${msgBtnStyle} border-slate-500 hover:bg-slate-500`}
              >
                いいえ
              </button>
            </div>
          </>
        )}
      </>
    );
  }
);
