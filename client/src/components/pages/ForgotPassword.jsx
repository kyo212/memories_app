import { useState } from "react";
import axios from "axios";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const submitEmail = async () => {
    await axios
      .post(`http://${process.env.REACT_APP_PUBLIC_IP}/forgotPassword`, {
        email,
      })
      .then((response) => {
        const { email } = response.data;
        console.log(email);
      });
    setEmail("");
  };

  const inputEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
  };

  return (
    <div className="h-screen w-screen">
      <p>再設定用メールを送信</p>
      <p>メールアドレス</p>
      <input
        onChange={inputEmail}
        value={email}
        type="email"
        placeholder="メールアドレス"
        className="border border-slate-500 py-1 px-2"
      />
      <button onClick={submitEmail}>送信</button>
    </div>
  );
};
