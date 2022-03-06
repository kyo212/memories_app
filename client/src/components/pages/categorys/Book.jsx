import { memo, useState } from "react";
import { useLocation } from "react-router-dom";
// コンポーネント
import { ChangeJapanese } from "../../atoms/ChangeJapanese";

export const Book = memo(() => {
  // ルーター
  const location = useLocation();
  const { category, bookId, bookTitle, username, coverImage, date } =
    location.state;
  // 画像情報
  const [imageState, setImageState] = useState([]);
  const [textState, setTextState] = useState([]);

  // 回す画像配列
  const bookImages = [coverImage, ...imageState];
  const bookText = ["表紙", ...textState];

  return (
    <>
      <div className="flex h-screen w-screen snap-x overflow-x-scroll">
        <div className="flex w-20 items-center  border p-2">家族</div>
        {/* 表紙情報を受け取って表示させる */}
        <div className="h-full w-screen snap-start bg-white">
          <div className="h-1/2 w-screen border">
            <img
              src={coverImage}
              alt="表紙の画像"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex h-1/2 w-screen flex-col items-center justify-center">
            <div className="h-[88%] w-[96%] border ">
              {/* <p>{bookId}</p> */}
              <h1 className="text-4xl font-bold text-slate-700">{bookTitle}</h1>
              <p>
                <ChangeJapanese category={category} />
              </p>
              <p>{date}</p>
              <p>作成者 :{username}</p>
              <p>{category === "child" && <>誕生日を入力</>}</p>
            </div>
            <div className="flex">
              <p>
                <a href="/mybooks" className="text-sm text-blue-800">
                  本一覧へ戻る
                </a>
              </p>
              <p className="mx-2">1/2</p>
            </div>
          </div>
        </div>
        {/* 取得したコンテンツをmapで回す */}
        <div className="h-full w-screen snap-start bg-white">
          <div className="h-1/2 w-screen border">
            <label className="h-full w-screen">
              <input type="file" accept="*" className="hidden" />
              <img
                // src={}
                alt="表紙の画像"
                className="h-full w-full object-cover"
              />
            </label>
          </div>
          <div className="h-1/2">
            <p>追加画面 常に最後尾に配置する</p>
            <p>タイトルを入力 (子供とひなまつり)</p>
            <p>説明 (今日はひなまつりをしたよ)</p>
            <p>aaaaaaaaaaaaa</p>
            <button>追加</button>
          </div>
        </div>
      </div>
    </>
  );
});
