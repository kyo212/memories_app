import { AddBookBtn } from "../../atoms/button/AddBookBtn";

export const FooterTab = () => {
  return (
    <div className="fixed bottom-0 h-14 w-full bg-slate-50">
      <div className="flex h-full w-full items-center justify-center space-x-2">
        <p>共有画面</p>
        <p className="">検索</p>
        <AddBookBtn />
        <p>ソート</p>
        <p>フィルター</p>
      </div>
    </div>
  );
};
