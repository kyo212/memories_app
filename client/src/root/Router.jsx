import { memo } from "react";
// パッケージ
import { Routes, Route } from "react-router-dom";
// コンポーネント
import { Home } from "../components/pages/Home";
import { Login } from "../components/pages/Login";
import { MyBooks } from "../components/pages/MyBooks";
import { Register } from "../components/pages/Register";
import { NotFound } from "./NotFound";
import { Session } from "./Session";
// コンポーネント カテゴリーページ
import { Book } from "../components/pages/categorys/Book";

export const Router = memo(() => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/mybooks/book" element={<Book />} />

        {/* Not found ページ*/}
        <Route path="/*" element={<NotFound />} />
        <Route path="session/*" element={<NotFound />} />
        <Route path="login/*" element={<NotFound />} />
        <Route path="register/*" element={<NotFound />} />
        <Route path="mybooks/*" element={<NotFound />} />
        <Route path="mybooks/book/*" element={<NotFound />} />
      </Routes>
    </div>
  );
});
