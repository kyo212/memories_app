import { memo, useEffect, useState } from "react";
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

export const Home = memo(() => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("家族");
  // カスタムフック
  const { tabs } = useStyle();
  const { tabAnimation } = tabs;

  useEffect(() => {
    const getLoginState = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        loggedIn ? navigate(`/mybooks`) : navigate("/");
      });
    };
    getLoginState();
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <Header root={"/"}>
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
                <h2 className="space-y-2 rounded-md py-2 px-4 text-sm font-bold">
                  <p>
                    デジタルな
                    <span>フォトブック</span>に<br />
                    思い出を自由に残そう。
                  </p>
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
          </div>
          <div className="h-full w-full">
            <div className="my-0 mx-auto h-[40%] w-[85%] text-center">
              <h2 className="mt-10 mb-2 border-b text-xl font-bold text-slate-800">
                1:フォトブックを作ろう。
              </h2>
              <h2 className="mt-10 mb-2 border-b text-xl font-bold text-slate-800">
                2:本の中身を作ろう。
              </h2>
              <h2 className="mt-10 border-b text-xl font-bold text-slate-800">
                memoriesの特徴:細かい情報を残そう。
              </h2>
              <h2 className="mt-10 border-b text-xl font-bold text-slate-800">
                memoriesの特徴:カテゴリーを活用しよう。
              </h2>
              {/* タブ */}
              <Tab
                animation={tabAnimation}
                ulClass={"my-10 space-x-1"}
                setCategory={setCategory}
              />
              <TabInform category={category} />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
});
