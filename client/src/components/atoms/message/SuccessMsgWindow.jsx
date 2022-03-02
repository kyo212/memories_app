import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const SuccessMsgWindow = memo(({ msgToggle, msgText, headerText }) => {
  const { messageWindow } = useStyle();
  const { successMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト

  return (
    <>
      {msgToggle && (
        <p className={[msgToggle ? successMsg.showed : successMsg.base]}>
          <span className="mr-2 font-bold">{headerText}:</span>
          {msgText}
        </p>
      )}
    </>
  );
});
