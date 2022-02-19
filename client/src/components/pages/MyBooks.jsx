import { memo, useState } from "react";
// コンポーネント
import { HeaderLogoutBtn } from "../atoms/button/HeaderLogoutBtn";
import { FooterTab } from "../molecles/tabs/FooterTab";
import { Header } from "../organisms/Header";

export const MyBooks = memo(() => {
  const [arry, setArry] = useState([1, 2, 3, 4, 5, 6, 7]);
  // 追加したカテゴリタグがfamiryだった場合、famiryルートへ遷移
  return (
    <>
      <Header>
        <HeaderLogoutBtn />
      </Header>
      <div className="w-screen py-20">
        {/* 選んだタグの名前をパスに入れる */}
        <div className="my-0 mx-auto flex w-[90%] flex-wrap justify-between">
          {arry.map((item) => {
            return (
              <div key={item} className="relative">
                {/* 本の淵のUI */}
                <span className="absolute -top-[7px] -z-10 inline-block h-4 w-full rounded-xl border border-slate-300 bg-slate-100 " />
                <span className="absolute -right-1 -top-[7px] -z-10 inline-block h-[7px] w-[10px] rounded-full bg-white" />
                {/* 表紙 */}
                <div className="transform transition-all duration-700 hover:-translate-x-full z-10 mb-6 flex h-52 w-40 flex-col  items-center border border-slate-300 bg-white text-slate-700 shadow-md">
                  <div className="text-bold text-center flax mt-3 flex-col text-lg">
                    <p className="border-b">
                      Title
                    </p>
                    <label className="text-[6px] text-slate-400">
                      カテゴリー
                    </label>
                  </div>
                  <label className="h-[60%] w-[90%] border shadow-inner">
                    <input type="file" accept="image/*" className="hidden" />
                    {item}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* フッタータブ */}
      <FooterTab />
    </>
  );
});