import { memo } from "react";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/HeaderLoginBtn";
import { HeaderRegBtn } from "../atoms/HeaderRegBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";

export const Home = memo(() => {
  return (
    <div className="h-full w-full">
      <Header>
        <HeaderLoginBtn />
        <HeaderRegBtn />
      </Header>
      <div className="h-full w-full text-slate-800">
        {/* bg-image */}
        <div className="bg-bg-image flex h-[105%] justify-center bg-cover pt-14 sm:h-full">
          <div className="w-[90%]">
            {/* bg-white */}
            <div className="mt-4 flex h-56 w-full flex-col items-center justify-center space-y-2 rounded-md bg-white bg-opacity-80 text-center shadow-md">
              <h1 className="my-2 border-b text-2xl font-bold ">memories</h1>
              <h2 className="space-y-2 px-4 text-sm font-thin">
                <p>
                  memoriesはデジタルな
                  <span className="border-b">フォトブック</span>。
                </p>
                <p>
                  アナログなフォトブックでは伝えきれない情報は、memoriesで解決します。
                </p>
              </h2>
            </div>
            <div className="mt-[76px] space-y-3 text-center font-bold text-slate-800">
              <p>
                思い出を
                <span className="ml-1 text-pink-600">"残す"</span>
              </p>
              <p>
                思い出を
                <span className="ml-1 text-blue-600">"振り返る"</span>
              </p>
              <p>
                思い出を
                <span className=" ml-1 text-amber-600">"共有する"</span>
              </p>
              <p>
                思い出を
                <span className=" ml-1 text-green-600">"知る"</span>
              </p>
            </div>
          </div>
        </div>
        <div className="my-0 mx-auto h-[40%] w-[90%] text-center">
          <h2 className="mt-10 mb-2 border-b text-xl font-bold text-slate-800">
            フォトブックを作ろう。
          </h2>
          <h2 className="mt-10 mb-2 border-b text-xl font-bold text-slate-800">
            カテゴリーを活用しよう。
          </h2>
          <ul className="grid grid-flow-col rounded-full bg-gray-100 p-1 text-center text-gray-500">
            <li>
              <a href="#page1" className="flex justify-center py-2">
                家族
              </a>
            </li>
            <li>
              <a
                href="#page2"
                className="flex justify-center rounded-full bg-white py-2 text-indigo-900 shadow"
              >
                ペット
              </a>
            </li>
            <li>
              <a href="#page3" className="flex justify-center py-2">
                趣味
              </a>
            </li>
            <li>
              <a href="#page4" className="flex justify-center py-2">
                友達
              </a>
            </li>
            <li>
              <a href="#page5" className="flex justify-center py-2">
                恋人
              </a>
            </li>
            <li>
              <a href="#page5" className="flex justify-center py-2">
                旅行
              </a>
            </li>
          </ul>
          <div>
            <p>aaaaaaaa</p>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
});
