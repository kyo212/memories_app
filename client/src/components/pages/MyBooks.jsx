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
  // 追加したカテゴリタグがfamiryだった場合、famiryルートへ遷移
  const [arry, setArry] = useState([
    { title: "赤ちゃん", category: "family", num: 1 },
    { title: "こども", category: "family", num: 2 },
  ]);

  useEffect(() => {
    const getAuth = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        if (!loggedIn) {
          navigate("/session");
        } else {
          setIsAuth(loggedIn);
        }
      });
    };
    getAuth();
  }, []);

  return (
    <div>
      {isAuth && (
        <>
          <Header root={"/mybooks"}>
            <div className="flex space-x-2">
              <MenuOpenModal />
              <HeaderLogoutBtn />
            </div>
          </Header>
          <div className="flex w-screen flex-col py-20 text-center">
            {/* 選んだタグの名前をパスに入れる */}
            <Books category={"家族"} Items={arry} />
            <Books category={"子供"} Items={arry} />
          </div>
          {/* フッタータブ */}
          <AddBookBtn />
          <FooterTab />
        </>
      )}
    </div>
  );
});
