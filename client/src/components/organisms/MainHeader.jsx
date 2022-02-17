import { memo } from "react";

export const MainHeader = memo(({ children }) => {
  return (
    <div className="fixed mt-2 flex h-12 w-full justify-center">
      <div className="flex h-12 w-[96%] items-center  justify-between rounded-md bg-white shadow-md">
        <h1 className="mx-4 font-serif text-xl font-bold text-slate-800">
          <a href="/mybooks">Memory</a>
        </h1>
        <div className="mx-4 space-x-2">{children}</div>
      </div>
    </div>
  );
});
