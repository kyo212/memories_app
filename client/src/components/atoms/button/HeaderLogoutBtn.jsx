import { useNavigate } from "react-router-dom";
import Axios from "axios";

export const HeaderLogoutBtn = () => {
  const navigate = useNavigate();

  const logout = () => {
    Axios.post(`http://${process.env.REACT_APP_PUBLIC_IP}/logout`).then(
      (response) => {
        const { loggedIn } = response.data;
        if (!loggedIn) {
          navigate("/");
        }
      }
    );
  };

  return (
    <button onClick={logout} className="relative h-12 outline-none">
      <span className="h-full transform rounded-full border border-blue-700 bg-sky-700 p-2 text-[12px] font-bold text-white transition-all hover:bg-white hover:text-blue-700">
        ログアウト
      </span>
    </button>
  );
};
