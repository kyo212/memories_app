import { memo } from "react";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/HeaderLoginBtn";
import { Header } from "../organisms/Header";

export const Register = memo(() => {
  return (
    <>
      <Header>
        <HeaderLoginBtn />
      </Header>

      <div className="pt-14">
        <>新規登録画面</>
      </div>
    </>
  );
});
