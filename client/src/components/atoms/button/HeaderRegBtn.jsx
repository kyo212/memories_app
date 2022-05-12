import { useNavigate } from "react-router-dom";

export const HeaderRegBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/register")}
      className="transform rounded-full border border-sky-700 p-2 text-[12px] font-bold text-sky-700 outline-none transition-all hover:bg-sky-700 hover:text-white"
    >
      新規登録
    </button>
  );
};
