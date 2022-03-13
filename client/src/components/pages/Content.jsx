import { memo, useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// スライダー
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// アイコン
import { AiOutlinePlus } from "react-icons/ai";
import { BsArrowUp } from "react-icons/bs";
// コンポーネント UI系
import { Header } from "../organisms/Header";
import { Books } from "../organisms/Books";
import { SuccessMsgWindow } from "../atoms/message/SuccessMsgWindow";
import { Search } from "../atoms/Search";
import { Loading } from "../atoms/style/Loading";
import { SliderLeft } from "../atoms/button/SliderLeft";
import { SliderRight } from "../atoms/button/SliderRight";
import { ConfirmDialog } from "../atoms/message/ConfirmDialog";
// コンポーネント 処理系
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
import { AddBookBtn } from "../atoms/button/AddBookBtn";
import { AddBookModal } from "../molecles/modal/AddBookModal";
// カスタムフック
import { useStyle } from "../custom/useStyle";
import { useForceUpdate } from "../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../App";

// ------------------------------------------
// ユーザーが認証済みであるときに表示させる内容
// ------------------------------------------

export const Content = memo(() => {
  const navigate = useNavigate();
  // 情報
  const [bookTitle, setBookTitle] = useState("");
  const [category, setCategory] = useState("diary");
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  const [bookItems, setBookItems] = useState([]);
  const [deleteInform, setDeleteInform] = useState({});
  // Toggle
  const [modalToggle, setModalToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  // メッセージ
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  const [sucMsgToggle, setSucMsgToggle] = useState(false);
  // カスタムフック
  const { modals } = useStyle();
  const { modalConfirmAnimation } = modals;
  const [update, { setUpdate }] = useForceUpdate();
  // スライダーアイコン
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  // コンテキスト
  const {
    setDefaultIndex, // Tabを初期値に戻す
    imageFile,
    setImageUrl,
    headerToggle, // ヘッダー開閉のトグル
    setHeaderToggle, // ヘッダー開閉のトグル
    fillterToggle, // フィルターを適用するかしないか
    fillterCategory, // フィルタリングする内容
  } = useContext(Context);

  useEffect(() => {
    // ユーザーネームをセッションから取得
    const getUsername = () => {
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/loginState`).then(
        (response) => {
          const { user } = response.data;
          setLoginUser(user[0].username); // セッションに格納されているユーザー情報
        }
      );
    };
    getUsername();
  }, []);

  // ログインしているユーザーを元にデータを取得
  useEffect(() => {
    const getItems = async () => {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/getItems`, {
        username: loginUser,
      }).then((response) => {
        const { result, err } = response.data;
        setBookItems(result);
      });
    };
    getItems();
  }, [loginUser, update]);

  const insertItem = async () => {
    // awsのバケットURLを取得
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/s3Url`).then(
      (response) => {
        const { url } = response.data;
        // awsのURLにput
        fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: imageFile, // imageUrlを送る
        });
        const coverImage = url.split("?")[0];

        const insert = async () => {
          if (imageFile !== "" && bookTitle !== "") {
            // 入力した情報をDBに追加
            console.log(category);
            await Axios.post(
              `http://${process.env.REACT_APP_PUBLIC_IP}/insert`,
              {
                username: loginUser,
                bookTitle,
                coverImage,
                category,
              }
            ).then((response) => {
              const { result, err } = response.data;
              console.log({ result, err });
              setModalToggle(false); // モーダルを閉じる
              setBookTitle(""); // タイトルをデフォルト状態に戻す
              setDefaultIndex(true); // タブのアニメーションをデフォルトに戻す
              setSucMsgToggle(true); // 追加完了のメッセージを出す
              setImageUrl(""); // 画像プレビューをデフォルト状態に戻す
              // 3秒後にメッセージを閉じる
              setTimeout(() => {
                setUpdate(!update);
                setTimeout(() => {
                  setSucMsgToggle(false);
                  setCategory("diary"); // タブの初期値をデフォルトに戻す
                }, 2000);
              }, 1000);
            });
          } else {
            setErrMsgToggle(true);
          }
        };
        insert();
      }
    );
  };

  const deleteItem = async (id) => {
    await Axios.delete(
      `http://${process.env.REACT_APP_PUBLIC_IP}/delete/${id}`
    ).then(() => {
      // DBから値を消してもstateには残っているため最後だけ初期化する
      bookItems.length === 1 && setBookItems([]);
      setUpdate(!update);
    });
  };

  const favoriteState = async (id, num) => {
    await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
      id,
      num,
    });
    setUpdate(!update);
  };

  console.log(fillterCategory);

  // リロードの間、loading画面を表示させる
  // この記述がないとloadingがすぐtrueになってしまい、"まだなにもありません"が表示されてしまう
  useEffect(() => setTimeout(() => setLoading(true), 1000), []);

  return (
    <>
      {/* ヘッダー */}
      {!confirmWindowOpen && (
        <Header
          root={"/mybooks"}
          headerOpen={{ headerToggle, setHeaderToggle }}
        >
          <div className="flex items-center">
            <AddBookBtn setModalToggle={setModalToggle} />
            <Search />
            <MenuOpenModal loginUser={loginUser} />
          </div>
        </Header>
      )}
      {/* メインコンテンツ */}
      <div className="h-screen w-screen snap-x snap-mandatory overflow-scroll text-center">
        {bookItems.length > 0 ? (
          // bookItems(bookの情報を格納している配列)の中の配列の中にデータが存在しない場合(0の場合)は"まだ何もありません"を表示
          <Swiper
            onInit={(swiper) => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }}
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Navigation, Pagination]}
          >
            {bookItems.map((item, index) => (
              <>
                {/* フィルター */}
                {fillterToggle ? (
                  (item.category === fillterCategory ||
                    item.favorite === Number(fillterCategory)) && (
                    <SwiperSlide
                      id={index}
                      key={item.bookId}
                      className="inline-block h-screen w-screen transform snap-start snap-always  transition-transform ease-in"
                    >
                      <Books
                        item={item}
                        index={index}
                        bookItems={bookItems}
                        deleteItem={deleteItem}
                        favoriteState={favoriteState}
                        setConfirmWindowOpen={setConfirmWindowOpen}
                        setDeleteInform={setDeleteInform}
                        bookOpen={bookOpen}
                        setBookOpen={setBookOpen}
                      />
                    </SwiperSlide>
                  )
                ) : (
                  <SwiperSlide
                    id={index}
                    key={item.bookId}
                    className="inline-block h-screen w-screen transform snap-start snap-always  transition-transform ease-in"
                  >
                    <Books
                      item={item}
                      index={index}
                      bookItems={bookItems}
                      deleteItem={deleteItem}
                      favoriteState={favoriteState}
                      setConfirmWindowOpen={setConfirmWindowOpen}
                      setDeleteInform={setDeleteInform}
                      bookOpen={bookOpen}
                      setBookOpen={setBookOpen}
                    />
                  </SwiperSlide>
                )}
              </>
            ))}
            {/* open状態のまま移動した際に、閉じる処理 */}
            <span onClick={() => setBookOpen(false)}>
              <SliderLeft navigationPrevRef={navigationPrevRef} />
              <SliderRight navigationNextRef={navigationNextRef} />
            </span>
          </Swiper>
        ) : (
          <>
            {loading ? (
              // リロード中はstateがデフォルト値になるから、stateがデフォルト値(リロード中)の場合はloadingを表示させるようにする処理
              <>
                <div className="w-screen">
                  <div className="fixed top-16 flex h-[50%] w-full flex-col items-center justify-around bg-white">
                    <div>
                      <div className="flex flex-col items-center justify-center">
                        <p className="flex h-10 w-10 animate-bounce items-center justify-center rounded-full border border-slate-400 bg-white text-slate-800 shadow-md">
                          <BsArrowUp />
                        </p>
                      </div>
                      <div className="mt-10 flex flex-col items-center">
                        <p className="text-bold my-2 text-xl font-bold text-slate-500">
                          まだ何もありません
                        </p>
                        <p className="text-bold text-slate-500">
                          まずは本を追加してみましょう
                        </p>
                        <p className="text-bold my-8 flex items-center text-slate-500">
                          <AiOutlinePlus className="mx-2 text-slate-800" />
                          をクリックして追加
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <Loading />
            )}
          </>
        )}
      </div>

      {/* モーダルウィンドウ */}
      <AddBookModal
        bookListItems={{ bookTitle, category }}
        setBookListItems={{ setBookTitle, setCategory }}
        toggle={{ modalToggle, setModalToggle }}
        insertItem={insertItem}
        msgShow={{ errMsgToggle, setErrMsgToggle }}
      />
      <SuccessMsgWindow
        msgToggle={sucMsgToggle}
        category={category}
        msgText="に新しく本を追加しました。"
      />
      <div
        className={[
          confirmWindowOpen
            ? modalConfirmAnimation.showed
            : modalConfirmAnimation.base,
        ]}
      >
        <ConfirmDialog
          message="削除しますか？"
          deleteInform={deleteInform} // 削除するアイテムのid
          deleteItem={deleteItem} // 削除する関数
          setConfirmWindowOpen={setConfirmWindowOpen}
          setBookOpen={setBookOpen}
        />
      </div>
    </>
  );
});
