import { memo } from "react";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";

export const AddBookBtn = memo(({ setModalToggle }) => {
  const modalToggle = () => setModalToggle(true);

  return (
    <>
      <div className="fixed bottom-1 left-1/2 transform -translate-x-1/2 z-10">
        <label className="flex h-12 w-12 items-center justify-center rounded-full bg-white">
          <button
            onClick={modalToggle}
            className="text-3xl font-bold text-slate-700"
          >
            <AiOutlinePlus className="transform transition-transform duration-700 hover:rotate-45" />
          </button>
        </label>
      </div>
    </>
  );
});
