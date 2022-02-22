// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const MsgWindow = ({ MsgShow }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  // MsgWindow → bool値 // responseMsg → メッセージテキスト
  const { responseMsgShow, responseMsg } = MsgShow;
  console.log(responseMsgShow, responseMsg);

  return (
    <p className={[responseMsgShow ? errorMsg.showed : errorMsg.base]}>
      <span className="font-bold">注意 :</span> {responseMsg}
    </p>
  );
};
