import { memo, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

// アイコン
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/button/HeaderLoginBtn";
import { Header } from "../organisms/Header";
import { Loading } from "../atoms/style/Loading";
import { TermsOfService } from "./TermsOfService";
// カスタムフック
import { useSegment } from "../custom/useSegment";
import { useStyle } from "../custom/useStyle";
// コンテキスト
import { Context } from "../../App";

export const Register = memo(() => {
  const navigate = useNavigate();

  // 情報
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // メッセージ
  const [errMsgText, setErrMsgText] = useState("");
  const [errMsgToggle, setErrMsgToggle] = useState(false);
  // Toggle
  const [loading, setLoading] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const [checkBoxFirst, setCheckBoxFirst] = useState(false);
  const [checkBoxSecond, setCheckBoxSecond] = useState(false);
  const [termsOfServiceModal, setTermsOfServiceModal] = useState(false);
  // カスタムフック
  const { countGrapheme } = useSegment();
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
    if (password.length >= 6) {
      await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/register`, {
        username,
        password,
      }).then((response) => {
        const { result, msg } = response.data;
        if (!result) {
          // usernameまたはpasswordが空の場合,usernameが既に存在している場合
          setErrMsgText(msg);
          setErrMsgToggle(true);
        } else {
          // 新規登録に成功後、自動ログインする。
          setLoading(true);
          setTimeout(() => login(), 1000);
        }
      });
    } else {
      // パスワードが6文字以下の場合
      setErrMsgToggle(true);
    }
  };

  const login = async () => {
    await Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/login`, {
      username,
      password,
    }).then((response) => {
      const { msg } = response.data;
      setErrMsgText(msg);
      setErrMsgToggle(true);
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
    if (id === "username" && num <= 12) {
      setUsername(value);
    } else if (id === "password" && num <= 32) {
      if (value.match(/^[\x20-\x7e]*$/)) {
        // \x20-\x7e - すべてのASCII(アスキー)文字に一致する正規表現
        // 半角英数字と記号のみ 半角カナ文字NG
        const newValue = value.split(" ").join("");
        // splitの引数は区切り文字。上記の場合、空白が入力されたらそこで区切ると言う意味。「abc def」は["abc","def"]のように、一つの配列にまとまる。この配列内の要素をjoinメソッドによって連結させる。
        // join - 引数未指定の場合は連結後、コンマで区切られる。引数が""の場合は連結後の区切り文字がなくなる。"-"の場合はハイフンで区切られる。
        setPassword(newValue);
      }
    }
    setErrMsgToggle(false);
  };

  const termsOfServiceModalToggle = () => {
    setTermsOfServiceModal(!termsOfServiceModal);
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
          <div className="flex h-screen w-screen items-center justify-center bg-white">
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
              <form className="relative mt-8 mb-2 w-[280px] space-y-2 text-center">
                <div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={inputInform}
                    autoFocus
                    placeholder="ユーザー名"
                    className={
                      errMsgToggle &&
                      (!username ||
                        errMsgText === "このユーザー名は既に使用されています。")
                        ? // errMsgToggle + !username = 空欄の場合
                          // errMsgToggle + username = 重複時
                          errorBorderMsg.showed
                        : errorBorderMsg.base
                    }
                  />
                  <div className="relative h-4 w-full text-sm">
                    <div className="absolute left-0 top-0 text-red-600">
                      {errMsgToggle && !username ? (
                        <p>ユーザー名を入力してください。</p>
                      ) : errMsgToggle &&
                        errMsgText ===
                          "このユーザー名は既に使用されています。" ? (
                        <p>{errMsgText}</p>
                      ) : (
                        username.length === 12 && <p>文字数が最大です。</p>
                      )}
                    </div>
                    <p className="absolute right-0 top-0 text-sm text-slate-500">
                      {username.length}/12
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
                    className={
                      errMsgToggle && (!password || password.length < 6)
                        ? errorBorderMsg.showed
                        : errorBorderMsg.base
                    }
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
                    onClick={() => setPasswordShow(!passwordShow)}
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
              <div className="my-4 space-y-2 text-sm text-slate-800">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onClick={() => setCheckBoxFirst(!checkBoxFirst)}
                  />
                  <button
                    onClick={termsOfServiceModalToggle}
                    className="ml-1 cursor-pointer border-b border-blue-800 font-bold text-blue-800"
                  >
                    利用規約
                  </button>
                  に同意する
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    onClick={() => setCheckBoxSecond(!checkBoxSecond)}
                  />
                  <button
                    onClick={""}
                    className="ml-1 cursor-pointer border-b border-blue-800 font-bold text-blue-800"
                  >
                    推奨するブラウザ
                  </button>
                  について確認しました
                </div>
              </div>
              <button
                disabled={!checkBoxFirst || !checkBoxSecond} // チェックなしの場合にdisabled状態にする
                onClick={register}
                className={[
                  checkBoxFirst && checkBoxSecond
                    ? "my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md active:bg-sky-900"
                    : "my-6 cursor-not-allowed rounded-md bg-sky-900 p-2 px-4 font-bold text-white opacity-40 shadow-md",
                ]}
              >
                登録してはじめる
              </button>
            </div>
            {termsOfServiceModal && (
              <TermsOfService onClickToggle={termsOfServiceModalToggle} />
            )}
          </div>
        </>
      )}
    </>
  );
});
