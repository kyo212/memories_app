import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen flex-col items-center space-y-2 bg-slate-100 pt-20">
      <p className="text-4xl font-bold">404 Not found</p>
      <p>ページが見つかりません</p>
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
