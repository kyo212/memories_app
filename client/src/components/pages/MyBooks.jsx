import { memo, useState } from "react";
// サードパーティsa-dopa
import { IoIosHelpCircleOutline } from "react-icons/io";
// コンポーネント
import { AddBookBtn } from "../atoms/button/AddBookBtn";
import { HeaderLogoutBtn } from "../atoms/button/HeaderLogoutBtn";
import { MenuOpenModal } from "../molecles/modal/MenuOpenModal";
import { FooterTab } from "../molecles/tabs/FooterTab";
import { Header } from "../organisms/Header";
import { ImageUrlCreate } from "../organisms/ImageUrlCreate";

export const MyBooks = memo(() => {
  const [arry, setArry] = useState([1, 2]);
  // 追加したカテゴリタグがfamiryだった場合、famiryルートへ遷移

  return (
    <>
      <Header root={"/mybooks"}>
        <div className="flex">
          <span className="mx-2 flex space-x-2">
            <IoIosHelpCircleOutline className="text-2xl text-slate-600" />
            <MenuOpenModal />
          </span>
          <HeaderLogoutBtn />
        </div>
      </Header>
      <div className="w-screen py-24">
        {/* 選んだタグの名前をパスに入れる */}
        <div className="my-0 mx-auto flex w-[90%] flex-wrap justify-between">
          {arry.map((item) => {
            return (
              <div key={item} className="relative">
                {/* 本の淵のUI */}
                <span className="absolute -top-[7px] -z-10 inline-block h-4 w-full rounded-xl border border-slate-300 bg-slate-100 " />
                <span className="absolute -right-1 -top-[7px] -z-10 inline-block h-[7px] w-[10px] rounded-full bg-white" />
                {/* 表紙 */}
                <div className="z-10 mb-6 flex h-52 w-40 flex-col  items-center border border-slate-300 bg-white text-slate-700 shadow-md">
                  <div className="text-bold flax mt-3 flex-col text-center text-lg">
                    <p className="border-b">Title</p>
                    <label className="text-[6px] text-slate-400">
                      カテゴリー
                    </label>
                  </div>
                  <ImageUrlCreate
                    className={"h-[60%] w-[90%] border shadow-inner"}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* フッタータブ */}
      <AddBookBtn />
      <FooterTab />
    </>
  );
});
