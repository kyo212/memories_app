import { memo } from "react";
// アイコン
import { BsFillEyeFill, BsFillEyeSlashFill } from "react-icons/bs";

export const PasswordSecretBtn = memo(({ toggleIcon, passwordSecret }) => {
  return (
    <span
      onClick={toggleIcon}
      className="absolute right-2 top-2 text-2xl text-slate-600"
    >
      {passwordSecret ? (
        <BsFillEyeFill />
      ) : (
        <BsFillEyeSlashFill className="text-slate-400" />
      )}
    </span>
  );
});
