import { memo } from "react";
// アイコン
import { SuccessIcon } from "../icon/SuccessIcon";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
import { ChangeJapanese } from "../ChangeJapanese";

export const SuccessMsgWindow = memo(({ msgToggle, category, msgText }) => {
  const { messageWindow } = useStyle();
  const { successMsg } = messageWindow;
  // msgToggle → bool値 // msgText → メッセージテキスト

  return (
    <>
      <div className={[msgToggle ? successMsg.showed : successMsg.base]}>
        <p className="flex">
          <SuccessIcon />
          <ChangeJapanese category={category} />
          {msgText}
        </p>
      </div>
    </>
  );
});
