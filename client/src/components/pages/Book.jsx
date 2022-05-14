import { memo, useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
// スライダー
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// アイコン
import {
  BsUpload,
  BsFillBookmarkFill,
  BsArrowRepeat,
  BsPencil,
  BsTrash,
  BsBoxArrowUpLeft,
  BsChevronDoubleLeft,
} from "react-icons/bs";
// コンポーネント UI系
import { ChangeFont } from "../atoms/ChangeFont";
import { Button } from "../atoms/button/Button";
// コンポーネント 処理系
import { ImageUrlCreate } from "../organisms/ImageUrlCreate";
import { ChangeJapanese } from "../atoms/ChangeJapanese";
// カスタムフック
import { useStyle } from "../custom/useStyle";
import { useForceUpdate } from "../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../App";
import { ConfirmDialog } from "../atoms/message/ConfirmDialog";

export const Book = memo(() => {
  // ルーター
  const navigate = useNavigate();
  const location = useLocation();
  // 情報
  const [bookContents, setBookContents] = useState([]);
  const [locationState, setLocationState] = useState([]);
  const {
    category,
    bookId,
    bookTitle,
    username,
    coverImage,
    date,
    favorite,
    publicBookMenu,
  } = locationState;
  const [fontChange, setFontChange] = useState(""); // フォント切り替え
  const [bookContentTitle, setBookContentTitle] = useState("");
  const [bookContentDesc, setBookContentDesc] = useState("");
  const [bookContentEditTitle, setBookContentEditTitle] = useState("");
  const [bookContentEditDesc, setBookContentEditDesc] = useState("");
  const [thisPageId, setThisPageId] = useState(0);
  // Toggel
  const [unExpectErr, setUnExpectErr] = useState(false);
  const [addTypeChange, setAddTypeChange] = useState(false);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [addPageModal, setAddPageModal] = useState(false);
  const [deleteInform, setDeleteInform] = useState({});
  const [edit, setEdit] = useState(false);
  const [bottomMenu, setBottomMenu] = useState(false);
  // メッセージ
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  // カスタムフック
  const { messageWindow, modals } = useStyle();
  const { modalConfirmAnimation } = modals;
  const { errorBorderMsg } = messageWindow;
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

  // スタイル共通化
  const iconStyle =
    "fixed text-lg lg:bottom-5 bottom-10 text-slate-500 hover:text-slate-800";
  const confirmWindowStyle =
    "flex h-40 w-[360px] transform flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-200 bg-white py-6 px-6 text-gray-700 transition-all duration-700 md:w-[580px]";

  useEffect(() => {
    // location.stateに値がない場合(urlから直接 mybools/book へアクセスされたとき)にコンテンツを表示させないようにする
    if (location.state) {
      // locationからデータを取得
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
        const { result } = response.data;
        setBookContents(result);
      });
    };
    getItems();
  }, [update]);

  const insertItem = async (type) => {
    if (!imageFile && !videoFile) {
      setErrMsgToggle(true);
    } else {
      // awsのバケットURLを取得
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/s3Url`).then(
        (response) => {
          const { url } = response.data;

          // 入力した情報をDBに追加
          const insert = async (bookImage, bookVideo) => {
            // バリデーション
            if (
              type === "mediaAndText" &&
              !bookContentTitle &&
              !bookContentDesc
            ) {
              // type(mediaAndText)かつタイトルと説明が空である場合
              setErrMsgToggle(true);
            } else if (
              type === "mediaOnly" ||
              (type === "mediaAndText" && bookContentTitle && bookContentDesc)
            ) {
              await Axios.post(
                `http://${process.env.REACT_APP_PUBLIC_IP}/insert`,
                {
                  bookId, // デフォルト
                  username, // デフォルト
                  bookImage, // 任意追加 nullを許可
                  bookVideo, // 任意追加 nullを許可
                  bookContentTitle, // 必須追加
                  bookContentDesc, // 必須追加
                }
              ).then((response) => {
                const { result, err } = response.data;
                console.log({ result, err });
                // 初期化
                setImageUrl("");
                setVideoUrl("");
                setImageFile("");
                setVideoFile("");
                setBookContentTitle("");
                setBookContentDesc("");
                setAddPageModal(false);
                // アップデート
                setTimeout(() => setUpdate(!update), 1000);
              });
            }
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

          if (imageFile) {
            insert(bookMedia, "");
          } else if (videoFile) {
            insert("", bookMedia);
          }
        }
      );
    }
  };

  const deleteItem = async (id) => {
    await Axios.delete(
      `http://${process.env.REACT_APP_PUBLIC_IP}/deletePage/${id}`
    ).then(() => {
      // DBから値を消してもstateには残っているため最後だけ初期化する
      // bookItems.length === 1 && setBookItems([]);
      setUpdate(!update);
    });
    setConfirmWindowOpen(false);
  };

  const deleteItemToggle = (deleteId, bookTitle) => {
    setEdit(false);
    setConfirmWindowOpen(true);
    setDeleteInform({ deleteId, bookTitle });
  };

  const addInform = (e) => {
    if (e.target.id === "title" && e.target.value.length <= 25) {
      setBookContentTitle(e.target.value);
    } else if (e.target.id === "description" && e.target.value.length <= 60) {
      setBookContentDesc(e.target.value);
    }
    setErrMsgToggle(false);
  };

  const typeChangeToggle = (e) => {
    if (e.target.id === "mediaAndTextBtn") {
      setAddTypeChange(false);
    } else {
      setAddTypeChange(true);
    }
    setBookContentTitle("");
    setBookContentDesc("");
    setErrMsgToggle(false);
  };

  const addPageModalToggle = () => {
    setAddPageModal(!addPageModal);
    setErrMsgToggle(false);
    setImageFile("");
  };

  const editToggle = (id) => {
    setThisPageId(id);
    setEdit(!edit);
    setErrMsgToggle(false);
    setBookContentEditTitle("");
    setBookContentEditDesc("");
  };

  const editInform = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "editTitle" && value.length <= 25) {
      setBookContentEditTitle(value);
    } else if (id === "editDesc" && value.length <= 60) {
      setBookContentEditDesc(value);
    }
    setErrMsgToggle(false);
  };

  const editConfirm = async (id) => {
    if (bookContentEditTitle || bookContentEditDesc) {
      await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
        id,
        title: bookContentEditTitle,
        description: bookContentEditDesc,
        type: "editText",
      })
        .then((response) => {
          const { result, err } = response.data;
          console.log({ result, err });
          setEdit(false);
        })
        .catch(() => {
          console.log(
            "何らかのエラーが発生しました。もう一度やり直してください。"
          );
        });
      setUpdate(!update);
    }
    setEdit(false);
    setBookContentEditDesc("");
    setBookContentEditTitle("");
  };

  const toMybooks = () => {
    if (publicBookMenu) {
      navigate("/mybooks");
    } else {
      navigate("/public");
    }
  };

  return (
    <>
      <>
        {unExpectErr ? (
          <div className="flex h-screen w-screen transform flex-col items-center justify-center transition-all">
            <p className="text-xl font-bold">予期せぬエラーが発生しました</p>
            <button
              onClick={() => {
                navigate("/mybooks");
              }}
              className="text-sm text-blue-800"
            >
              一覧画面へ戻る
            </button>
          </div>
        ) : (
          <div
            id="bookMain"
            className={`${fontChange} flex h-screen w-screen snap-x snap-mandatory overflow-scroll`}
          >
            <Swiper
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              mousewheel={false}
              modules={[Navigation, Pagination, Mousewheel]}
            >
              {/* 表紙情報 */}
              <SwiperSlide>
                <div
                  key={bookId}
                  className="h-screen w-screen snap-start snap-always bg-white lg:flex"
                >
                  <div className="flex h-1/2 w-screen items-center justify-center lg:h-auto">
                    {/* 画像 */}
                    <img
                      src={coverImage}
                      alt="表紙の画像"
                      className="h-full w-screen object-cover"
                    />
                  </div>
                  {/* テキスト */}
                  <div className="relative flex h-1/2 w-screen flex-col items-center justify-center lg:h-screen">
                    <>
                      {/* リボン */}
                      {favorite ? (
                        <span className="absolute top-3 right-3 text-2xl text-red-500">
                          <BsFillBookmarkFill />
                        </span>
                      ) : (
                        <></>
                      )}
                    </>
                    <div className="h-[90%] w-[90%] items-center text-slate-500 lg:flex">
                      <div className="mt-7 flex w-full flex-col items-center justify-center">
                        {/* タイトル */}
                        <h1 className="border-b pb-2 text-2xl text-slate-700">
                          {bookTitle}
                        </h1>
                        <div className="mt-2 space-y-2 text-center">
                          <div className="flex items-center space-x-4 text-sm">
                            <p>{date}</p>
                            <p>
                              <ChangeJapanese category={category} />
                            </p>
                          </div>
                          <p className="text-lg">{username || "gestUser"}</p>
                        </div>
                        <div className="mt-8">
                          <ChangeFont setFontChange={setFontChange} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
              {/* publicBookMenu = true(通常) false(共有) */}
              <div
                className={`${[
                  bottomMenu && "-translate-x-full",
                ]} fixed bottom-0 z-50 h-10 w-[109px] transform transition-all duration-1000`}
              >
                <button
                  onClick={toMybooks}
                  className="fixed left-2 bottom-2 z-50 flex items-center bg-white py-2 px-2 text-sm text-slate-500"
                >
                  <BsBoxArrowUpLeft className="mr-1" />
                  戻る
                </button>
                {publicBookMenu && (
                  <button
                    onClick={addPageModalToggle}
                    className="fixed left-16 bottom-2 z-50 flex items-center bg-white py-2 px-2 text-sm text-slate-500"
                  >
                    追加
                  </button>
                )}
                <button
                  onClick={() => {
                    setBottomMenu(!bottomMenu);
                  }}
                  className={`${[
                    bottomMenu && "lg:opacity-30",
                  ]} fixed left-[108px] bottom-2 z-50 rounded-r-xl bg-white py-[10px] px-2 transition-all duration-1000`}
                >
                  <BsChevronDoubleLeft
                    className={`${[
                      bottomMenu ? "rotate-180" : "rotate-0",
                    ]} transition-all duration-1000`}
                  />
                </button>
              </div>

              {/* コンテンツ */}
              <>
                {bookContents.map(
                  (
                    { pageId, bookImage, bookVideo, title, description, date },
                    index
                  ) => (
                    <SwiperSlide key={pageId}>
                      <div className="h-screen w-screen snap-start snap-always grid-cols-2 bg-white lg:grid">
                        {/* 画像エリア */}
                        <div
                          className={[
                            title && description
                              ? "relative h-[60%] w-screen lg:h-auto lg:w-auto"
                              : !title &&
                                !description &&
                                "relative h-screen w-screen",
                          ]}
                        >
                          <ImageUrlCreate
                            imageSize={[
                              title && description
                                ? "h-screen w-screen hover:bg-black"
                                : !title &&
                                  !description &&
                                  "h-screen w-screen flex items-center justify-center",
                            ]}
                            imageStyle={[
                              title && description
                                ? `h-full w-full object-cover`
                                : !title &&
                                  !description &&
                                  "h-[80%] w-[85%] object-cover rounded-lg",
                            ]}
                            videoStyle={[
                              title && description
                                ? "h-full w-full object-cover"
                                : !title &&
                                  !description &&
                                  "h-[80%] w-[85%] object-cover rounded-lg",
                            ]}
                            disabled={true}
                            acceptType="image/*,video/*"
                            imageUrl={bookImage}
                            video={{
                              videoUrl: bookVideo,
                              videoAutoPlay: true,
                              videoCtrl: true,
                              videoLoop: true,
                            }}
                          />
                          {!title && !description && (
                            <>
                              {/* ホバー時黒背景出現 画像と文章がある場合  */}
                              <div className="absolute top-1/2 left-1/2 h-[40%] w-[75%] -translate-x-1/2 -translate-y-1/2 transform bg-black opacity-0 transition-all hover:opacity-50">
                                {/* 日付 画像のみの場合 */}
                                <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform select-none space-x-4 text-lg font-bold text-white hover:block">
                                  <p className="text-md ">{date}</p>
                                </div>
                              </div>
                              {publicBookMenu && (
                                <button
                                  onClick={() =>
                                    deleteItemToggle(pageId, title)
                                  }
                                  className={`${iconStyle} bottom-4 right-4`}
                                >
                                  <BsTrash />
                                </button>
                              )}
                            </>
                          )}
                        </div>
                        {/* テキスト */}
                        <div
                          className={[
                            title && description
                              ? "flex h-[40%] w-screen items-center justify-center lg:h-auto lg:w-auto"
                              : !title && !description && "hidden",
                          ]}
                        >
                          <div className="relative h-full w-[90%] pt-4">
                            {publicBookMenu && (
                              <div className="relative">
                                <button
                                  onClick={() =>
                                    deleteItemToggle(pageId, title)
                                  }
                                  className={`${iconStyle} right-7`}
                                >
                                  <BsTrash />
                                </button>
                                <button
                                  onClick={() => editToggle(pageId)}
                                  className={`${iconStyle} right-16`}
                                >
                                  <BsPencil />
                                </button>
                              </div>
                            )}
                            {edit && pageId === thisPageId ? (
                              <div className="relative w-full">
                                <input
                                  id="editTitle"
                                  type="text"
                                  value={bookContentEditTitle}
                                  onChange={editInform}
                                  placeholder={title}
                                  className={`${errorBorderMsg.base} focus:border-sky-600`}
                                />
                                {bookContentEditTitle.length === 25 && (
                                  <p className="absolute text-sm text-red-600">
                                    文字数が最大です。
                                  </p>
                                )}
                                <p className="absolute right-0 top-full text-sm text-slate-500">
                                  {bookContentEditTitle.length}/25
                                </p>
                              </div>
                            ) : (
                              <p className="w-full text-xl font-bold text-slate-800 md:text-2xl lg:mt-6 lg:ml-4 lg:text-4xl">
                                {title}
                              </p>
                            )}
                            {edit && pageId === thisPageId ? (
                              <div className="relative mt-6 w-full">
                                <textarea
                                  id="editDesc"
                                  type="text"
                                  value={bookContentEditDesc}
                                  onChange={editInform}
                                  placeholder={description}
                                  className={`${errorBorderMsg.base} outline-none focus:border-sky-600`}
                                />
                                {bookContentEditDesc.length === 60 && (
                                  <p className="absolute text-sm text-red-600">
                                    文字数が最大です。
                                  </p>
                                )}
                                <p className="absolute right-0 top-full text-sm text-slate-500">
                                  {bookContentEditDesc.length}/60
                                </p>
                                <button
                                  onClick={() => editConfirm(pageId)}
                                  className="lg:text-md absolute top-full left-0 rounded-full bg-sky-700 px-4 py-1 text-sm font-bold text-white active:bg-sky-800"
                                >
                                  確定
                                </button>
                              </div>
                            ) : (
                              <div className="mt-4 w-full lg:ml-3">
                                <p className="text-md break-words text-slate-600 md:text-xl lg:text-2xl">
                                  {description}
                                </p>
                              </div>
                            )}
                            {title && description && (
                              <div className="absolute bottom-2 right-0 flex space-x-4 text-slate-500">
                                <p className="text-md">{date}</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                )}
              </>

              {/* 追加画面 画像・動画のみ */}
              <div
                className={[
                  addPageModal
                    ? "absolute top-0 left-0 z-50 h-screen w-screen"
                    : "hidden",
                ]}
              >
                {addTypeChange ? (
                  <div className="h-full w-screen snap-start snap-always bg-white">
                    {/* 画像 */}
                    <div className="relative flex h-screen w-screen flex-col items-center justify-center">
                      <div className="relative h-[70%] w-[75%] rounded-lg border border-slate-300 bg-slate-100 object-cover">
                        {!imageUrl &&
                          !videoUrl && ( // 画像と動画を設定されていない時だけ
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 bg-white p-4 text-xl text-slate-500">
                              <BsUpload />
                            </div>
                          )}
                        <ImageUrlCreate
                          imageSize="h-full w-screen"
                          imageStyle="h-full w-full rounded-lg object-cover"
                          videoStyle="h-full w-full rounded-lg object-cover"
                          acceptType="image/*,video/*"
                          disabled={false}
                          imageUrl={imageUrl}
                          video={{
                            videoUrl,
                            videoAutoPlay: true,
                            videoCtrl: false,
                            videoLoop: true,
                          }}
                        />
                      </div>
                      {errMsgToggle && !imageFile && !videoFile && (
                        <p className="mx-2 mt-1 text-sm text-red-600">
                          画像を選択してください。
                        </p>
                      )}
                      <div className="w-[90%]">
                        <button
                          id="mediaAndTextBtn"
                          onClick={typeChangeToggle}
                          className="mt-2 flex items-center space-x-2 text-sm text-sky-800"
                        >
                          <BsArrowRepeat className="text-lg" />
                          画像と文章を追加
                        </button>
                        <button
                          onClick={addPageModalToggle}
                          className="mt-2 flex items-center space-x-2 text-sm text-sky-800"
                        >
                          閉じる
                        </button>
                        <div className="absolute bottom-0 my-4 w-[90%] space-y-2">
                          <Button clickBtn={() => insertItem("mediaOnly")}>
                            追加する
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  // 追加画面 画像とテキストあり
                  <div className="h-screen w-screen snap-start snap-always grid-cols-2 gap-4 bg-white lg:grid">
                    {/* 画像 */}
                    <div className="relative h-1/2 w-screen bg-slate-100 lg:h-auto lg:w-auto">
                      {!imageUrl &&
                        !videoUrl && ( // 画像と動画を設定されていない時だけ
                          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded-full border-2 bg-white p-4 text-xl text-slate-500">
                            <BsUpload />
                          </div>
                        )}
                      <ImageUrlCreate
                        imageSize="h-full w-screen"
                        imageStyle="h-full w-full object-cover"
                        videoStyle="h-full w-full object-cover"
                        acceptType="image/*,video/*"
                        disabled={false}
                        imageUrl={imageUrl}
                        video={{
                          videoUrl,
                          videoAutoPlay: true,
                          videoCtrl: false,
                          videoLoop: true,
                        }}
                      />
                      {errMsgToggle && !imageFile && !videoFile && (
                        <p className="mx-2 mt-1 text-sm text-red-600">
                          画像を選択してください。
                        </p>
                      )}
                    </div>

                    {/* テキスト */}
                    <div className="relative flex h-1/2 w-screen justify-center bg-white lg:block lg:w-full">
                      <div className="h-[82%] w-[360px]">
                        <div className="relative mt-3">
                          <label className="flex flex-col text-sm font-bold">
                            タイトル
                            <input
                              id="title"
                              type="text"
                              placeholder="タイトルを入力"
                              value={bookContentTitle}
                              onChange={addInform}
                              className={`${[
                                errMsgToggle && !bookContentTitle
                                  ? errorBorderMsg.showed
                                  : errorBorderMsg.base,
                              ]} focus:border-sky-600`}
                            />
                          </label>
                          <p className="absolute right-0 top-full text-sm text-slate-500">
                            {bookContentTitle.length}/25
                          </p>
                        </div>
                        {errMsgToggle && !bookContentTitle ? (
                          <p className="text-sm text-red-600">
                            タイトルを入力してください。
                          </p>
                        ) : (
                          bookContentTitle.length === 25 && (
                            <p className="text-sm text-red-600">
                              文字数が最大です。
                            </p>
                          )
                        )}
                        <div className="relative mt-2">
                          <label className="flex flex-col text-sm font-bold">
                            説明
                            <textarea
                              id="description"
                              cols="40"
                              rows="2"
                              placeholder="説明を入力"
                              value={bookContentDesc}
                              onChange={addInform}
                              className={`${[
                                errMsgToggle && !bookContentDesc
                                  ? errorBorderMsg.showed
                                  : errorBorderMsg.base,
                              ]} outline-none focus:border-sky-600`}
                            />
                          </label>
                          {
                            <p className="absolute right-0 top-full text-sm text-slate-500">
                              {bookContentDesc.length}/60
                            </p>
                          }
                        </div>
                        {errMsgToggle && !bookContentDesc ? (
                          <p className="text-sm text-red-600">
                            説明を入力してください。
                          </p>
                        ) : (
                          bookContentDesc.length === 60 && (
                            <p className="text-sm text-red-600">
                              文字数が最大です。
                            </p>
                          )
                        )}
                        <button
                          id="mediaOnlyBtn"
                          onClick={typeChangeToggle}
                          className="mt-2 flex items-center space-x-2 text-sm text-sky-800"
                        >
                          <span className="text-lg">
                            <BsArrowRepeat />
                          </span>
                          画像か動画だけを追加
                        </button>
                        <button
                          onClick={addPageModalToggle}
                          className="mt-2 flex items-center space-x-2 text-sm text-sky-800"
                        >
                          閉じる
                        </button>
                        <div className="absolute bottom-5 my-4 w-[360px] space-y-2">
                          <Button clickBtn={() => insertItem("mediaAndText")}>
                            追加する
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Swiper>
          </div>
        )}
      </>
      <div
        className={[
          confirmWindowOpen
            ? `${modalConfirmAnimation.showed}`
            : `${modalConfirmAnimation.base}`,
        ]}
      >
        <div
          className={[
            confirmWindowOpen
              ? `${confirmWindowStyle} translate-y-32`
              : `${confirmWindowStyle} -translate-y-full shadow-2xl`,
          ]}
        >
          <ConfirmDialog
            message="削除しますか？"
            deleteInform={deleteInform} // 削除するアイテムのid
            deleteItem={deleteItem} // 削除する関数
            setConfirmWindowOpen={setConfirmWindowOpen}
          />
        </div>
      </div>
    </>
  );
});
