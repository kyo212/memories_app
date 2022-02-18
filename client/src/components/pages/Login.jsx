import { memo } from "react";
// コンポーネント
import { HeaderRegBtn } from "../atoms/HeaderRegBtn";
import { Header } from "../organisms/Header";
import { LoginRegThema } from "../organisms/LoginRegThema";

export const Login = memo(() => {
  return (
    <>
      <Header>
        <HeaderRegBtn />
      </Header>
      <LoginRegThema
        root={"register"}
        title={"ログインする"}
        text={"まだ新規登録がお済みでない場合は"}
        rootText={"新規登録"}
      >
        <a href="/password-change" className="text-sm text-blue-800">
          パスワードを忘れた場合
        </a>
        <button className="my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md">
          始める
        </button>
      </LoginRegThema>
    </>
  );
});
