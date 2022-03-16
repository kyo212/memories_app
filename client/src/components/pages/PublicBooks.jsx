import { memo, useContext, useEffect, useRef, useState } from "react";
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
import { Loading } from "../atoms/style/Loading";
import { SliderLeft } from "../atoms/button/SliderLeft";
import { SliderRight } from "../atoms/button/SliderRight";
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
// カスタムフック
import { useForceUpdate } from "../custom/useForceUpdate";
// コンテキスト
import { Context } from "../../App";

export const PublicBooks = memo(() => {
  const [shareItems, setShareItems] = useState([]);
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  // Toggle
  const [loading, setLoading] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  // カスタムフック
  const [update, { setUpdate }] = useForceUpdate();
  // スライダーアイコン
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  // コンテキスト
  const {
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
          console.log({ user, user_0: user[0].username });
          setLoginUser(user[0].username); // セッションに格納されているユーザー情報
        }
      );
    };
    getUsername();
  }, []);

  useEffect(() => {
    const getPublicItems = async () => {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/getItems`, {
        shareId: 1,
      }).then((response) => {
        const { result, err } = response.data;
        setShareItems(result);
      });
    };
    getPublicItems();
  }, []);

  useEffect(() => setTimeout(() => setLoading(true), 1000), []);

  return (
    <>
      <Header root={"/public"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <div className="flex items-center">
          {/* <Search /> */}
          <MenuOpenModal
            loginUser={loginUser}
            root="/mybooks"
            rootText={"自分のフォトブックに戻る"}
            showMenu={false}
          />
        </div>
      </Header>
      <>
        <div className="h-screen w-screen snap-x snap-mandatory overflow-scroll text-center">
          {shareItems.length > 0 ? (
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
              {shareItems.map((item, index) => (
                <div key={item.bookId}>
                  {/* フィルター */}
                  {fillterToggle ? (
                    (item.category === fillterCategory ||
                      item.favorite === Number(fillterCategory)) && (
                      <SwiperSlide
                        id={index}
                        className="inline-block h-screen w-screen transform snap-start snap-always  transition-transform ease-in"
                      >
                        <Books
                          item={item}
                          index={index}
                          shareState=""
                          favoriteState=""
                          setConfirmWindowOpen=""
                          setDeleteInform=""
                          bookOpen={bookOpen}
                          setBookOpen={setBookOpen}
                          publicBookMenu={false}
                          bottomText={`${item.username}のフォトブック`}
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
                        shareState=""
                        favoriteState=""
                        setConfirmWindowOpen=""
                        setDeleteInform=""
                        bookOpen={bookOpen}
                        setBookOpen={setBookOpen}
                        publicBookMenu={false}
                        bottomText={`${item.username}のフォトブック`}
                      />
                    </SwiperSlide>
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
                            {/* <BsArrowUp /> */}
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
                            {/* <AiOutlinePlus className="mx-2 text-slate-800" /> */}
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
      </>
    </>
  );
});
