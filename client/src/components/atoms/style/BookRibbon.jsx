import React, { useContext } from "react";
// コンテキスト
import { Context } from "../../../App";

export const BookRibbon = ({ favorite, bookId }) => {
  const { favoriteBtn, setFavoriteBtn, setFavoriteBtnId } = useContext(Context);

  const favoriteBtnToggle = () => {
    setFavoriteBtn(!favoriteBtn);
    setFavoriteBtnId(bookId);
  };

  // 共通化
  const ribbonStyleTop =
    "absolute left-5 top-2 h-2 w-8 -skew-x-[42deg] transform transition-all";
  const ribbonStyleCenter =
    "absolute left-4 top-4 h-12 w-8 transform transition-all";
  const ribbonStyleBottom =
    "absolute left-5 top-[52px] h-6 w-6 rotate-45 transform transition-all bg-white rounded-sm border-t border-l border-slate-600";

  return (
    <>
      <div
        onClick={favoriteBtnToggle}
        className={[
          favorite
            ? "transform cursor-pointer transition-all "
            : "cursor-pointer opacity-0",
        ]}
      >
        {/* リボン */}
        <span
          className={[
            favorite
              ? `${ribbonStyleTop} bg-red-600 duration-300`
              : `${ribbonStyleTop} border-x border-t border-slate-700 bg-slate-200`,
          ]}
        />
        <span
          className={[
            favorite
              ? `${ribbonStyleCenter} bg-red-500 delay-100`
              : `${ribbonStyleCenter} border-x border-slate-600 bg-slate-100`,
          ]}
        />
        <span
          className={[
            favorite
              ? `${ribbonStyleBottom}`
              : `${ribbonStyleBottom} `,
          ]}
        />
      </div>
    </>
  );
};
