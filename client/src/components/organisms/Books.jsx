import { memo, useState } from "react";
// アイコン
import { BsThreeDotsVertical } from "react-icons/bs";
// コンポーネント
import { BookRibbon } from "../atoms/style/BookRibbon";
import { ImageUrlCreate } from "./ImageUrlCreate";
// カスタムフック
import { useStyle } from "../custom/useStyle";

export const Books = memo(({ Items }) => {
  const [bookOpen, setBookOpen] = useState(false);
  // カスタムフック
  const { bookOpenAnimation } = useStyle();
  // スタイル共通化
  const bookStyle =
    "absolute -z-10 flex h-[400px] w-80 sm:h-[600px] sm:w-[500px] border bg-white text-slate-70 block border-slate-300";

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
                <div className="relative space-y-4">
              {/* <button onClick={() => setBookOpen(!bookOpen)}>btn</button> */}
                  {/* 本の厚み */}
                  <BookRibbon favorite={item.favorite} />
                  <span
                    className={`${bookStyle} -right-2 -top-2 rounded-sm  border-slate-300 shadow-md`}
                  />
                  <span className={`${bookStyle} -right-[6px] -top-[6px]`} />
                  <span className={`${bookStyle} -right-[4px] -top-[4px]`} />
                  <span className={`${bookStyle} -right-[2px] -top-[2px]`} />
                  <span className="absolute -top-[5px] left-0 -z-10 h-[4px] w-[13px] -rotate-45 transform rounded-md border border-slate-300 bg-white" />
                  {/* 表紙 */}
                  {/* 本をめくるアニメーション */}
                  <div
                    className={[
                      bookOpen
                        ? bookOpenAnimation.showed
                        : bookOpenAnimation.base,
                    ]}
                  />
                  <div className="z-10 flex h-[400px] w-80 flex-col items-center rounded-sm  border border-slate-300 bg-white text-slate-700 shadow-inner sm:h-[600px] sm:w-[500px]">
                    <span className="absolute top-6 right-2 text-xl text-slate-400">
                      {/* <BsThreeDotsVertical /> */}
                    </span>
                    <div className="text-bold flax mt-8 mb-4 flex-col text-center text-lg">
                      <p className="border-b">{item.bookName}</p>
                      <div className="mt-2 flex flex-col items-start text-[12px] leading-4 text-slate-400">
                        <p>
                          <span className="mr-1 font-bold">作成日:</span>
                          {item.date}
                        </p>
                        <p>
                          <span className="mr-1 font-bold">カテゴリー:</span>
                          {item.category}
                        </p>
                      </div>
                    </div>
                    <ImageUrlCreate
                      coverImage={item.coverImage}
                      imageStyle="h-[270px] opacity-80 w-[285px] shadow-inner"
                    />
                  </div>
                  <p className="space-x-1 text-sm text-slate-400">
                    -{/* index → オブジェクトごとの数字 */}
                    {/* Items.length → Items配列の中のオブジェクトの総数 */}
                    <span className="mx-4 font-bold">{`${index + 1} / ${
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
