import { memo } from "react";
// アイコン
import { BsChevronDoubleUp } from "react-icons/bs";
import { BsChevronDoubleDown } from "react-icons/bs";

export const Header = memo(({ root, children, headerOpen }) => {
  const { headerToggle, setHeaderToggle } = headerOpen;
  return (
    <>
      <div
        className={`${[
          headerToggle && "-translate-y-full",
        ]} fixed z-30 mt-2 flex h-[50px] w-full transform justify-center transition-transform`}
      >
        <div className="flex h-12 w-[96%] items-center  justify-between rounded-md ">
          <h1 className="mx-4 select-none font-serif text-xl font-bold text-slate-800">
            <a href={root}>memories</a>
          </h1>
          <div className="mx-4 flex h-12 items-center">
            {children}
            <button
              onClick={() => setHeaderToggle(!headerToggle)}
              className={`${[
                headerToggle && "translate-y-12 delay-500",
              ]} m-2 transform cursor-pointer transition-all`}
            >
              {headerToggle ? <BsChevronDoubleDown /> : <BsChevronDoubleUp />}
            </button>
          </div>
        </div>
      </div>
    </>
  );
});
