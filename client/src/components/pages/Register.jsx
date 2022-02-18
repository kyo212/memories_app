import { memo } from "react";
// コンポーネント
import { HeaderLoginBtn } from "../atoms/HeaderLoginBtn";
import { Header } from "../organisms/Header";
import { LoginRegThema } from "../organisms/LoginRegThema";

export const Register = memo(() => {
  return (
    <>
      <Header>
        <HeaderLoginBtn />
      </Header>
      <LoginRegThema
        root={"login"}
        title={"新規登録をする"}
        text={"新規登録がお済みの方は"}
        rootText={"ログイン"}
        button={"登録してはじめる"}
      >
        <div className="my-4 space-y-2 text-sm text-slate-800">
          <div className="flex items-center">
            <input type="checkbox" />
            <label className="ml-1">
              <a className="font-bold text-blue-800">利用規約</a>に同意する
            </label>
          </div>
          <div className="flex items-center">
            <input type="checkbox" />
            <label className="ml-1">
              <a className="font-bold text-blue-800">プライバシーポリシー</a>
              に同意する
            </label>
          </div>
        </div>
      </LoginRegThema>
    </>
  );
});
