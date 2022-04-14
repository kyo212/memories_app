import { memo, useState, useEffect } from "react";
import Axios from "axios";
// コンポーネント
import { Content } from "./Content";

// ------------------------------------------
// ログイン情報を取得してcontentコンポーネントを表示させる
// ------------------------------------------

export const MyBooks = memo(() => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // ログイン状態を取得
    const getAuth = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        if (!loggedIn) {
          // ログイン中でない時、"/session"に遷移させる
          // navigate("/session");
        } else {
          setIsAuth(loggedIn);
        }
      });
    };
    getAuth();
  }, []);

  // ログイン中である時、Contentを表示
  return <>{!isAuth && <Content />}</>;
});
