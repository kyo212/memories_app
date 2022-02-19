import { memo, useState } from "react";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { AddBookModal } from "../../molecles/modal/AddBookModal";

export const AddBookBtn = memo(() => {
  const [modalToggle, setModalToggle] = useState(false);

  return (
    <div>
      {/* モーダル */}
      <AddBookModal toggle={{ modalToggle, setModalToggle }} />
      <div className="fixed -bottom-2 left-36 z-10">
        <label className="flex h-20 w-20 items-center justify-center rounded-full border-2 bg-white">
          <button
            onClick={() => {
              setModalToggle(true);
            }}
            className="text-2xl font-bold text-slate-400"
          >
            <AiOutlinePlus className="hover:rotate-45 transform" />
          </button>
        </label>
      </div>
    </div>
  );
});
