import { memo, useContext } from "react";
// アイコン
import { BsChevronDoubleUp } from "react-icons/bs";
import { BsChevronDoubleDown } from "react-icons/bs";
// コンテキスト
import { Context } from "../../App";

export const Header = memo(({ root, children, headerOpen }) => {
  const { headerToggle, setHeaderToggle } = headerOpen;
  // コンテキスト
  const { setMenuToggle, setSearchToggle } = useContext(Context);

  const headerOpenClose = () => {
    setHeaderToggle(!headerToggle);
    setMenuToggle(false);
    setSearchToggle(false);
  };

  return (
    <>
      <div
        className={`${[
          headerToggle && "-translate-y-full",
        ]} fixed z-40 mt-2 flex h-[50px] w-full transform justify-center transition-transform`}
      >
        <div className="flex h-12 w-[96%] items-center  justify-between rounded-md">
          <h1 className="mx-4 select-none font-serif text-xl font-bold text-slate-800 sm:text-2xl">
            <a href={root}>memories</a>
          </h1>
          <div className="mx-4 flex h-12 items-center">
            <div className="flex h-full space-x-2">{children}</div>
            <button
              onClick={headerOpenClose}
              className={`${[
                headerToggle
                  ? "translate-y-12 bg-gray-500 text-white delay-500"
                  : "bg-white text-slate-500 shadow-md",
              ]} ml-2 transform cursor-pointer rounded-full border border-gray-300 p-2 transition-all md:ml-3 md:p-3`}
            >
              {headerToggle ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
