import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
// サードパーティ
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

export const Register = memo(() => {
  const navigate = useNavigate();
  const [passToggle, setPassToggle] = useState(false);
  const [checkBoxFirst, setCheckBoxFirst] = useState(false);
  const [checkBoxSecond, setCheckBoxSecond] = useState(false);

  const register = () => {
    checkBoxFirst && checkBoxSecond && navigate("/mybooks"); // 登録時
  };
  return (
    <>
      <Header root={"/"}>
        <HeaderLoginBtn />
      </Header>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
          <h1 className="my-10 text-2xl font-bold text-slate-600">
            新規登録をする
          </h1>
          <p className="text-sm text-slate-600">
            新規登録がお済みの方は
            <a href="/login" className="border-b border-blue-400 text-blue-800">
              ログイン
            </a>
            から
          </p>
          <form className="relative mt-8 mb-2 w-[210px] space-y-2 text-center">
            <input
              type="text"
              autoFocus
              placeholder="ユーザーネーム"
              className="rounded border border-slate-400 px-4 py-2 outline-none"
            />
            <input
              type={passToggle ? "text" : "password"}
              placeholder="パスワード"
              className="rounded border border-slate-400 px-4 py-2 outline-none"
            />
            <span
              onClick={() => setPassToggle(!passToggle)}
              className="absolute right-2 top-[50px] text-2xl text-slate-600"
            >
              {passToggle ? (
                <BsFillEyeFill />
              ) : (
                <BsFillEyeSlashFill className="text-slate-400" />
              )}
            </span>
          </form>
          <div className="my-4 space-y-2 text-sm text-slate-800">
            <div className="flex items-center">
              <input
                type="checkbox"
                onClick={() => setCheckBoxFirst(!checkBoxFirst)}
              />
              <label className="ml-1">
                <a className="font-bold text-blue-800">利用規約</a>に同意する
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onClick={() => setCheckBoxSecond(!checkBoxSecond)}
              />
              <label className="ml-1">
                <a className="font-bold text-blue-800">プライバシーポリシー</a>
                に同意する
              </label>
            </div>
          </div>
          <button
            type="submit"
            onClick={() => {
              register();
            }}
            className={[
              checkBoxFirst && checkBoxSecond
                ? "my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md"
                : "my-6 cursor-not-allowed rounded-md bg-sky-900 p-2 px-4 font-bold text-white opacity-40 shadow-md",
            ]}
          >
            登録してはじめる
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
});
