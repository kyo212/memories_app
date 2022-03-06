import { memo, useState } from "react";
import { useLocation } from "react-router-dom";

export const Family = memo(() => {
  // ルーター
  const location = useLocation();
  const { bookId, bookTitle, username, coverImage } = location.state;
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
              <p>作成者 :{username}</p>
              <p>{bookTitle}</p>
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
          <div className="h-1/2 w-screen border">画像</div>
          <div className="h-1/2">
            <p>おもいで</p>
            <p>aaaaaaaaaaa</p>
            <p>aaaaaa</p>
            <p>aaaaaaaaaaaaa</p>
          </div>
        </div>
      </div>
    </>
  );
});
