import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// アイコン
import { BsArrowUp } from "react-icons/bs";
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
  const [scrollBtn, setScrollBtn] = useState(false);
  // カスタムフック
  const { tabs } = useStyle();
  const { tabAnimation } = tabs;
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);
  // スタイル共通化
  const contentStyle = "mb-10 pb-10 flex w-full justify-center text-center";
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

  useEffect(() => {
    // 取得し続ける
    document.addEventListener("scroll", onScroll);
  });

  const getScrollTop = () =>
    Math.max(
      window.pageYOffset,
      document.documentElement.scrollTop,
      document.body.scrollTop
    );

  const onScroll = () => {
    // position = 現在位置をピクセルで表す
    const position = getScrollTop();
    position > 120 ? setScrollBtn(true) : setScrollBtn(false);
  };

  const clickScrollTop = () => {
    // top0ピクセルに移動する
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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
              <h1 className="mt-2 text-3xl font-bold ">memories</h1>
              <label className="mb-4 text-sm">メモリーズ</label>
              <h2 className="space-y-2 rounded-md py-2 px-4 text-sm font-bold">
                <p>
                  <span>フォトブック</span>に<br />
                  思い出を自由に残そう。
                </p>
                <p>スマホやパソコンに眠っている思い出の写真も何気ない写真も</p>
              </h2>
            </div>
            <div className="mt-64 flex w-full justify-center font-bold text-slate-800">
              <div className="flex h-52 w-52 flex-col justify-center space-y-2 rounded-full border-x border-b bg-white py-4 text-center">
                <p>
                  思い出を
                  <span className="ml-1 text-pink-600">残す</span>
                </p>
                <p>
                  思い出を
                  <span className="ml-1 text-blue-600">振り返る</span>
                </p>
                <p>
                  思い出を
                  <span className=" ml-1 text-amber-600">共有する</span>
                </p>
                <p>
                  思い出を
                  <span className=" ml-1 text-green-600">知る</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className={`${contentStyle} mt-32`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-8 border-b pb-4 text-xl font-bold text-slate-800">
                memoriesとは
              </h3>
              <div className="text-md space-y-2">
                <p>思い出を残すフォトブックとして使えます。</p>
                <p>
                  どんな小さな思い出も、大切な思い出も、memoriesに残しましょう。
                </p>
              </div>
            </div>
          </div>
          <div className={`${contentStyle} bg-slate-100`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 w-full border-b pb-4 text-lg font-bold text-slate-800">
                たくさんのフォトブックをつくることができます
              </h3>
              <div className="space-y-4 rounded-md bg-white p-6 shadow-md">
                <p className="font-bold">表紙を作成</p>
                <p>
                  フォトブックのタイトルを入力して、表紙に載せたい画像とカテゴリーを選ぶだけで簡単作成。
                </p>
                <p className="font-bold">フォトブックをつくる</p>
                <p>
                  表紙を作成したら、あとは好きな写真を載せて自由にフォトブックをつくるだけ。
                </p>
              </div>
            </div>
          </div>
          <div className={contentStyle}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                思い出をふりかえることができます
              </h3>
              <>
                <p>
                  スマホでも、パソコンでも、いつでもどこでも思い出を振り返ることができます。
                </p>
              </>
            </div>
          </div>
          <div className={`${contentStyle} bg-slate-100`}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                みんなに思い出を見せることができます
              </h3>
              <div className="">
                <p></p>
              </div>
            </div>
          </div>
          <div className={contentStyle}>
            <div className={sentenceStyle}>
              <h3 className="mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800">
                みんなの思い出を知ることができます
              </h3>
            </div>
          </div>
          <div className={`${contentStyle} bg-slate-100`}>
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
                ulClass={
                  "my-5 space-x-1 flex flex-wrap items-center justify-center text-center"
                }
                setCategory={setCategory}
              />
              <TabInform category={category} />
            </div>
          </div>
        </section>
        <button
          onClick={clickScrollTop}
          className={[
            scrollBtn
              ? "fixed bottom-2 right-2 transform animate-bounce rounded-full border bg-white p-2 opacity-100 shadow-md transition-all duration-1000"
              : "transform opacity-0 transition-all duration-1000",
          ]}
        >
          <BsArrowUp />
        </button>
        <div className="">
          さっそくみんなのフォトブックをみる↓
          <a href="/public">みんなのフォトブック</a>
        </div>
      </main>
      <footer>{/* <Footer /> */}</footer>
    </>
  );
});
