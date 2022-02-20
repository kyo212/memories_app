import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
// コンポーネント
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
// サードパーティ
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

export const Login = memo(() => {
  const navigate = useNavigate();
  const [passToggle, setPassToggle] = useState(false);

  const login = () => {
    navigate("/mybooks"); // 登録時
  };

  return (
    <>
      <Header root={"/"}>
        <HeaderRegBtn />
      </Header>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
          <h1 className="my-10 text-2xl font-bold text-slate-600">
            ログインする
          </h1>
          <p className="text-sm text-slate-600">
            まだ新規登録がお済みでない場合は
            <a
              href="/register"
              className="border-b border-blue-400 text-blue-800"
            >
              新規登録
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
          <a href="/password-change" className="text-sm text-blue-800">
            パスワードを忘れた場合
          </a>
          <button
            type="submit"
            onClick={() => {
              login();
            }}
            className={
              "my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md"
            }
          >
            はじめる
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
});
