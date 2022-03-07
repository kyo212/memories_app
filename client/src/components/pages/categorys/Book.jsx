import { memo, useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
// コンポーネント UI系
import { ChangeJapanese } from "../../atoms/ChangeJapanese";
import { ChangeFont } from "../../atoms/ChangeFont";
// コンポーネント 処理系
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
          {/* 画像 */}
          <div className="h-full w-screen snap-start bg-white">
            <div className="h-1/2 w-screen">
              <img
                src={coverImage}
                alt="表紙の画像"
                className="h-full w-full object-cover"
              />
            </div>
            {/* テキスト */}
            <div className="flex h-1/2 w-screen flex-col items-center justify-center">
              <div
                className="h-[82%] w-[90%] font-bold
text-slate-500"
              >
                {/* <p>{bookId}</p> */}
                <h1 className="text-2xl font-bold text-slate-700">
                  {bookTitle}
                </h1>
                <p className="text-sm">{date}</p>
                <p className="text-sm">
                  <ChangeJapanese category={category} />
                </p>
                <p className="text-sm">作成者 : {username}</p>
                <div className="my-2">
                  <ChangeFont setFontChange={setFontChange} />
                </div>
                {/* カテゴリー専用のインプット要素 */}
                <p>Not null を許可してbook_listに追加する</p>
                <div className="mt-4 text-sm">
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
                      <div className="flex flex-col justify-center">
                        <span className="font-bold">生まれた時間</span>
                        {true ? (
                          <>
                            <div className="flex space-x-2">
                              <input
                                type="date"
                                className="w-40 border py-2 pl-2"
                              />
                              <input
                                type="number"
                                placeholder="例 1230 (12時30分)"
                                className="w-40 border py-2 pl-2"
                              />
                            </div>
                          </>
                        ) : (
                          <>
                            生まれた時間 誕生日 年齢
                            (誕生日と現在の年齢を自動算出)
                          </>
                        )}
                      </div>
                      <div className="mt-4 flex w-40 flex-col justify-center">
                        <span className="font-bold">生まれたときのグラム</span>
                        {true ? (
                          <input
                            type="number"
                            placeholder="例 2000"
                            className="border py-2 pl-2"
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
          </div>
          {/* 取得したコンテンツをmapで回す */}
          <>
            <></>
          </>
          {/* 追加画面 */}
          <div className="h-full w-screen snap-start bg-white">
            {/* 画像 */}
            <div className="h-1/2 w-screen">
              <ImageUrlCreate
                imageStyle="h-full w-screen"
                acceptType="image/*,video/*"
                imageUrl={modalImageUrl}
                video={{ videoUrl, videoCtrl: false, videoLoop: true }}
              />
            </div>
            {/* テキスト */}
            <div className="flex h-1/2 w-screen items-center justify-center">
              <div className="h-[82%] w-[90%]">
                {/* 追加画面 常に最後尾に配置する */}
                <div className="">
                  <p className="text-xl">タイトルを入力</p>
                  <input
                    type="text"
                    className="border w-60 py-1 px-2 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-lg">説明</p>
                  <textarea
                    cols="30"
                    rows="7"
                    className="border py-1 px-2 text-sm outline-none"
                  ></textarea>
                </div>
                <button>追加</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
