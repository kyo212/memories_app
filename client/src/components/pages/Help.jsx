import { memo } from "react";
import { CloseBtn } from "../atoms/button/CloseBtn";
// 画像
import helpImage1 from "../../images/help_image1.png";

import { useNavigate } from "react-router-dom";

export const Help = memo(({ onClickToggle }) => {
  const navigate = useNavigate();

  const toMybooks = () => {
    navigate("/mybooks");
  };

  return (
    <>
      <div
        onClick={onClickToggle}
        className="flex h-screen w-screen justify-center bg-white"
      >
        <div className="w-[80%] space-y-4 overflow-scroll bg-white leading-8">
          <button onClick={toMybooks} className="text-sky-800 underline">
            <p>戻る</p>
          </button>
          <div className="lg:hidden">
            <CloseBtn onClickClose={onClickToggle} />
          </div>
          <h1 className="text-4xl font-bold">使い方ガイド</h1>
          <div className="pyy-6 border-2 px-4">
            <p className="font-bold">フォトブックの追加</p>
            <img
              src={helpImage1}
              alt="追加の使い方ガイド"
              className="w-56 border"
            />
          </div>
        </div>
      </div>
    </>
  );
});
