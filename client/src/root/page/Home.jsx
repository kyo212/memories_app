import { memo } from "react";

export const Home = memo(() => {
  return (
    <>
      <>Memoryへようこそ！</>
      <br />
      <br />
      <a href="/login">ログイン</a>
      <br />
      <a href="/register">新規登録</a>
    </>
  );
});
