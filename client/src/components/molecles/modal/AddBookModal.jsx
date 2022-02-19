import { memo } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";

export const AddBookModal = memo(({ toggle }) => {
  const { modalToggle, setModalToggle } = toggle;
  const { modalAnimation } = useStyle();

  return (
    <div
      className={[modalToggle ? modalAnimation.showed : modalAnimation.base]}
    >
      <div className="flex h-[70%] w-[85%] items-center justify-center rounded-md bg-white">
        <div className="h-[98%] w-[95%] bg-gray-200">
          <label>
            表紙のタイトル
            <input type="text" />
          </label>
          <label>
            表紙
            <img src="" alt="" />
          </label>
          <label>
            カテゴリー
            <select name="カテゴリー" className="text-sm">
              <option>カテゴリーを選択してください。</option>
              <option>カテゴリーを選択してください。</option>
              <option>カテゴリーを選択してください。</option>
            </select>
          </label>
        </div>
      </div>
      {/* 閉じるボタン */}
      <span
        className="absolute bottom-0 right-0 inline-block p-4 text-4xl text-white hover:bg-white hover:bg-opacity-40"
        onClick={() => {
          setModalToggle(false);
        }}
      >
        <AiOutlinePlus className="rotate-45 transform" />
      </span>
    </div>
  );
});
