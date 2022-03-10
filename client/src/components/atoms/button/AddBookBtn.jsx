import { memo } from "react";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";

export const AddBookBtn = memo(({ setModalToggle }) => {
  const modalToggle = () => setModalToggle(true);

  return (
    <>
      <div className="fixed bottom-2 right-2 z-10 transform rounded-full">
        <label className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md">
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
