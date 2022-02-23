import { memo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンポーネント
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { ErrorMsgWindow } from "../atoms/message/ErrorMsgWindow";
// サードパーティ
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

// ------------------------------------------
// ログイン画面のコンポーネント
// ------------------------------------------

export const Login = memo(() => {
  const navigate = useNavigate();
  const [passToggle, setPassToggle] = useState(false);
  // 情報
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // メッセージ
  const [errMsgText, setErrMsgText] = useState("");
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  // カスタムフック
  const { messageWindow } = useStyle(); // アニメーション
  const { errorBorderMsg } = messageWindow;

  useEffect(() => {
    // セッション情報によってルートを制限する
    const getLoginState = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        loggedIn ? navigate(`/mybooks`) : navigate("/login");
      });
    };
    getLoginState();
  }, []);

  // Memo : registerのlogin関数と共通化
  const login = async () => {
    // ログイン認証の関数
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/login`, {
      username,
      password,
    }).then((response) => {
      const { auth, token, result, msg } = response.data;
      console.log({ auth, token, result, msg });
      setErrMsgText(msg);
      setErrMsgToggle(true);
      setTimeout(() => {
        setErrMsgToggle(false);
      }, 3000);
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/isUserAuth`).then(
        (response) => {
          const { auth, msg } = response.data;
          console.log({ auth, msg });
          auth && navigate(`/mybooks`);
        }
      );
    });
  };

  // DOMから関数の切り出し
  const inputInfrom = (e) => {
    e.target.id === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
    setErrMsgToggle(false);
  };
  const toggleIcon = () => setPassToggle(!passToggle);

  return (
    <>
      <Header root={"/"}>
        <HeaderRegBtn />
      </Header>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
          <h1 className="my-10 text-2xl font-bold text-slate-600">
            ログインする
          </h1>
          <p className="text-center text-sm text-slate-600">
            まだ新規登録がお済みでない場合は
            <br />
            <a
              href="/register"
              className="border-b border-blue-400 text-blue-800"
            >
              新規登録
            </a>
            から
          </p>
          <form className="relative mt-8 mb-2 w-[210px] space-y-2 text-center">
            <input
              id="username"
              type="text"
              value={username}
              onChange={inputInfrom}
              autoFocus
              placeholder="ユーザーネーム"
              className={[
                errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base,
              ]}
            />
            <input
              id="password"
              type={passToggle ? "text" : "password"}
              value={password}
              onChange={inputInfrom}
              placeholder="パスワード"
              className={[
                errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base,
              ]}
            />
            <button
              onClick={toggleIcon}
              className="absolute right-2 top-[50px] text-2xl text-slate-600"
            >
              {passToggle ? (
                <BsFillEyeFill />
              ) : (
                <BsFillEyeSlashFill className="text-slate-400" />
              )}
            </button>
          </form>
          <a href="/password-change" className="text-sm text-blue-800">
            パスワードを忘れた場合
          </a>
          <button
            type="submit"
            onClick={login}
            className={
              "mt-6 mb-4 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md"
            }
          >
            はじめる
          </button>
          <a href="/mybooks" className="text-sm text-blue-800">
            ゲストユーザーではじめる
          </a>
          <ErrorMsgWindow
            msgToggle={errMsgToggle}
            msgText={errMsgText}
            headerText="注意"
          />
        </div>
      </div>
      <Footer />
    </>
  );
});
