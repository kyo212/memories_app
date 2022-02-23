import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const ErrorMsgWindow = memo(({ msgToggle, msgText, headerText }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト

  return (
    <>
      <p className={[msgToggle ? errorMsg.showed : errorMsg.base]}>
        <span className="mr-2 font-bold">{headerText}:</span>
        {msgText}
      </p>
    </>
  );
});
