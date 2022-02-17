import { memo } from "react";
import { useNavigate } from "react-router-dom";

export const Book = memo(() => {
  const navigate = useNavigate();
  navigate("family");
  return (
    <>
      <>本の内容画面</>
      <br />
      <br />
      <a href="/mybooks">本一覧画面へ</a>
      <br />
      <br />
      <a href="/">ログアウト</a>
    </>
  );
});
