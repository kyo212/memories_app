import { memo } from "react";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/HeaderLoginBtn";
import { HeaderRegBtn } from "../atoms/HeaderRegBtn";
import { Header } from "../organisms/Header";

export const Home = memo(() => {
  return (
    <>
      <Header>
        <HeaderLoginBtn />
        <HeaderRegBtn />
      </Header>
      <div className="pt-14">
        <>Memoryへようこそ！</>
      </div>
    </>
  );
});
