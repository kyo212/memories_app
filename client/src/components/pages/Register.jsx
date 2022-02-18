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
      <>
        <>新規登録画面</>
      </>
    </>
  );
});
