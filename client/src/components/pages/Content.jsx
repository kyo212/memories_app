import { memo, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import Axios from "axios";
// コンポーネント
import { AddBookBtn } from "../atoms/button/AddBookBtn";
import { HeaderLogoutBtn } from "../atoms/button/HeaderLogoutBtn";
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
import { FooterTab } from "../molecles/tabs/FooterTab";
import { Header } from "../organisms/Header";
import { Books } from "../organisms/Books";

export const Content = memo(() => {
  // const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState("kyo");
  const [bookItems, setBookItems] = useState([]);

  useEffect(() => {
    // ログイン状態を取得
    const getUsername = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { user } = response.data;
        setLoginUser(user[0].username);
      });
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
        console.log({ result: result, err: err });
      });
    };
    getItems();
  }, [loginUser]);

  // カテゴリごとにデータを抽出して新しい配列に格納
  const familyArry = bookItems.filter((item) => item.category === "家族");
  const childArry = bookItems.filter((item) => item.category === "子供");
  const petArry = bookItems.filter((item) => item.category === "ペット");
  const hobyArry = bookItems.filter((item) => item.category === "趣味");
  const friendArry = bookItems.filter((item) => item.category === "友達");
  const loverArry = bookItems.filter((item) => item.category === "恋人");
  const travelArry = bookItems.filter((item) => item.category === "旅行");

  // カテゴリごとに抽出したデータの配列を一つの配列にまとめる
  // 構造 → 配列の中に配列、その中にオブジェクト [[{},{}],[{},{}]]
  const categoryArrays = [
    familyArry,
    childArry,
    petArry,
    hobyArry,
    friendArry,
    loverArry,
    travelArry,
  ];

  return (
    <>
      {/* ヘッダー */}
      <Header root={"/mybooks"}>
        <div className="flex space-x-2">
          <span className="mx-2 border-b font-bold text-slate-700">
            {loginUser}
          </span>
          <MenuOpenModal />
          <HeaderLogoutBtn />
        </div>
      </Header>
      {/* メインコンテンツ */}
      <div className="flex w-screen flex-col py-20 text-center">
        {bookItems.length > 0 ? (
          // bookItems(bookの情報を格納している配列)の中の配列の中にデータが存在しない場合(0の場合)は"まだ何もありません"を表示
          <>
            {categoryArrays.map((array, index) => {
              // categoryArrays(カテゴリごとに分けた配列をまとめた配列)の中の配列の中にデータが存在しない場合は下記コンポーネントを表示させない
              return (
                array.length > 0 && (
                  <div key={index}>
                    <Books category={array[0].category} Items={array} />
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
  );
});
