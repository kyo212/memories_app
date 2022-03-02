import { memo } from "react";

export const ConfirmWindow = memo(
  ({ message, setConfirmWindowOpen, setBookOpen, deleteItem, deleteId }) => {
    const msgBtnStyle =
      "py-1 px-2 mx-2 text-sm rounded-md border border-slate-500 hover:bg-gray-500 hover:text-white";

    const yesSelect = () => {
      deleteItem(deleteId);
      setConfirmWindowOpen(false); // 確認ダイアログを閉じる
      setBookOpen(false);
    };

    const noSelect = () => {
      setConfirmWindowOpen(false); // 確認ダイアログを閉じる
      setBookOpen(false);
    };

    return (
      <>
        <div className="flex h-36 w-72 flex-col justify-center space-y-4 rounded-md border border-gray-200 bg-white py-4 px-2 text-gray-700 shadow-2xl">
          <p className="font-bold">{message}</p>
          <div>
            <button onClick={yesSelect} className={msgBtnStyle}>
              はい
            </button>
            <button onClick={noSelect} className={msgBtnStyle}>
              いいえ
            </button>
          </div>
        </div>
      </>
    );
  }
);
