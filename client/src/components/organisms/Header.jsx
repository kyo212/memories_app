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
          headerToggle ? "-translate-y-full" : "delay-500",
        ]} fixed z-40 flex h-[50px] w-full transform items-center justify-center transition-transform md:h-[60px]`}
      >
        <div className="flex h-12 w-[96%] items-center  justify-between rounded-md">
          <h1 className="mx-4 select-none font-serif text-xl font-bold text-slate-800 sm:text-2xl">
            <a href={root}>memories</a>
          </h1>
          <div className="mx-4 flex h-12 items-center">
            <div className="flex h-12 w-full items-center space-x-2">
              {children}
            </div>
            <div
              className={`${[
                headerToggle
                  ? "flex h-[50px] translate-y-full transform items-center justify-center text-white transition-all delay-500 md:h-[60px]"
                  : "transform transition-all",
              ]} `}
            >
              <button
                onClick={headerOpenClose}
                className={`${[
                  headerToggle
                    ? "bg-gray-500 text-white"
                    : "bg-white text-slate-500",
                ]} ml-2 cursor-pointer rounded-full border border-gray-400 p-2 md:ml-3 md:p-3`}
              >
                {headerToggle ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
