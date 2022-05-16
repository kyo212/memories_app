import { useNavigate } from "react-router-dom";

export const Session = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-2 bg-slate-100 pt-20">
      <p className="text-2xl font-bold text-slate-800">
        セッションが切れました
      </p>
      <div>
        もう一度
        <button
          onClick={() => {
            navigate("/login");
          }}
          className="border-b border-blue-800 font-bold text-blue-800"
        >
          ログイン
        </button>
        してください
      </div>

      <button
        onClick={() => {
          navigate("/");
        }}
        className="my-2 border-b border-blue-800 text-blue-800"
      >
        ホームへ戻る
      </button>
    </div>
  );
};
