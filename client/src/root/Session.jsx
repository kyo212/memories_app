export const Session = () => {
  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-2 bg-slate-100 pt-20">
      <p className="text-2xl font-bold text-slate-800">
        セッションが切れました
      </p>
      <p>
        もう一度
        <span className="border-b border-blue-800 font-bold text-blue-800">
          <button>
            <a href="/login">ログイン</a>
          </button>
        </span>
        してください
      </p>
      <button className="my-2">
        <a href="/" className="border-b border-blue-800 text-blue-800">
          ホームへ戻る
        </a>
      </button>
    </div>
  );
};
