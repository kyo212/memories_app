import { memo } from "react";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";

export const Books = memo(({ category, Items }) => {
  console.log(category);
  return (
    <div>
      <h1 className="relative py-4 font-serif text-xl font-bold text-slate-600">
        <span className="absolute top-7 left-4 mx-4 inline-block w-28 border-b" />
        {category}
        <span className="absolute top-7 right-4 mx-4 inline-block w-28 border-b" />
      </h1>
      <div className="flex h-[460px] w-full snap-x items-center overflow-x-scroll">
        {Items.map((item, index) => {
          return (
            <div
              key={item.bookNum}
              className="relative mx-6 snap-start scroll-mx-10"
            >
              {/* 本の淵のUI */}
              <BookRibbon favorite={item.favorite} />
              <div className="absolute -right-2 -top-2 -z-10 flex h-[400px] w-80 rounded-sm border border-slate-300 bg-slate-100 text-slate-700"></div>
              <div className="absolute -right-1 -top-1 -z-10 flex h-[400px]  w-80 border border-slate-300 bg-slate-100 text-slate-700"></div>
              <span className="absolute -top-[5px] left-0 -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white"></span>
              {/* 表紙 */}
              <div className="z-10 flex h-[400px] w-80 flex-col  items-center rounded-sm border border-slate-300 bg-white text-slate-700 shadow-md">
                <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                  <p className="border-b">{item.bookName}</p>
                  <label className="text-[12px] text-slate-400">
                    {item.category}
                  </label>
                </div>
                <ImageUrlCreate
                  className={"h-[70%] w-[88%] border shadow-inner"}
                />
              </div>
              <p className="my-2 space-x-1 text-sm text-slate-400">
                -<span className="mx-2 font-bold">{index + 1}</span>- -
                <span className="mx-2 font-bold">{item.createDate}</span>-
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
});
