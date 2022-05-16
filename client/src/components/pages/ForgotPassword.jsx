export const ForgotPassword = () => {
  return (
    <div className="h-screen w-screen">
      <p>再設定用メールを送信</p>
      <p>メールアドレス</p>
      <input type="email" placeholder="メールアドレス" />
      <button type="submit">送信</button>
    </div>
  );
};
