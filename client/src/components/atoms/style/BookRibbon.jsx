import React, { useContext } from "react";
// コンテキスト
import { Context } from "../../../App";

export const BookRibbon = ({ favorite, bookId }) => {
  const { favoriteBtn, setFavoriteBtn, setFavoriteBtnId } =
    useContext(Context);

  const favoriteBtnToggle = () => {
    setFavoriteBtn(!favoriteBtn);
    setFavoriteBtnId(bookId)
  };

  return (
    <>
      {favorite ? (
        <div onClick={favoriteBtnToggle} className="cursor-pointer">
          {/* リボン */}
          <span className="absolute left-5 top-2 h-2 w-8 -skew-x-[42deg] transform bg-red-600"></span>
          <span className="absolute left-4 top-4 h-12 w-8 transform bg-red-500"></span>
          <span className="absolute left-5 top-[52px] h-6 w-6 rotate-45 transform bg-white"></span>
        </div>
      ) : (
        <div onClick={favoriteBtnToggle} className="cursor-pointer opacity-20">
          <span className="absolute left-5 top-2 h-2 w-8 -skew-x-[42deg] transform border-x border-t border-slate-300 bg-slate-200"></span>
          <span className="absolute left-4 top-4 h-12 w-8 transform border-x border-slate-300 bg-slate-100"></span>
          <span className="absolute left-5 top-[52px] h-6 w-6 rotate-45 transform rounded-sm border-t border-l border-slate-300 bg-white "></span>
        </div>
      )}
    </>
  );
};
