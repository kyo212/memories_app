import { memo } from "react";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Tab } from "../molecles/tabs/Tab";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const Home = memo(() => {
  return (
    <>
      <div className="h-full w-full">
        <Header>
          <HeaderLoginBtn />
          <HeaderRegBtn />
        </Header>
        <div className="h-full w-full text-slate-800">
          {/* bg-image */}
          <div className="bg-bg-image flex h-screen justify-center bg-cover pt-14 sm:h-full">
            <div className="w-[90%]">
              {/* bg-white */}
              <div className="mt-4 flex h-56 w-full flex-col items-center justify-center space-y-2 text-center ">
                <h1 className="mt-2 text-2xl font-bold ">memories</h1>
                <label className="mb-4 text-sm">メモリーズ</label>
                <h2 className="space-y-2 text-sm font-bold rounded-md py-2 px-4">
                  <p>
                    デジタルな
                    <span>フォトブック</span>に思い出を<br/>自由に残そう。
                  </p>
                </h2>
              </div>
              <div className="flex justify-center mt-[50px] w-full font-bold text-slate-800">
                <div className="space-y-3 w-40">
                  <p className="text-center">
                    思い出を
                    <span className="ml-1 text-pink-600">"残す"</span>
                  </p>
                  <p className="text-right">
                    思い出を
                    <span className="ml-1 text-blue-600">"振り返る"</span>
                  </p>
                  <p className="text-left">
                    思い出を
                    <span className=" ml-1 text-amber-600">"共有する"</span>
                  </p>
                  <p className="text-center">
                    思い出を
                    <span className=" ml-1 text-green-600">"知る"</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full w-full">
            <div className="my-0 mx-auto h-[40%] w-[85%] text-center">
              <h2 className="mt-10 mb-2 border-b text-xl font-bold text-slate-800">
                フォトブックを作ろう。
              </h2>
              <h2 className="mt-10 border-b text-xl font-bold text-slate-800">
                カテゴリーを活用しよう。
              </h2>
              {/* タブ */}
              <Tab />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
});
