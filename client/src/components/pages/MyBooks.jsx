import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// コンポーネント
import { AddBookBtn } from "../atoms/button/AddBookBtn";
import { HeaderLogoutBtn } from "../atoms/button/HeaderLogoutBtn";
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
import { FooterTab } from "../molecles/tabs/FooterTab";
import { Header } from "../organisms/Header";
import { Books } from "../organisms/Books";

export const MyBooks = memo(() => {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  // DBに格納されているbook_listの情報をusenameを元に取得して格納する配列（POSTリクエスト）
  // 擬似的な配列↓
  const [bookItems, setBookItems] = useState([
    {
      book_name: "家族との思い出",
      category: "family",
      book_num: 1,
      favorite: 0,
    },
    {
      book_name: "こどもの成長日記",
      category: "child",
      book_num: 2,
      favorite: 1,
    },
    {
      book_name: "タローの成長日記",
      category: "pet",
      book_num: 3,
      favorite: 0,
    },
    { book_name: "ラテの成長日記", category: "pet", book_num: 4, favorite: 0 },
    { book_name: "カフェ巡り記", category: "hoby", book_num: 5, favorite: 0 },
    // {
    //   book_name: "友達とパーティ",
    //   category: "friend",
    //   book_num: 6,
    //   favorite: 1,
    // },
    {
      book_name: "恋人とクリスマスデート",
      category: "lover",
      book_num: 7,
      favorite: 1,
    },
    {
      book_name: "京都旅行の日記",
      category: "travel",
      book_num: 8,
      favorite: 0,
    },
  ]);

  // カテゴリごとにデータを抽出
  const familyArry = bookItems.filter((item) => item.category === "family");
  const childArry = bookItems.filter((item) => item.category === "child");
  const petArry = bookItems.filter((item) => item.category === "pet");
  const hobyArry = bookItems.filter((item) => item.category === "hoby");
  const friendArry = bookItems.filter((item) => item.category === "friend");
  const loverArry = bookItems.filter((item) => item.category === "lover");
  const travelArry = bookItems.filter((item) => item.category === "travel");

  const categoryArrays = [
    familyArry,
    childArry,
    petArry,
    hobyArry,
    friendArry,
    loverArry,
    travelArry,
  ];
  useEffect(() => {
    // ログイン状態を取得
    const getAuth = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        if (!loggedIn) {
          // navigate("/session");
        } else {
          setIsAuth(loggedIn);
        }
      });
    };
    getAuth();
  }, []);

  return (
    <div>
      {!isAuth && (
        // ログイン中である時、下記を表示
        <>
          {/* ヘッダー */}
          <Header root={"/mybooks"}>
            <div className="flex space-x-2">
              <MenuOpenModal />
              <HeaderLogoutBtn />
            </div>
          </Header>
          {/* メインコンテンツ */}
          <div className="flex w-screen flex-col py-20 text-center">
            {bookItems.length > 0 ? (
              // bookItemsの中の配列の中にデータが存在しない場合は"まだ何もありません"を表示
              <>
                {categoryArrays.map((array, index) => {
                  // categoryArraysの中の配列の中にデータが存在しない場合は非表示にさせる
                  return (
                    array.length > 0 && (
                      <div key={index}>
                        <Books category={"家族"} Items={array} />
                      </div>
                    )
                  );
                })}
              </>
            ) : (
              <p className="text-bold text-slate-700">まだ何もありません</p>
            )}
          </div>
          {/* フッタータブ */}
          <AddBookBtn />
          <FooterTab />
        </>
      )}
    </div>
  );
});
