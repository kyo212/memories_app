import { memo } from "react";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";

export const Books = memo(({ category, Items }) => {
  return (
    <div>
      <h1 className="py-4 font-serif text-xl font-bold text-slate-600">
        -- {category} --
      </h1>
      <div className="flex h-[460px] w-full items-center overflow-x-scroll">
        {Items.map((item) => {
          return (
            <div key={item.num} className="relative">
              {/* 本の淵のUI */}
              {item.num === 1 && <BookRibbon />}
              <div className="absolute -right-2 -top-2 -z-10 mx-6 flex h-[400px] w-80 rounded-sm border border-slate-300 bg-slate-100 text-slate-700"></div>
              <div className="absolute -right-1 -top-1 -z-10 mx-6 flex h-[400px]  w-80 border border-slate-300 bg-slate-100 text-slate-700"></div>
              <span className="absolute -top-[5px] left-[24px] -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white"></span>
              {/* 表紙 */}
              <div className="z-10 mx-6 flex h-[400px] w-80 flex-col  items-center rounded-sm border border-slate-300 bg-white text-slate-700 shadow-md">
                <div className="text-bold flax mt-3 flex-col text-center text-lg">
                  <p className="border-b">{item.title}</p>
                  <label className="text-[6px] text-slate-400">
                    {item.category}
                  </label>
                </div>
                <ImageUrlCreate
                  className={"h-[70%] w-[80%] border shadow-inner"}
                />
              </div>
              <p className="my-2 space-x-1 text-sm text-slate-400">
                -{item.num}-
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
