export const Footer = () => {
  return (
    <div className="w-full bg-slate-700 px-2 py-4 text-white">
      <h1 className="ml-4 mb-2 select-none font-serif text-xl font-bold text-white">
        <a href="/">memories</a>
      </h1>
      <ul className="ml-6 text-sm space-y-2">
        <li>About</li>
        <li>利用規約</li>
        <li>プライバシーポリシー</li>
        <li>ヘルプ</li>
        &copy;
      </ul>
    </div>
  );
};
