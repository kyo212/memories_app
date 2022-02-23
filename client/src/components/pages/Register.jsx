import { memo, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { Footer } from "../organisms/Footer";
import { Header } from "../organisms/Header";
import { MsgWindow } from "../atoms/message/MsgWindow";
// サードパーティ
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
import { useStyle } from "../custom/useStyle";
// カスタムフック

export const Register = memo(() => {
  const navigate = useNavigate();

  const [passToggle, setPassToggle] = useState(false);
  const [checkBoxFirst, setCheckBoxFirst] = useState(false);
  const [checkBoxSecond, setCheckBoxSecond] = useState(false);
  // 情報
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // メッセージ
  const [msgText, setMsgText] = useState("");
  const [msgToggle, setMsgToggle] = useState(false);
  // カスタムフック
  const { messageWindow } = useStyle();
  const { errorBorderMsg } = messageWindow;

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

  const login = async () => {
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/login`, {
      username,
      password,
    }).then((response) => {
      const { auth, token, result, msg } = response.data;
      console.log({ auth, token, result, msg });
      setMsgText(msg);
      setMsgToggle(true);
      Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/isUserAuth`).then(
        (response) => {
          const { auth, msg } = response.data;
          console.log({ auth, msg });
          auth && navigate(`/mybooks`);
        }
      );
    });
  };

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
          setMsgText(msg);
          setMsgToggle(true); // レスポンスメッセージ出現
          setUsername("");
          setPassword("");
        } else {
          // 新規登録に成功後、自動ログインする。
          setTimeout(() => {
            login();
          }, 1000);
        }
      });
    }
  };

  return (
    <>
      <Header root={"/"}>
        <HeaderLoginBtn />
      </Header>
      <div className="flex h-screen w-screen items-center justify-center bg-white">
        <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
          <h1 className="my-10 text-2xl font-bold text-slate-600">
            新規登録をする
          </h1>
          <p className="text-sm text-slate-600">
            新規登録がお済みの方は
            <a href="/login" className="border-b border-blue-400 text-blue-800">
              ログイン
            </a>
            から
          </p>
          <form className="relative mt-8 mb-2 w-[210px] space-y-2 text-center">
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setMsgToggle(true);
              }}
              autoFocus
              placeholder="ユーザーネーム"
              className={
                msgText ? errorBorderMsg.showed : errorBorderMsg.base
              }
            />
            <input
              type={passToggle ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setMsgToggle(true);
              }}
              placeholder="パスワード"
              className={
                msgToggle ? errorBorderMsg.showed : errorBorderMsg.base
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
                <a className="font-bold text-blue-800">利用規約</a>に同意する
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                onClick={() => setCheckBoxSecond(!checkBoxSecond)}
              />
              <label className="ml-1">
                <a className="font-bold text-blue-800">プライバシーポリシー</a>
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
          <MsgWindow msgShow={{ msgToggle, msgText }} headerText="注意" />
        </div>
      </div>
      <Footer />
    </>
  );
});
