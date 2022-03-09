import { memo } from "react";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";

export const AddBookBtn = memo(({ setModalToggle }) => {
  const modalToggle = () => setModalToggle(true);

  return (
    <>
      <div className="fixed bottom-3 right-0 z-10 -translate-x-1/2 transform rounded-full">
        <label className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-slate-500">
          <button
            onClick={modalToggle}
            className="text-2xl font-bold text-slate-700"
          >
            <AiOutlinePlus className="transform transition-transform duration-700 hover:rotate-45" />
          </button>
        </label>
      </div>
    </>
  );
});
