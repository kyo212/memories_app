import { memo, useState } from "react";
// アイコン
import { BsBoxArrowUpLeft, BsChevronDoubleLeft } from "react-icons/bs";

export const BookBottomMenu = memo(
  ({ toMybooks, publicBookMenu, addPageModalToggle }) => {
    const [bottomMenu, setBottomMenu] = useState(false);

    return (
      <div
        className={`${[
          bottomMenu && "-translate-x-full",
        ]} fixed bottom-0 z-50 h-10 ${
          !publicBookMenu ? "w-[70px]" : "w-[109px]"
        } transform transition-all duration-100`}
      >
        <button
          onClick={toMybooks}
          className="fixed left-2 bottom-2 z-50 flex items-center bg-white py-2 px-2 text-sm text-slate-500"
        >
          <BsBoxArrowUpLeft className="mr-1" />
          戻る
        </button>
        {publicBookMenu && (
          <button
            onClick={addPageModalToggle}
            className="fixed left-16 bottom-2 z-50 flex items-center bg-white py-2 px-2 text-sm text-slate-500"
          >
            追加
          </button>
        )}

        <button
          onClick={() => {
            setBottomMenu(!bottomMenu);
          }}
          className={`${[bottomMenu && "lg:opacity-30"]} fixed ${
            !publicBookMenu ? "left-[64px]" : "left-[108px]"
          } bottom-2  z-50 rounded-r-xl bg-white py-[10px] px-2 transition-all duration-1000`}
        >
          <BsChevronDoubleLeft
            className={`${[
              bottomMenu ? "rotate-180" : "rotate-0",
            ]} transition-all duration-1000`}
          />
        </button>
      </div>
    );
  }
);
