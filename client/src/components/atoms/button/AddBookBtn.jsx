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
      <div className="fixed bottom-1 left-40 z-10">
        <label className="flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white">
          <button
            onClick={() => {
              setModalToggle(true);
            }}
            className="text-2xl font-bold text-slate-400"
          >
            <AiOutlinePlus className="hover:rotate-45 transform transition-transform duration-700" />
          </button>
        </label>
      </div>
    </div>
  );
});
