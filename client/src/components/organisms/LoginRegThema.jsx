import { useState } from "react";
// サードパーティ
import { BsFillEyeFill } from "react-icons/bs";
import { BsFillEyeSlashFill } from "react-icons/bs";

export const LoginRegThema = ({
  root,
  text,
  rootText,
  title,
  button,
  children,
}) => {
  const [passToggle, setPassToggle] = useState(false);

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-white">
      <div className="flex h-[400px] w-[400px] flex-col items-center justify-center rounded-md">
        <h1 className="my-10 text-2xl font-bold text-slate-600">{title}</h1>
        <p className="text-sm text-slate-600">
          {text}
          <a
            href={`/${root}`}
            className="border-b border-blue-400 text-blue-800"
          >
            {rootText}
          </a>
          から
        </p>
        <form className="relative mt-8 mb-2 w-[210px] space-y-2 text-center">
          <input
            type="text"
            autoFocus
            placeholder="ユーザーネーム"
            className="rounded border border-slate-400 px-4 py-2 outline-none"
          />
          <input
            type={passToggle ? "text" : "password"}
            placeholder="パスワード"
            className="rounded border border-slate-400 px-4 py-2 outline-none"
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
        {children}
        <button className="my-6 rounded-md bg-sky-600 p-2 px-4 font-bold text-white shadow-md">
          <a href="/mybooks">{button}</a>
        </button>
      </div>
    </div>
  );
};
