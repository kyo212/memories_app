import { memo } from "react";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";

export const Books = memo(({ category, Items }) => {
  const bookStyle =
    "absolute -z-10 flex h-[400px] w-80 sm:h-[600px] sm:w-[500px] border border-slate-300 bg-slate-100 text-slate-70";

  return (
    <>
      <div className="flex h-screen w-screen snap-x items-center overflow-x-scroll scroll-smooth">
        {Items.map((item, index) => {
          return (
            // 基準となる背面
            <div
              key={item.bookId}
              className="h-screen w-screen snap-start snap-always"
            >
              {/* オブジェクトひとつずつの背面 */}
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="relative">
                  <p className="text-md absolute -top-16 left-1/2 -translate-x-1/2 transform bg-white px-4 py-2 font-bold text-slate-600">
                    {item.category}
                  </p>
                  {/* 本の厚み */}
                  <BookRibbon favorite={item.favorite} />
                  <div className={`${bookStyle} -right-2 -top-2 rounded-sm`} />
                  <div className={`${bookStyle} -right-1 -top-1`} />
                  <span className="absolute -top-[5px] left-0 -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
                  {/* 表紙 */}
                  <div className="z-10 flex h-[400px] w-80 flex-col items-center rounded-sm  border border-slate-300 bg-white text-slate-700 shadow-md sm:h-[600px] sm:w-[500px]">
                    <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                      <p className="border-b">{item.bookName}</p>
                      <label className="text-[12px] text-slate-400">
                        <span className="mx-2 font-bold">
                          作成日:{item.date}
                        </span>
                      </label>
                    </div>
                    <ImageUrlCreate
                      coverImage={item.coverImage}
                      imageStyle="h-[270px] opacity-80 w-[285px] shadow-inner"
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
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
});
