import { memo } from "react";
import { CloseBtn } from "../atoms/button/CloseBtn";
// 画像
import helpImage1 from "../../images/help_image1.png";

export const Help = memo(({ onClickToggle }) => {
  return (
    <>
      <div
        onClick={onClickToggle}
        className="flex h-screen w-screen justify-center bg-white"
      >
        <div className="w-[80%] space-y-4 overflow-scroll bg-white leading-8">
          <button className="text-sky-800 underline">
            <a href="/mybooks">戻る</a>
          </button>
          <div className="lg:hidden">
            <CloseBtn onClickClose={onClickToggle} />
          </div>
          <h1 className="text-4xl font-bold">使い方ガイド</h1>
          <div className="pyy-6 border-2 px-4">
            <p>aaa</p>
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
