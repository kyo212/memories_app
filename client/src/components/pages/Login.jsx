import { memo } from "react";
// コンポーネント
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Footer } from "../organisms/Footer";
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
        button={"はじめる"}
      >
        <a href="/password-change" className="text-sm text-blue-800">
          パスワードを忘れた場合
        </a>
      </LoginRegThema>
      <Footer />
    </>
  );
});
