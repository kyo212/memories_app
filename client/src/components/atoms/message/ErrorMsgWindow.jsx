import { memo } from "react";
// アイコン
import { BsExclamationCircleFill } from "react-icons/bs";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const ErrorMsgWindow = memo(({ msgToggle, msgText, headerText }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト

  return (
    <div className={[msgToggle ? errorMsg.showed : errorMsg.base]}>
      <p className="flex">
        <span className="mr-2 text-xl text-red-600 ">
          <BsExclamationCircleFill />
        </span>
        {msgText}
      </p>
    </div>
  );
});
