import { memo } from "react";

export const MyBooks = memo(() => {
  // 追加したカテゴリタグがfamiryだった場合、famiryルートへ遷移
  return (
    <>
      <>本一覧画面</>
      <br />
      <div>
        {/* 選んだタグの名前をパスに入れる */}
        <a href="/book">book1</a>
      </div>
      <div>
        <a href="/book">book2</a>
      </div>
      <br />
      <a href="/">ログアウト</a>
    </>
  );
});
