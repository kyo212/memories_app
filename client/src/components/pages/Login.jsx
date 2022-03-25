import { memo, useState, useEffect, useContext } from "react";
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
// コンテキスト
import { Context } from "../../App";

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
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);

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
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/isUserAuth`).then(
        (response) => {
          const { auth, msg } = response.data;
          console.log({ auth, msg });
          auth && navigate(`/mybooks`);
        }
      );
    });
  };

  const inputInfrom = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "username" && value.length <= 12) {
      setUsername(value);
    } else if (id === "password" && value.length <= 32) {
      setPassword(value);
    }
    setErrMsgToggle(false); // エラーを解除
  };

  const toggleIcon = () => setPassToggle(!passToggle);

  return (
    <>
      <Header root={"/"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <HeaderRegBtn />
      </Header>
      <div className="flex h-[85%] w-screen items-center justify-center bg-white">
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
          <form className="relative mt-8 mb-2 w-[280px] space-y-2 text-center">
            <div>
              <input
                id="username"
                type="text"
                value={username}
                onChange={inputInfrom}
                autoFocus
                placeholder="ユーザー名"
                className={[
                  errMsgToggle && !username
                    ? errorBorderMsg.showed
                    : errorBorderMsg.base,
                ]}
              />
              <div className="relative h-4 w-full text-sm">
                <div className="absolute left-0 top-0">
                  {errMsgToggle && !username ? (
                    <p className="text-red-600">
                      ユーザー名を入力してください。
                    </p>
                  ) : (
                    username.length === 12 && (
                      <p className="text-sm text-red-600">文字数が最大です。</p>
                    )
                  )}
                  {errMsgToggle && <p className="text-red-600">{errMsgText}</p>}
                </div>
                <p className="absolute right-0 top-0 text-slate-500">
                  {username.length}/12
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                id="password"
                type={passToggle ? "text" : "password"}
                value={password}
                onChange={inputInfrom}
                placeholder="パスワード"
                className={[
                  errMsgToggle && (!password || password.length < 6)
                    ? errorBorderMsg.showed
                    : errorBorderMsg.base,
                ]}
              />
              <div className="flex justify-between">
                {errMsgToggle && password.length < 6 ? (
                  <p className="text-sm text-red-600">
                    6文字以上入力してください。
                  </p>
                ) : password.length === 32 ? (
                  <p className="text-sm text-red-600">文字数が最大です。</p>
                ) : (
                  <p className="text-[12px] text-slate-500">
                    6文字以上32文字以内、半角英数字のみ、スペースなし
                  </p>
                )}
                <p className="ml-2 text-sm text-slate-500">
                  {password.length}/32
                </p>
              </div>
              <span
                onClick={toggleIcon}
                className="absolute right-2 top-2 text-2xl text-slate-600"
              >
                {passToggle ? (
                  <BsFillEyeFill />
                ) : (
                  <BsFillEyeSlashFill className="text-slate-400" />
                )}
              </span>
            </div>
          </form>
          <a href="/password-change" className="text-sm text-blue-800">
            パスワードを忘れた場合
          </a>
          <button
            onClick={login}
            className={
              "mt-6 mb-4 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md"
            }
          >
            はじめる
          </button>
          {/* <ErrorMsgWindow msgToggle={errMsgToggle} msgText={errMsgText} /> */}
        </div>
      </div>
      <Footer />
    </>
  );
});
