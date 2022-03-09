import { memo, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
// アイコン
import { HiUpload } from "react-icons/hi";
import { BsChevronDoubleLeft } from "react-icons/bs";
import { BsChevronDoubleRight } from "react-icons/bs";
import { BsFillBookmarkFill } from "react-icons/bs";
import { BsHouse } from "react-icons/bs";
// コンポーネント UI系
import { ChangeFont } from "../atoms/ChangeFont";
import { Button } from "../atoms/button/Button";
// コンポーネント 処理系
import { ImageUrlCreate } from "../organisms/ImageUrlCreate";
import { ChangeJapanese } from "../atoms/ChangeJapanese";
// カスタムフック
import { useForceUpdate } from "../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../App";

export const Book = memo(() => {
  // ルーター
  const navigate = useNavigate();
  const location = useLocation();
  // 情報
  const [bookContents, setBookContents] = useState([]);
  const [locationState, setLocationState] = useState([]);
  const { category, bookId, bookTitle, username, coverImage, date, favorite } =
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
    imageUrl,
    setImageUrl,
    videoUrl,
    setVideoUrl,
    imageFile,
    setImageFile,
    videoFile,
    setVideoFile,
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
            setImageUrl("");
            setVideoUrl("");
            setImageFile("");
            setVideoFile("");
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
            imageFile !== "" // imageの値が入っている場合
              ? imageFile // imageを渡す
              : videoFile !== "" && videoFile, // videoの値が入っている場合はvideoを渡す
        });
        const bookMedia = url.split("?")[0]; // imageかvideoのURL
        if (imageFile !== "") {
          // imageの値が入っている場合
          insert(bookMedia, "");
        } else if (videoFile !== "") {
          insert("", bookMedia);
        }
      }
    );
  };

  const resetBtn = () => {
    setImageUrl("");
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
            <div className="relative flex h-1/2 w-screen flex-col items-center justify-center">
              <>
                {favorite ? (
                  <span className="absolute top-3 right-3 text-2xl text-red-500">
                    <BsFillBookmarkFill />
                  </span>
                ) : (
                  <></>
                )}
              </>
              {/* テキスト */}
              <div
                className="h-[90%] w-[90%]
text-slate-500"
              >
                <div className="mt-10 flex w-full flex-col items-center justify-center">
                  <h1 className="text-2xl border-b pb-2 text-slate-700">
                    太郎の成長日記のしるし。
                  </h1>
                  <div className="my-2 space-y-2 text-center">
                    <p className="text-md">{date}</p>
                    <p className="text-xl">
                      {username || "kyo"}
                      の<ChangeJapanese category={category} />
                    </p>
                  </div>
                  <div className="">
                    <ChangeFont setFontChange={setFontChange} />
                  </div>
                </div>
                <div className="absolute left-0 bottom-0 flex h-10 w-screen items-center justify-center space-x-4 text-xl text-slate-500">
                  <BsChevronDoubleLeft />
                  {/* 最初へ */}
                  <button className="flex w-12 justify-center">
                    <a href="/mybooks">
                      <BsHouse />
                    </a>
                  </button>
                  {/* 最後へ */}
                  <BsChevronDoubleRight />
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
                    <div className="relative h-[85%] w-[90%]">
                      <div className="">
                        <p className="text-xl font-bold text-slate-800">
                          {title}
                        </p>
                      </div>
                      <div className="mt-4 w-[80%]">
                        <p className="text-md text-slate-600">{description}</p>
                      </div>
                      <div className="absolute bottom-0 flex space-x-4">
                        <p className="text-md text-slate-600">{date}</p>
                        <p>{`${index + 1} / ${bookContents.length}`}</p>
                        <button></button>
                      </div>
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
              {!imageUrl &&
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
                imageUrl={imageUrl}
                video={{
                  videoUrl,
                  videoAutoPlay: true,
                  videoCtrl: false,
                  videoLoop: true,
                }}
              />
            </div>
            {/* テキスト */}
            <div className="relative flex h-1/2 w-screen items-center justify-center">
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
                    cols="40"
                    rows="2"
                    value={bookContentDesc}
                    onChange={(e) => setBookContentDesc(e.target.value)}
                    className="border py-1 px-2 text-sm outline-none"
                  />
                </div>
                <div className="absolute bottom-0 my-4 w-[90%] space-y-2">
                  <button onClick={resetBtn} className="text-sm text-blue-800">
                    画像をリセット
                  </button>
                  <Button clickBtn={insertItem}>追加する</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
});
