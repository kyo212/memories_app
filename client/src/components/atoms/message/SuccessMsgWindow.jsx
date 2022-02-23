import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const SuccessMsgWindow = memo(({ msgShow, headerText }) => {
  const { messageWindow } = useStyle();
  const { successMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト
  const { msgToggle, msgText } = msgShow;

  return (
    <>
      <p className={[msgToggle ? successMsg.showed : successMsg.base]}>
        <span className="mr-2 font-bold">{headerText}:</span>
        {msgText}
      </p>
    </>
  );
});
