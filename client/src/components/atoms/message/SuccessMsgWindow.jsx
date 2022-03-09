import { memo } from "react";
// アイコン
import { BsCheckCircleFill } from "react-icons/bs";
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
          <span className="mr-2 text-xl text-green-600 ">
            <BsCheckCircleFill />
          </span>
          <ChangeJapanese category={category} />
          {msgText}
        </p>
      </div>
    </>
  );
});
