import { memo } from "react";
import { CloseBtn } from "../atoms/button/CloseBtn";

export const Browser = memo(({ onClickToggle }) => {
  return (
    <>
      <div
        onClick={onClickToggle}
        className="absolute z-50 h-screen w-screen bg-black bg-opacity-70"
      />
      <div className="absolute top-1/2 left-1/2 z-50 h-screen w-screen -translate-x-1/2 -translate-y-1/2 transform space-y-4 overflow-scroll border-2 bg-white px-10 py-12 leading-8 lg:h-[80%] lg:w-[80%]">
        <div className="lg:hidden">
          <CloseBtn onClickClose={onClickToggle} />
        </div>
        <h1 className="text-4xl font-bold">推奨環境・ブラウザ</h1>
        <p>
          memoriesを快適にご利用いただくため、下記の環境でご覧いただくことを推奨いたします。
        </p>
        <p>
          当サービスでは動画・画像を取り扱う場合があります。その際、
          <span className="border-b border-slate-800 font-bold">
            スマートフォン / タブレットの場合は動画が表示されない
          </span>
          ため、PCでのご利用を推奨します。
          画像のみを取り扱う場合、スマートフォン・タブレットでも問題なくご利用いただけます。
        </p>
        <h2 className="border-b border-slate-300 pb-3 text-3xl font-bold">
          PC
        </h2>
        <h3 className="text-xl font-bold">ブラウザ</h3>
        <ul className="ml-8 list-disc">
          <li>Google Chrome</li>
          <li>FireFox</li>
          <li>Edge</li>
          <li>Safari</li>
        </ul>
        <h2 className="border-b border-slate-300 pb-3 text-3xl font-bold">
          タブレット / スマートフォン
        </h2>
        <h3 className="text-xl font-bold">ブラウザ</h3>
        <ul className="ml-8 mb-10 list-disc">
          <li>FireFox</li>
          <li>Edge</li>
          <li>Safari</li>
        </ul>
        ※推奨環境以外でご覧いただいた場合、
        本サイトがご利用できない、もしくは正しく表示されない可能性がございます。
        ※正しくご利用いただくため、下記項目を設定していただくことをおすすめいたします。
        ・スタイルシートを有効にする ・JavaScript を有効にする ・Cookie
        利用を有効にする
      </div>
    </>
  );
});
