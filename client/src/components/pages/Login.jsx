import { memo, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
// カスタムフック
import { useSegment } from "../custom/useSegment";
import { useStyle } from "../custom/useStyle";
// コンポーネント
import { HeaderRegBtn } from "../atoms/button/HeaderRegBtn";
import { Header } from "../organisms/Header";
// アイコン
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";
// コンテキスト
import { Context } from "../../App";

// ------------------------------------------
// ログイン画面のコンポーネント
// ------------------------------------------

export const Login = memo(() => {
  const navigate = useNavigate();
  // Toggle
  const [passwordShow, setPasswordShow] = useState(false);
  // 情報
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [countNumber, setCountNumber] = useState({ id: "", num: 0 });
  // メッセージ
  const [errMsgText, setErrMsgText] = useState("");
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  // カスタムフック
  const { countGrapheme } = useSegment();
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
      email,
      password,
    }).then((response) => {
      const { msg, result } = response.data;
      !result && setErrMsgToggle(true);
      setErrMsgText(msg);
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/isUserAuth`).then(
        (response) => {
          const { auth } = response.data;
          auth && navigate(`/mybooks`);
        }
      );
    });
  };

  const inputInform = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const num = countGrapheme(value);
    setCountNumber({ id, num });
    if (id === "email" && num < 40) {
      setEmail(value);
      setUsername(value);
    } else if (id === "password" && num < 32) {
      // バリデーション
      if (value.match(/^[\x20-\x7e]*$/)) {
        const newValue = value.split(" ").join("");
        setPassword(newValue);
      }
    }
    setErrMsgToggle(false); // エラーを解除
  };

  const toggleIcon = () => setPasswordShow(!passwordShow);

  return (
    <>
      <Header root={"/"} headerOpen={{ headerToggle, setHeaderToggle }}>
        <HeaderRegBtn />
      </Header>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
          <h1 className="my-7 text-2xl font-bold text-slate-600">
            ログインする
          </h1>
          <p className="text-center text-sm text-slate-600">
            <button
              onClick={() => navigate("/register")}
              className="border-b border-blue-400 text-blue-800"
            >
              新規登録
            </button>
            はこちら
          </p>
          <form className="relative mt-8 mb-2 w-[280px] space-y-2 text-center">
            <div>
              <input
                id="email"
                type="text"
                value={email}
                onChange={inputInform}
                autoFocus
                placeholder="メールアドレスまたはユーザー名"
                className={[
                  (errMsgToggle &&
                    (!email || errMsgText === "userIsNotFound")) ||
                  (countNumber.id === "email" && countNumber.num === 40)
                    ? errorBorderMsg.showed
                    : errorBorderMsg.base,
                ]}
              />
              <div className="relative h-4 w-full text-sm">
                <div className="absolute left-0 top-0">
                  {errMsgToggle && !email ? (
                    <p className="text-red-600">
                      メールアドレスまたはユーザー名を入力してください。
                    </p>
                  ) : errMsgToggle && errMsgText === "userIsNotFound" ? (
                    <p className="text-red-600">ユーザーが見つかりません。</p>
                  ) : (
                    countNumber.id === "email" &&
                    countNumber.num === 40 && (
                      <p className="text-sm text-red-600">文字数が最大です。</p>
                    )
                  )}
                </div>
                <p className="absolute right-0 top-0 text-slate-500">
                  {countNumber.id === "email" && `${countNumber.num}/40`}
                </p>
              </div>
            </div>
            <div className="relative">
              <input
                id="password"
                type={passwordShow ? "text" : "password"}
                value={password}
                onChange={inputInform}
                placeholder="パスワード"
                className={[
                  (errMsgToggle &&
                    (!password ||
                      password.length < 6 ||
                      errMsgText === "passwordFalse")) ||
                  (countNumber.id === "password" && countNumber.num === 32)
                    ? errorBorderMsg.showed
                    : errorBorderMsg.base,
                ]}
              />
              <div className="flex justify-between">
                {errMsgToggle && password.length < 6 ? (
                  <p className="text-sm text-red-600">
                    6文字以上入力してください。
                  </p>
                ) : errMsgToggle && errMsgText === "passwordFalse" ? (
                  <p className="text-sm text-red-600">
                    パスワードが間違っています。
                  </p>
                ) : countNumber.id === "password" && countNumber.num === 32 ? (
                  <p className="text-sm text-red-600">文字数が最大です。</p>
                ) : (
                  <p className="text-[12px] text-slate-500">
                    6文字以上32文字以内、半角英数字のみ、スペースなし
                  </p>
                )}
                <p className="ml-2 text-sm text-slate-500">
                  {countNumber.id === "password" && `${countNumber.num}/32`}
                </p>
              </div>
              <span
                onClick={toggleIcon}
                className="absolute right-2 top-2 text-2xl text-slate-600"
              >
                {passwordShow ? (
                  <BsFillEyeFill />
                ) : (
                  <BsFillEyeSlashFill className="text-slate-400" />
                )}
              </span>
            </div>
          </form>
          <button onClick={()=>{navigate("/change-password")}} className="text-sm text-blue-800">
            パスワードを忘れた場合
          </button>
          <button
            onClick={login}
            className={
              "mt-6 mb-4 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md active:bg-sky-900"
            }
          >
            はじめる
          </button>
        </div>
      </div>
    </>
  );
});
