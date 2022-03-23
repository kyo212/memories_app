import { memo } from "react";
// アイコン
import { ErrIcon } from "../icon/ErrIcon";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const ErrorMsgWindow = memo(({ msgToggle, msgText }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト

  return (
    <div className={[msgToggle ? errorMsg.showed : errorMsg.base]}>
      <p className="flex">
        <ErrIcon />
        {msgText}
      </p>
    </div>
  );
});
