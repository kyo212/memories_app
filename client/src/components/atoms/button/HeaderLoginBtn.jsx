import { useNavigate } from "react-router-dom";

export const HeaderLoginBtn = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate("/login")}
      className="transform rounded-full border border-blue-700 bg-sky-700 p-2 text-[12px] font-bold text-white outline-none transition-all hover:bg-white hover:text-blue-700"
    >
      はじめる
    </button>
  );
};
