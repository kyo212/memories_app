import { memo } from "react";
// パッケージ
import { Routes, Route } from "react-router-dom";
// コンポーネント
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { MyBooks } from "../components/pages/MyBooks";
import { Register } from "../components/pages/Register";
import { Book } from "../components/pages/category/Book";

export const Router = memo(() => {
  return (
    <div className="h-screen w-screen bg-gray-200">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/book" element={<Book />} />
      </Routes>
      <div className="bg-gray-300">フッター</div>
    </div>
  );
});
