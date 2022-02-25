import { memo } from "react";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";

export const Books = memo(({ category, Items }) => {
  const bookStyle =
    "absolute -z-10 flex h-[400px] w-80  border border-slate-300 bg-slate-100 text-slate-70";

  return (
    <>
      {/* <h1 className="my-0 mx-auto mb-8 w-[80%] rounded-sm border border-slate-200 bg-white py-2 font-serif text-xl font-bold  shadow-md">
              {category}
            </h1> */}
      <div className="flex h-screen w-full snap-x items-center overflow-x-scroll scroll-smooth">
        {Items.map((item, index) => {
          return (
            <div
              key={item.bookId}
              className="relative mx-6 snap-start snap-always scroll-mx-6"
            >
              {/* <p className="absolute -top-10 left-1/2 -translate-x-1/2 transform text-md font-bold text-slate-600 shadow-md rounded-full px-4 py-2 bg-white">
                {item.category}
              </p> */}
              {/* 本の厚み */}
              <BookRibbon favorite={item.favorite} />
              <div className={`${bookStyle} -right-2 -top-2 rounded-sm`} />
              <div className={`${bookStyle} -right-1 -top-1`} />
              <span className="absolute -top-[5px] left-0 -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
              {/* 表紙 */}
              <div className="z-10 flex h-[400px] w-80 flex-col  items-center rounded-sm border border-slate-300 bg-white text-slate-700 shadow-md">
                <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                  <p className="border-b">{item.bookName}</p>
                  <label className="text-[12px] text-slate-400">
                    <span className="mx-2 font-bold">作成日:{item.date}</span>
                  </label>
                </div>
                <ImageUrlCreate
                  className={"h-[70%] w-[88%] border shadow-inner"}
                />
              </div>
              <p className="my-2 space-x-1 text-sm text-slate-400">
                -{/* index → オブジェクトごとの数字 */}
                {/* Items.length → Items配列の中のオブジェクトの総数 */}
                <span className="mx-2 font-bold">{`${index + 1} / ${
                  Items.length
                }`}</span>
                -
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
});
