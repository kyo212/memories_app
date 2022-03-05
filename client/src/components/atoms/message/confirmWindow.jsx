import { memo } from "react";

export const ConfirmWindow = memo(
  ({
    message,
    setConfirmWindowOpen,
    setBookOpen,
    deleteItem,
    deleteInform,
  }) => {
    const { id, title, favorite } = deleteInform;
    const msgBtnStyle =
      "py-1 px-2 mx-2 text-sm rounded-md border hover:bg-gray-500 hover:text-white hover:font-bold";

    const confirmSelect = (e) => {
      e.target.id === "yes" && deleteItem(id);
      setConfirmWindowOpen(false); // 確認ダイアログを閉じる
      setBookOpen(false);
    };

    return (
      <>
        <div className="flex h-40 w-72 flex-col justify-center space-y-4 rounded-md border border-gray-200 bg-white py-4 px-2 text-gray-700 shadow-2xl">
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
                <p className="ml-1 font-bold">{`${title}`}</p>
                <p>{`を${message}`}</p>
              </div>
              <div className="w-full">
                <button
                  id="yes"
                  onClick={confirmSelect}
                  className={`${msgBtnStyle} border-red-500 text-red-500 hover:bg-red-500`}
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
