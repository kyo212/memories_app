import { memo } from "react";

export const Login = memo(() => {
  return (
    <>
      <>ログイン画面</>
      <br />
      <br />
      <a href="/mybooks">ログイン</a>
      <br />
      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/register">新規登録</a>
    </>
  );
});
