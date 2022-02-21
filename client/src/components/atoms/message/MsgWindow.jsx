// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const MsgWindow = ({ MsgShow }) => {
  const { messageWindow } = useStyle();
  const { errorMsg } = messageWindow;
  const { responseMsgShow, responseMsg } = MsgShow;

  return (
    <p className={[responseMsgShow ? errorMsg.showed : errorMsg.base]}>
      <span className="font-bold">注意 :</span> {responseMsg}
    </p>
  );
};
