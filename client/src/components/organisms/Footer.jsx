export const Footer = () => {
  return (
    <div className="h-60 w-full bg-slate-700 px-2 py-4 text-white">
      <h1 className="ml-4 mb-2 select-none font-serif text-xl font-bold text-white">
        <a href="/">memories</a>
      </h1>
      <ul className="ml-6 space-y-2 text-sm">
        {/* <li>このアプリについて</li>
        <li>利用規約</li>
        <li>プライバシーポリシー</li>
        <li>このアプリの使い方</li> */}
        <li>推奨するOSとブラウザ</li>
      </ul>
    </div>
  );
};
