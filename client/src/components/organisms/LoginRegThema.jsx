import { useState } from "react";

export const LoginRegThema = ({ root, text, rootText, title, children }) => {
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
        <form className="relative mt-8 mb-2 w-full space-y-2 text-center">
          <input
            type="text"
            autoFocus
            placeholder="ユーザーネーム"
            className="rounded border border-slate-400 px-4 py-2 outline-none"
          />
          <div className="relative">
            <input
              type={passToggle ? "text" : "password"}
              placeholder="パスワード"
              className="rounded border border-slate-400 px-4 py-2 outline-none"
            />
            <div className="absolute top-2 right-20">
              <span onClick={() => setPassToggle(!passToggle)}>
                {passToggle ? <>O</> : <>X</>}
              </span>
            </div>
          </div>
        </form>
        {children}
      </div>
    </div>
  );
};
