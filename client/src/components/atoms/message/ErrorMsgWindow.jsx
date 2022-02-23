import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const ErrorMsgWindow = memo(({ msgShow, headerText }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト
  const { errMsgToggle, errMsgText } = msgShow;

  return (
    <>
      <p className={[errMsgToggle ? errorMsg.showed : errorMsg.base]}>
        <span className="mr-2 font-bold">{headerText}:</span>
        {errMsgText}
      </p>
    </>
  );
});
