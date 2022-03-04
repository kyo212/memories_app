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
import { Diary } from "../components/pages/categorys/Diary";
import { Family } from "../components/pages/categorys/Family";
import { Child } from "../components/pages/categorys/Child";
import { Pet } from "../components/pages/categorys/Pet";
import { Hoby } from "../components/pages/categorys/Hoby";
import { Friend } from "../components/pages/categorys/Friend";
import { Lover } from "../components/pages/categorys/Lover";
import { Travel } from "../components/pages/categorys/Travel";
import { Portfolio } from "../components/pages/categorys/Portfolio";

export const Router = memo(() => {
  return (
    <div className="h-screen w-screen">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/session" element={<Session />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/mybooks" element={<MyBooks />} />
        <Route path="/mybooks/diary" element={<Diary />} />
        <Route path="/mybooks/family" element={<Family />} />
        <Route path="/mybooks/child" element={<Child />} />
        <Route path="/mybooks/pet" element={<Pet />} />
        <Route path="/mybooks/hoby" element={<Hoby />} />
        <Route path="/mybooks/friend" element={<Friend />} />
        <Route path="/mybooks/lover" element={<Lover />} />
        <Route path="/mybooks/travel" element={<Travel />} />
        <Route path="/mybooks/portfolio" element={<Portfolio />} />
        {/* Not found ページ*/}
        <Route path="/*" element={<NotFound />} />
        <Route path="session/*" element={<NotFound />} />
        <Route path="login/*" element={<NotFound />} />
        <Route path="register/*" element={<NotFound />} />
        <Route path="mybooks/*" element={<NotFound />} />
      </Routes>
    </div>
  );
});
