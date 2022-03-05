import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Tab } from "../molecles/tabs/Tab";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { TabInform } from "../molecles/tabs/TabInform";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Home = memo(() => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("家族");
  // カスタムフック
  const { tabs } = useStyle();
  const { tabAnimation } = tabs;
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);
  // スタイル共通化
  const commonStyle = "mb-10 pb-10 flex w-full justify-center text-center";
  const sentenceStyle = "w-[85%] leading-6";

  useEffect(() => {
    const getLoginState = () => {
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/loginState`).then(
        (response) => {
          const { loggedIn } = response.data;
          loggedIn ? navigate(`/mybooks`) : navigate("/");
        }
      );
    };
    getLoginState();
  }, []);

  return (
    <>
      <header>
        <Header root={"/"} headerOpen={{ headerToggle, setHeaderToggle }}>
          <HeaderLoginBtn />
          <HeaderRegBtn />
        </Header>
      </header>
      <main className="h-full w-full text-slate-800">
        {/* bg-image */}
        <section className="bg-bg-image flex h-screen justify-center bg-cover pt-14 sm:h-full">
          <div className="w-[90%]">
            {/* bg-white */}
            <div className="mt-4 flex h-56 w-full flex-col items-center justify-center space-y-2 text-center ">
              <h1 className="mt-2 text-2xl font-bold ">memories</h1>
              <label className="mb-4 text-sm">メモリーズ</label>
              <h2 className="space-y-2 rounded-md py-2 px-4 text-sm font-bold">
                <p>
                  デジタルな
                  <span>フォトブック</span>に<br />
                  思い出を自由に残そう。
                </p>
                <p>スマホやパソコンに眠っている思い出の写真も何気ない写真も</p>
              </h2>
            </div>
            <div className="mt-[50px] flex w-full justify-center font-bold text-slate-800">
              <div className="w-40 space-y-3">
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
        </section>

        <section>
          <div className={commonStyle}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                memoriesとは
              </h3>
              <p>memoriesはデジタルなフォトブック。</p>
              <br />
              <p>
                どんな小さな思い出も、何気なく撮った写真も、子供の成長も、趣味も、毎日の日記まで、すべてmemoriesに残すことができます。
              </p>
            </div>
          </div>
          <div className={`${commonStyle} bg-slate-100`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 w-full border-b pb-4 text-lg font-bold text-slate-800">
                たくさんの本をつくることができます
              </h3>
              <div className="space-y-4 rounded-md bg-white p-6 shadow-md">
                <p>作成日時は自動で追加されます。</p>
                <p>
                  フォトブックのタイトルと表紙を追加して、カテゴリーを決めるだけで簡単にフォトブックを作成することができます。
                </p>
                <p>
                  あとは、フォトブックを開いて画像と文章をのせるだけで簡単にフォトブックをつくることができます。
                </p>
              </div>
            </div>
          </div>
          <div className={commonStyle}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                思い出をふりかえることができます
              </h3>
              <p>
                デジタルだからいつでもどこでもフォトブックをみて思い出を振り返れます。
              </p>
            </div>
          </div>
          <div className={`${commonStyle} bg-slate-100`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                みんなに思い出を見せることができます
              </h3>
            </div>
          </div>
          <div className={commonStyle}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                みんなの思い出を知ることができます
              </h3>
            </div>
          </div>
          <div className={`${commonStyle} bg-slate-100`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                memoriesの特徴
              </h3>
              <div className="rounded-lg bg-white p-4 leading-8 text-slate-700 shadow-md">
                <p>
                  カテゴリーがたくさんあるから
                  <br />
                  どんな思い出も残せます。
                </p>
              </div>
              <Tab
                animation={tabAnimation}
                ulClass={"my-5 space-x-1"}
                setCategory={setCategory}
              />
              <TabInform category={category} />
            </div>
          </div>
        </section>
      </main>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
});
