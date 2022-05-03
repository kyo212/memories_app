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
  const [bookItems, setBookItems] = useState([]);
  const [bookTitle, setBookTitle] = useState("");
  const [category, setCategory] = useState("diary");
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  const [deleteInform, setDeleteInform] = useState({});
  const [searchInput, setSearchInput] = useState("");
  // Toggle
  const [modalToggle, setModalToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmWindowOpen, setConfirmWindowOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
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
    filterToggle, // フィルターを適用するかしないか
    filterCategory, // フィルタリングする内容
  } = useContext(Context);

  // スタイル共通化
  const confirmWindowStyle =
    "flex h-40 w-[360px] transform flex-col items-center justify-center space-y-4 rounded-lg border-2 border-gray-200 bg-white py-6 px-6 text-gray-700 transition-all duration-700 md:w-[580px]";

  useEffect(() => {
    // ユーザーネームをセッションから取得
    const getUsername = () => {
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/loginState`).then(
        (response) => {
          const { user } = response.data;
          console.log({ user, user_0: user[0].username });
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
        const { result } = response.data;

        // 前提1 | 返り値が 0 未満の場合、a を b より小さいインデックスにソート(aが先=昇順)
        // 前提2 | 返り値が 0 より大きい場合、b を a より小さいインデックスにソート(bが先=降順)
        if (sortToggle) {
          const sortResult = result.sort((a, b) => {
            // a,bには配列の値が最初から2つずつ渡る

            // b > a すなわち昇順の場合,a - b を行い、差が必ず負(0未満)になるため
            // bよりaが先に並び、降順になる
            if (b.bookId > a.bookId) return 1;

            // a > b すなわち降順の場合,b - a を行い、差が必ず正(0より大きい)になるため
            // 昇順になる
            if (a.bookId > b.bookId) return -1;

            // bookIdはAutoIncrementなため追加順になっている。
            // 日付も追加した日になっているので、bookIdのソートでも同じ結果になる。
            return 0; // 返り値が0の場合、ソートを行わない
          });
          setBookItems(sortResult);
        } else {
          setBookItems(result);
        }
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
            await Axios.post(
              `http://${process.env.REACT_APP_PUBLIC_IP}/insert`,
              {
                username: loginUser,
                bookTitle,
                coverImage,
                category,
              }
            )
              .then((response) => {
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
              })
              .catch((error) => {
                setErrMsgToggle(true);
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
    ).then((response) => {
      // DBから値を消してもstateには残っているため最後だけ初期化する
      bookItems.length === 1 && setBookItems([]);
      setUpdate(!update);
    });
    setConfirmWindowOpen(false);
  };

  const favoriteState = async (id, num) => {
    await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
      id,
      num: Number(num),
      type: "favorite",
    });
    setUpdate(!update);
  };

  const shareState = async (id) => {
    const { bookId, shareId } = id;

    await Axios.put(`http://${process.env.REACT_APP_PUBLIC_IP}/put`, {
      id: bookId,
      num: Number(shareId),
      type: "share",
    });
    setUpdate(!update);
  };

  // リロードの間、loading画面を表示させる
  // この記述がないとloadingがすぐtrueになってしまい、"まだなにもありません"が表示されてしまう
  useEffect(() => setTimeout(() => setLoading(true), 1000), []);

  return (
    <>
      {/* ヘッダー */}
      {!confirmWindowOpen && (
        <Header root="/mybooks" headerOpen={{ headerToggle, setHeaderToggle }}>
          <div className="flex items-center">
            <AddBookBtn setModalToggle={setModalToggle} />
            <Search
              placeholder="タイトルを検索"
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
            <MenuOpenModal
              loginUser={loginUser}
              root="/public"
              rootText="みんなのフォトブックを見にいく"
              sortToggle={sortToggle}
              setSortToggle={setSortToggle}
              setUpdate={setUpdate}
              showMenu
            />
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
              clickable: true,
              dynamicBullets: true,
            }}
            modules={[Navigation, Pagination]}
          >
            {bookItems.map((item, index) => (
              <div key={item.bookId}>
                {/* フィルター */}
                {filterToggle ? (
                  (item.category === filterCategory ||
                    item.favorite === Number(filterCategory)) && (
                    <SwiperSlide
                      id={index}
                      className="inline-block h-screen w-screen transform snap-center snap-always transition-transform ease-in"
                    >
                      <Books
                        item={item}
                        index={index}
                        shareState={shareState}
                        favoriteState={favoriteState}
                        setConfirmWindowOpen={setConfirmWindowOpen}
                        setDeleteInform={setDeleteInform}
                        bookOpen={bookOpen}
                        setBookOpen={setBookOpen}
                        publicBookMenu={true}
                        bottomText="このフォトブックは共有中です"
                      />
                    </SwiperSlide>
                  )
                ) : (
                  <>
                    {/* 検索 */}
                    {item.bookTitle.indexOf(searchInput) > -1 && (
                      // 一致しない場合は-1、文字列なしは0、部分一致は1以上が返る
                      // 文字列なしは全てを表示、部分一致は一致しているものを表示、一致しない場合は何も表示させない
                      <SwiperSlide
                        id={index}
                        key={item.bookId}
                        className="inline-block h-screen w-screen transform snap-start snap-always transition-transform ease-in"
                      >
                        <Books
                          item={item}
                          index={index}
                          shareState={shareState}
                          favoriteState={favoriteState}
                          setConfirmWindowOpen={setConfirmWindowOpen}
                          setDeleteInform={setDeleteInform}
                          bookOpen={bookOpen}
                          setBookOpen={setBookOpen}
                          publicBookMenu={true}
                          bottomText="このフォトブックは共有中です"
                        />
                      </SwiperSlide>
                    )}
                  </>
                )}
              </div>
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
                          ヘッダーの
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
            ? `${modalConfirmAnimation.showed}`
            : `${modalConfirmAnimation.base}`,
        ]}
      >
        <div
          className={[
            confirmWindowOpen
              ? `${confirmWindowStyle} translate-y-32 shadow-2xl`
              : `${confirmWindowStyle} -translate-y-full`,
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
