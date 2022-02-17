import { memo } from "react";
// コンポーネント
import { HeaderRegBtn } from "../atoms/HeaderRegBtn";
import { Header } from "../organisms/Header";

export const Login = memo(() => {
  return (
    <>
      <Header>
        <HeaderRegBtn />
      </Header>
      <div className="pt-14">
        <>ログイン画面</>
      </div>
    </>
  );
});
