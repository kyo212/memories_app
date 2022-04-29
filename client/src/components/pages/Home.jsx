import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import homeImage1 from "../../images/home_image1.png";
import homeImage3 from "../../images/home_image3.png";
import homeImage4 from "../../images/home_image4.png";
import homeImage5 from "../../images/home_image5.png";
import homeImage6 from "../../images/home_image6.png";
// アイコン
import { BsArrowUp } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Header } from "../organisms/Header";
// コンテキスト
import { Context } from "../../App";

export const Home = memo(() => {
  const navigate = useNavigate();
  const [scrollBtn, setScrollBtn] = useState(false);
  const [animationTopText, setAnimationTopText] = useState(false);
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);
  // スタイル共通化
  const contentStyle = "mb-8 flex w-full justify-center text-center lg:pb-20";
  const sentenceStyle = "w-[85%] leading-6 lg:w-[70%]";
  const responsiveText =
    "sm:pb-6 sm:text-2xl md:text-3xl lg:my-24 xl:pb-10 xl:text-4xl";
  const homeImageStyle =
    "col-span-3 my-0 mx-auto h-52 w-52 md:h-72 md:w-72 lg:h-full lg:w-full";
  const gridStyle = "grid-cols-7 items-center gap-10 md:grid";

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
    setAnimationTopText(true);
  }, []);

  const getScrollTop = () =>
    // Math.max - 引数に与えられた数値の中で一番大きい数値を返す。
    Math.max(
      // 垂直方向のスクロール量。それぞれ返す結果は同じ。
      window.pageYOffset,
      document.documentElement.scrollTop, // 標準モード
      document.body.scrollTop // 互換モード
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

  const toHelpPage = () => {
    navigate("help", { state: { root: "fromHome" } });
  };

  return (
    <>
      <header>
        <Header root={"/"} headerOpen={{ headerToggle, setHeaderToggle }}>
          <button onClick={toHelpPage} className={""}>
            <BsQuestionCircle className="text-md mx-2 h-6 w-6 rounded-full bg-white bg-opacity-40 text-slate-500" />
          </button>
          <HeaderLoginBtn />
          <HeaderRegBtn />
        </Header>
      </header>
      <main className="h-full w-full text-slate-800">
        {/* bg-image */}
        <section className="bg-bg-image flex h-screen justify-center bg-cover sm:h-full">
          <div className="flex h-screen w-full flex-col items-center justify-center space-y-2 text-center">
            <h1
              className={`${[
                animationTopText
                  ? "translate-y-0"
                  : "-translate-y-10  opacity-10",
              ]} transform text-3xl font-bold text-slate-700 transition-all duration-1000 sm:mb-4 sm:text-[50px] md:mb-8 md:text-[60px] lg:text-[70px]`}
            >
              memories
            </h1>
            <p
              className={`${[
                animationTopText
                  ? "translate-y-0"
                  : "-translate-y-10  opacity-0",
              ]} sm:text-md mb-4 transform text-sm transition-all delay-300 duration-1000 md:mb-4 md:text-xl`}
            >
              メモリーズ
            </p>
            <h2
              className={`${[
                animationTopText
                  ? "translate-y-0"
                  : "-translate-y-10 opacity-0",
              ]} transform space-y-2 rounded-md py-2 px-4 text-sm font-bold text-slate-700 transition-all delay-700 duration-1000 md:text-lg`}
            >
              <p>フォトブックに</p>
              <p>思い出を自由に残そう。</p>
            </h2>
          </div>
        </section>

        <section>
          <div className={`${contentStyle}`}>
            <div className={sentenceStyle}>
              <h3
                className={`mt-10 border-b pb-4 text-xl font-bold text-slate-800 ${responsiveText}`}
              >
                memoriesとは
              </h3>
              <div className={gridStyle}>
                <img
                  src={homeImage3}
                  alt="イメージイラスト"
                  className={homeImageStyle}
                />
                <div className="text-md col-span-4 space-y-2 rounded-md bg-white px-12 py-8 text-left shadow-md lg:text-lg">
                  <p>思い出を残すフォトブックとして使えます。</p>
                  <p>
                    どんな小さな思い出も、大切な思い出も、memoriesに残すことができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${contentStyle} bg-slate-50`}>
            <div className={sentenceStyle}>
              <h3
                className={`mt-10 mb-6 w-full border-b pb-4 text-lg font-bold text-slate-800 ${responsiveText}`}
              >
                たくさんのフォトブックをつくることができます
              </h3>
              <div className={gridStyle}>
                <div className="col-span-4 space-y-4 rounded-md bg-white px-12 py-8 shadow-md lg:text-lg">
                  <p className="font-bold">表紙を作成</p>
                  <p>
                    フォトブックのタイトルを入力して、表紙に載せたい画像とカテゴリーを選ぶだけで簡単作成。
                  </p>
                  <p className="font-bold">フォトブックをつくる</p>
                  <p>
                    表紙を作成したら、あとは好きな写真を載せて自由にフォトブックをつくるだけ。
                  </p>
                </div>
                <img
                  src={homeImage4}
                  alt="イメージイラスト"
                  className={homeImageStyle}
                />
              </div>
            </div>
          </div>
          <div className={contentStyle}>
            <div className={sentenceStyle}>
              <h3
                className={`mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800 ${responsiveText}`}
              >
                思い出をふりかえることができます
              </h3>
              <div className={gridStyle}>
                <img
                  src={homeImage1}
                  alt="イメージイラスト"
                  className={homeImageStyle}
                />
                <div className="col-span-4 rounded-md bg-white px-12 py-8 shadow-md lg:text-lg">
                  <p>
                    スマホでも、パソコンでも、いつでもどこでも思い出を振り返ることができます。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className={`${contentStyle} bg-slate-50`}>
            <div className={sentenceStyle}>
              <h3
                className={`mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800 ${responsiveText}`}
              >
                みんなに思い出を見せることができます
              </h3>
              <div className={gridStyle}>
                <div className="col-span-4 space-y-4 rounded-md bg-white p-6 shadow-md lg:text-lg">
                  <p>つくったフォトブックはみんなに共有することができます。</p>
                  <p>共有されたフォトブックは誰でも見ることができます。</p>
                </div>
                <img
                  src={homeImage5}
                  alt="イメージイラスト"
                  className={homeImageStyle}
                />
              </div>
            </div>
          </div>
          <div className={contentStyle}>
            <div className={sentenceStyle}>
              <h3
                className={`mt-10 mb-6 border-b pb-4 text-lg font-bold text-slate-800 ${responsiveText}`}
              >
                みんなの思い出を知ることができます
              </h3>
              <div className={gridStyle}>
                <img
                  src={homeImage6}
                  alt="イメージイラスト"
                  className={homeImageStyle}
                />
                <p className="col-span-3 space-y-4 rounded-md bg-white p-6 shadow-md lg:text-lg">
                  みんなの共有されたフォトブックを見ることができます。
                </p>
              </div>
            </div>
          </div>
        </section>
        <button
          onClick={clickScrollTop}
          className={[
            scrollBtn
              ? "fixed bottom-2 right-2 transform animate-bounce rounded-full border border-black bg-slate-800 p-4 opacity-70 shadow-md transition-all duration-1000"
              : "fixed -bottom-20 right-2 transform p-4 opacity-0 transition-all duration-1000",
          ]}
        >
          <BsArrowUp className="text-white" />
        </button>
        <div className="flex items-center justify-center">
          <div className="mt-4 mb-20 flex items-center rounded-xl border bg-sky-600 px-3 py-2 text-sm font-bold text-white shadow-md active:bg-sky-900 md:px-6 md:py-4 md:text-lg">
            <BsBoxArrowUpRight />
            <a href="/public" className="ml-2">
              みんなのフォトブック
            </a>
          </div>
        </div>
      </main>
    </>
  );
});
