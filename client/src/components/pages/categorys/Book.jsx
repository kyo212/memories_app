import { memo, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
// アイコン
import { HiUpload } from "react-icons/hi";
// コンポーネント UI系
import { ChangeJapanese } from "../../atoms/ChangeJapanese";
import { ChangeFont } from "../../atoms/ChangeFont";
import { Button } from "../../atoms/button/Button";
// コンポーネント 処理系
import { ImageUrlCreate } from "../../organisms/ImageUrlCreate";
// カスタムフック
import { useForceUpdate } from "../../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../../App";

export const Book = memo(() => {
  // ルーター
  const navigate = useNavigate();
  const location = useLocation();
  // 情報
  const [bookContents, setBookContents] = useState([]);
  const [locationState, setLocationState] = useState([]);
  const { category, bookId, bookTitle, username, coverImage, date } =
    locationState;
  const [fontChange, setFontChange] = useState(""); // フォント切り替え
  const [bookContentTitle, setBookContentTitle] = useState("");
  const [bookContentDesc, setBookContentDesc] = useState("");
  // Toggel
  const [unExpectErr, setUnExpectErr] = useState(false);
  // カスタムフック
  const [update, { setUpdate }] = useForceUpdate();
  // コンテキスト
  const {
    modalImageUrl,
    setModalImageUrl,
    videoUrl,
    setVideoUrl,
    imageFileUrl,
    setImageFileUrl,
    videoFileUrl,
    setVideoFileUrl,
  } = useContext(Context);

  useEffect(() => {
    // location.stateに値がない場合(urlから直接 mybools/book へアクセスされたとき)にコンテンツを表示させないようにする
    if (location.state) {
      setLocationState(location.state);
    } else {
      setUnExpectErr(true);
    }
  }, []);

  // 本のidを元に本の内容を取得
  useEffect(() => {
    const getItems = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/getBookContent`,
        {
          bookId: location.state.bookId,
        }
      ).then((response) => {
        const { result, err } = response.data;
        setBookContents(result);
      });
    };
    getItems();
  }, [update]);

  const insertItem = async () => {
    // awsのバケットURLを取得
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/s3Url`).then(
      (response) => {
        const { url } = response.data;

        const insert = async (bookImage, bookVideo) => {
          console.log({ bookImage, bookVideo });
          // 入力した情報をDBに追加
          await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/insert`, {
            bookId,
            username,
            bookImage,
            bookVideo,
            bookContentTitle,
            bookContentDesc,
          }).then((response) => {
            const { result, err } = response.data;
            console.log({ result, err });
            // 初期化
            setModalImageUrl("");
            setVideoUrl("");
            setImageFileUrl("");
            setVideoFileUrl("");
            setBookContentTitle("");
            setBookContentDesc("");
            // アップデート
            setTimeout(() => setUpdate(!update), 1000);
          });
        };

        // 画像パスの生成
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body:
            imageFileUrl !== "" // imageの値が入っている場合
              ? imageFileUrl // imageを渡す
              : videoFileUrl !== "" && videoFileUrl, // videoの値が入っている場合はvideoを渡す
        });
        const bookMedia = url.split("?")[0]; // imageかvideoのURL
        if (imageFileUrl !== "") {
          // imageの値が入っている場合
          insert(bookMedia, "");
        } else if (videoFileUrl !== "") {
          insert("", bookMedia);
        }
      }
    );
  };

  const resetBtn = () => {
    setModalImageUrl("");
    setVideoUrl("");
  };

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
            {bookContents.map(
              (
                { pageId, bookImage, bookVideo, title, description, date },
                index
              ) => (
                <div key={pageId} className="h-full w-screen snap-start">
                  {/* 画像 */}
                  <div className="relative h-1/2 w-screen bg-slate-100">
                    <ImageUrlCreate
                      imageStyle="h-full w-screen"
                      acceptType="image/*,video/*"
                      imageUrl={bookImage}
                      video={{
                        videoUrl: bookVideo,
                        videoAutoPlay: false,
                        videoCtrl: true,
                        videoLoop: false,
                      }}
                    />
                  </div>
                  {/* テキスト */}
                  <div className="flex h-1/2 w-screen items-center justify-center">
                    <div className="h-[82%] w-[90%]">
                      {/* 追加画面 常に最後尾に配置する */}
                      <div className="">
                        <p className="text-xl font-bold text-slate-800">
                          {title}
                        </p>
                      </div>
                      <div className="mt-4 w-[80%]">
                        <p className="text-md text-slate-600">{description}</p>
                      </div>
                      <div className="">
                        <p className="text-md text-slate-600">{date}</p>
                      </div>
                      <p>{`${index + 1} / ${bookContents.length}`}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </>
          {/* 追加画面 */}
          <div className="h-full w-screen snap-start">
            {/* 画像 */}
            <div className="relative h-1/2 w-screen bg-slate-100">
              {!modalImageUrl &&
                !videoUrl && ( // 画像と動画を設定されていない時だけ
                  <div className="absolute top-1/2 left-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border bg-white text-2xl font-bold">
                    <span className="animate-pulse">
                      <HiUpload />
                    </span>
                  </div>
                )}
              <ImageUrlCreate
                imageStyle="h-full w-screen"
                acceptType="image/*,video/*"
                imageUrl={modalImageUrl}
                video={{
                  videoUrl,
                  videoAutoPlay: true,
                  videoCtrl: false,
                  videoLoop: true,
                }}
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
                    value={bookContentTitle}
                    onChange={(e) => setBookContentTitle(e.target.value)}
                    className="w-60 border py-1 px-2 text-sm"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-lg">説明</p>
                  <textarea
                    cols="30"
                    rows="4"
                    value={bookContentDesc}
                    onChange={(e) => setBookContentDesc(e.target.value)}
                    className="border py-1 px-2 text-sm outline-none"
                  />
                </div>
                <div className="my-4 space-x-2">
                  <Button clickBtn={insertItem}>追加する</Button>
                  <Button clickBtn={resetBtn}>画像をリセット</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
