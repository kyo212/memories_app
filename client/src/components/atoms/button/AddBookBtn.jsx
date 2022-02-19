import { memo, useState } from "react";
export const AddBookBtn = memo(() => {
  const [test, setTest] = useState(false);

  return (
    <div>
      {/* モーダル */}
      {test && <p className="fixed">a</p>}
      <div>
        <label className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-300">
          <button
            onClick={() => {
              setTest(!test);
            }}
            className="text-2xl font-bold text-white"
          >
            +
          </button>
        </label>
      </div>
    </div>
  );
});
