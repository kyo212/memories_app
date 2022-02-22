import { memo, useState } from "react";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント


export const AddBookBtn = memo(({setModalToggle}) => {
  return (
    <div>
   
      <div className="fixed bottom-1 left-40 z-10">
        <label className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <button
            onClick={() => {
              setModalToggle(true);
            }}
            className="text-3xl font-bold text-slate-700"
          >
            <AiOutlinePlus className="hover:rotate-45 transform transition-transform duration-700" />
          </button>
        </label>
      </div>
    </div>
  );
});
