import { memo } from "react";
// パッケージ
import { Routes, Route } from "react-router-dom";
// コンポーネント
import { Home } from "./page/Home";
import { Login } from "./page/Login";
import { MyBooks } from "./page/MyBooks";
import { Register } from "./page/Register";
import { Book } from "./page/category/Book";

export const Router = memo(() => {
  return (
    <>
      <div className="bg-gray-300">ヘッダー</div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/book" element={<Book />} />
      </Routes>
      <div className="bg-gray-300">フッター</div>
    </>
  );
});
