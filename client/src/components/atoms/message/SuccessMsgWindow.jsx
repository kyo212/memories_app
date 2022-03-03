import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
import { ChangeJapanese } from "../ChangeJapanese";

export const SuccessMsgWindow = memo(
  ({ msgToggle, category, msgText, headerText }) => {
    const { messageWindow } = useStyle();
    const { successMsg } = messageWindow;
    // msgToggle → bool値 // msgText → メッセージテキスト

    return (
      <>
        {msgToggle && (
          <p className={[msgToggle ? successMsg.showed : successMsg.base]}>
            <span className="mr-2 font-bold">{headerText}:</span>
            <ChangeJapanese category={category} />
            {msgText}
          </p>
        )}
      </>
    );
  }
);
