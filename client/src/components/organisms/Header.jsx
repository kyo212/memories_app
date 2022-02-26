import { memo } from "react";

export const Header = memo(({ root, children }) => {
  return (
    <div className="fixed z-30 mt-2 flex h-[50px] w-full justify-center">
      <div className="flex h-12 w-[96%] items-center  justify-between rounded-md ">
        <h1 className="mx-4 font-serif text-xl font-bold text-slate-800">
          <a href={root}>memories</a>
        </h1>
        <div className="mx-4 flex h-12 items-center space-x-2">{children}</div>
      </div>
    </div>
  );
});
