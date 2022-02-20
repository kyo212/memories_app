export const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center pt-20 space-y-2 bg-slate-100">
      <p className="text-4xl font-bold">404 Not found</p>
      <p>ページが見つかりません</p>
      <button className="my-2">
        <a href="/" className="text-blue-800 border-b border-blue-800">ホームへ戻る</a>
      </button>
    </div>
  );
};
