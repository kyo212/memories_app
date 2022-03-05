import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// アイコン
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { Loading } from "../atoms/style/Loading";
import { ErrorMsgWindow } from "../atoms/message/ErrorMsgWindow";
// カスタムフック
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Register = memo(() => {
  const navigate = useNavigate();

  const [passToggle, setPassToggle] = useState(false);
  const [checkBoxFirst, setCheckBoxFirst] = useState(false);
  const [checkBoxSecond, setCheckBoxSecond] = useState(false);
  // 情報
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // メッセージ
  const [errMsgText, setErrMsgText] = useState("");
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  // Toggle
  const [loading, setLoading] = useState(false);
  // カスタムフック
  const { messageWindow } = useStyle();
  const { errorBorderMsg } = messageWindow;
  // コンテキスト
  const { headerToggle, setHeaderToggle } = useContext(Context);

  // セッション情報によってルートを制限する
  useEffect(() => {
    const getLoginState = async () => {
      await Axios.post(
        `http://${process.env.REACT_APP_PUBLIC_IP}/loginState`
      ).then((response) => {
        const { loggedIn } = response.data;
        loggedIn ? navigate(`/mybooks`) : navigate("/register");
      });
    };
    getLoginState();
  }, []);

  const register = async () => {
    if (checkBoxFirst && checkBoxSecond) {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/register`, {
        username,
        password,
      }).then((response) => {
        const { result, msg } = response.data;
        console.log(result, msg);
        if (!result) {
          // usernameまたはpasswordが空の場合,usernameが重複既に存在している場合
          setErrMsgText(msg);
          setErrMsgToggle(true);
          setTimeout(() => {
            setErrMsgToggle(false);
          }, 3000);
          setUsername("");
          setPassword("");
        } else {
          // 新規登録に成功後、自動ログインする。
          setLoading(true);
          setTimeout(() => login(), 1000);
        }
      });
    }
  };

  const login = async () => {
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

  const inputInform = (e) => {
    e.target.id === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
    setErrMsgToggle(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header root={"/"} headerOpen={{ headerToggle, setHeaderToggle }}>
            <HeaderLoginBtn />
          </Header>
          <div className="flex h-[85%] w-screen items-center justify-center bg-white">
            <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
              <h1 className="my-10 text-2xl font-bold text-slate-600">
                新規登録をする
              </h1>
              <p className="text-sm text-slate-600">
                新規登録がお済みの方は
                <a
                  href="/login"
                  className="border-b border-blue-400 text-blue-800"
                >
                  ログイン
                </a>
                から
              </p>
              <form className="relative mt-8 mb-2 w-[210px] space-y-2 text-center">
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={inputInform}
                  autoFocus
                  placeholder="ユーザーネーム"
                  className={
                    errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base
                  }
                />
                <input
                  id="password"
                  type={passToggle ? "text" : "password"}
                  value={password}
                  onChange={inputInform}
                  placeholder="パスワード"
                  className={
                    errMsgToggle ? errorBorderMsg.showed : errorBorderMsg.base
                  }
                />
                <span
                  onClick={() => setPassToggle(!passToggle)}
                  className="absolute right-2 top-[50px] text-2xl text-slate-600"
                >
                  {passToggle ? (
                    <BsFillEyeFill />
                  ) : (
                    <BsFillEyeSlashFill className="text-slate-400" />
                  )}
                </span>
              </form>
              <div className="my-4 space-y-2 text-sm text-slate-800">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onClick={() => setCheckBoxFirst(!checkBoxFirst)}
                  />
                  <label className="ml-1">
                    <a className="font-bold text-blue-800">利用規約</a>
                    に同意する
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onClick={() => setCheckBoxSecond(!checkBoxSecond)}
                  />
                  <label className="ml-1">
                    <a className="font-bold text-blue-800">
                      プライバシーポリシー
                    </a>
                    に同意する
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={register}
                className={[
                  checkBoxFirst && checkBoxSecond
                    ? "my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md"
                    : "my-6 cursor-not-allowed rounded-md bg-sky-900 p-2 px-4 font-bold text-white opacity-40 shadow-md",
                ]}
              >
                登録してはじめる
              </button>
              <ErrorMsgWindow
                msgToggle={errMsgToggle}
                msgText={errMsgText}
                headerText="注意"
              />
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  );
});
