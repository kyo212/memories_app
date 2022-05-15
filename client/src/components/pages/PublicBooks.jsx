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
import { Search } from "../atoms/Search";

export const PublicBooks = memo(() => {
  const [shareItems, setShareItems] = useState([]);
  const [loginUser, setLoginUser] = useState(""); // ログイン中のusername
  const [searchText, setSearchText] = useState("");
  // Toggle
  const [loading, setLoading] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);
  const [sortToggle, setSortToggle] = useState(false);
  // カスタムフック
  const [update, { setUpdate }] = useForceUpdate();
  // スライダーアイコン
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  // コンテキスト
  const {
    headerToggle, // ヘッダー開閉のトグル
    setHeaderToggle, // ヘッダー開閉のトグル
    filterToggle, // フィルターを適用するかしないか
    filterCategory, // フィルタリングする内容
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
          setShareItems(sortResult);
        } else {
          setShareItems(result);
        }
      });
    };
    getPublicItems();
  }, [update]);

  useEffect(() => setTimeout(() => setLoading(true), 1000), []);

  return (
    <>
      <Header root={"/public"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <div className="flex items-center">
          <Search
            placeholder="タイトルかユーザー名を検索"
            searchText={searchText}
            setSearchText={setSearchText}
          />
          <MenuOpenModal
            loginUser={loginUser}
            root="/mybooks"
            rootText={"自分のフォトブックに戻る"}
            sortToggle={sortToggle}
            setSortToggle={setSortToggle}
            setUpdate={setUpdate}
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
                  {filterToggle ? (
                    (item.category === filterCategory ||
                      item.favorite === Number(filterCategory)) && (
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
                          bottomText={item.username || "gestuser"}
                        />
                      </SwiperSlide>
                    )
                  ) : (
                    <>
                      {/* 検索 */}
                      {(item.bookTitle.indexOf(searchText) > -1 ||
                        item.username.indexOf(searchText) > -1) && (
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
                            bottomText={item.username || "gestuser"}
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
                        <div className="mt-10 flex flex-col items-center">
                          <p className="text-bold my-2 text-xl font-bold text-slate-500">
                            まだ何もありません
                          </p>
                          <p className="text-bold w-[80%] text-slate-500">
                            自分のフォトブックを共有するか、みんなのフォトブックが共有されるまで待ちましょう
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
