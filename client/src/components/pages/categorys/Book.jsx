import { memo, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
// コンポーネント
import { ChangeJapanese } from "../../atoms/ChangeJapanese";
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";
// コンテキスト
import { Context } from "../../../App";

export const Book = memo(() => {
  // ルーター
  const location = useLocation();
  // 情報
  const [locationState, setLocationState] = useState([]);
  const { category, bookId, bookTitle, username, coverImage, date } =
    locationState;
  const [fontChange, setFontChange] = useState(""); // フォント切り替え
  // 画像の情報
  const [imageState, setImageState] = useState([]);
  const [textState, setTextState] = useState([]);
  // Toggel
  const [unExpectErr, setUnExpectErr] = useState(false);
  // コンテキスト
  const { modalImageUrl, videoUrl } = useContext(Context);
  // 回す画像配列
  const bookImages = [coverImage, ...imageState];
  const bookText = ["表紙", ...textState];

  useEffect(() => {
    // location.stateに値がない場合(urlから直接 mybools/book へアクセスされたとき)にコンテンツを表示させないようにする
    if (location.state) {
      setLocationState(location.state);
    } else {
      setUnExpectErr(true);
    }
  }, []);

  return (
    <>
      {unExpectErr ? (
        <div className="mt-[40%] flex h-screen w-screen flex-col items-center">
          <p className="text-xl font-bold">予期せぬエラーが発生しました</p>
          <a href="/mybooks" className="text-sm text-blue-800">
            一覧画面へ戻る
          </a>
        </div>
      ) : (
        <div
          className={`${fontChange} flex h-screen w-screen snap-x overflow-x-scroll`}
        >
          <div className="flex items-center">家族</div>
          {/* 表紙情報 */}
          <div className="h-full w-screen snap-start bg-white">
            <div className="h-1/2 w-screen">
              <img
                src={coverImage}
                alt="表紙の画像"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex h-1/2 w-screen flex-col items-center justify-center">
              <div className="h-[82%] w-[90%]">
                {/* <p>{bookId}</p> */}
                <h1 className="text-2xl font-bold text-slate-700">
                  {bookTitle}
                </h1>
                <p className="text-md text-slate-500">
                  <ChangeJapanese category={category} />
                </p>
                <p className="text-md font-bold text-slate-500">{date}</p>
                <p>作成者 :{username}</p>
                <button onClick={() => setFontChange("font-serif")}>
                  セリフ
                </button>
                <button onClick={() => setFontChange("font-suns")}>
                  デフォルト
                </button>

                {/* カテゴリー専用のインプット要素 */}
                <div className="mt-10 text-sm">
                  {category === "diary" ? (
                    <div className="">
                      <>日記専用</>
                    </div>
                  ) : category === "family" ? (
                    <div className="">
                      家族構成
                      <select name="" id="">
                        <option value="aaa">母親</option>
                        <option value="">1人</option>
                        <option value="">2人</option>
                      </select>
                      <select name="" id="">
                        <option value="aaa">父親</option>
                        <option value="">1人</option>
                        <option value="">2人</option>
                      </select>
                      <select name="" id="">
                        <option value="aaa">子供</option>
                        <option value="">1人</option>
                      </select>
                    </div>
                  ) : category === "child" ? (
                    <div>
                      <div className="flex h-24 flex-col justify-center">
                        <span className="font-bold">
                          生まれた時間 (誕生日と現在の年齢を自動算出)
                        </span>
                        {true ? (
                          <>
                            <input
                              type="date"
                              className="border border-black py-2 pl-2"
                            />
                            <input
                              type="number"
                              placeholder="例 1230 → 12時30分"
                              className="border border-black py-2 pl-2"
                            />
                          </>
                        ) : (
                          <>生まれた時間 誕生日 年齢</>
                        )}
                      </div>
                      <div className="flex h-20 flex-col justify-center">
                        <span className="font-bold">生まれたときのグラム</span>
                        {true ? (
                          <input
                            type="number"
                            placeholder="例 2000"
                            className="border border-black py-2 pl-2"
                          />
                        ) : (
                          <>グラム</>
                        )}
                      </div>
                    </div>
                  ) : category === "pet" ? (
                    <div className="">
                      <>ペット専用</>
                    </div>
                  ) : category === "hoby" ? (
                    <div className="">
                      <>趣味専用</>
                    </div>
                  ) : category === "friend" ? (
                    <div className="">
                      <>友達専用</>
                    </div>
                  ) : category === "lover" ? (
                    <div className="">
                      <>恋人専用</>
                    </div>
                  ) : category === "travel" ? (
                    <div className="">
                      <>旅行専用</>
                    </div>
                  ) : (
                    category === "portfolio" && (
                      <div className="">
                        <>作品専用</>
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="flex">
                <p>
                  <a href="/mybooks" className="text-sm text-blue-800">
                    一覧画面へ戻る
                  </a>
                </p>
                <p className="mx-2">1/2</p>
              </div>
            </div>
          </div>
          {/* 取得したコンテンツをmapで回す */}
          <div className="h-full w-screen snap-start bg-white">
            <div className="h-1/2 w-screen border">
              <ImageUrlCreate
                imageStyle="h-full w-screen"
                acceptType="*"
                imageUrl={modalImageUrl}
                videoUrl={videoUrl}
              />
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
      )}
    </>
  );
});
