import { memo } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export const CloseBtn = memo(({ onClickClose }) => {
  return (
    <button
      id="termsOfService"
      className="absolute right-0 top-0 p-3 text-4xl text-gray-600 hover:bg-black hover:bg-opacity-40 hover:text-white"
      onClick={onClickClose}
    >
      <AiOutlinePlus id="termsOfService" className="rotate-45 transform" />
    </button>
  );
});
