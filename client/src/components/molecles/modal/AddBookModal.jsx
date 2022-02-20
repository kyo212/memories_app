import { memo, useState } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";
// サードパーティ
import { AiOutlinePlus } from "react-icons/ai";
// コンポーネント
import { Tab } from "../tabs/Tab";

export const AddBookModal = memo(({ toggle }) => {
  const [fileUrl, setFileUrl] = useState("");
  const { modalToggle, setModalToggle } = toggle;
  const { modals } = useStyle();
  const { modalAnimation, modalWindowAnimation, modalTabAnimation } = modals;

  const processImage = (e) => {
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setFileUrl(imageUrl);
  };

  return (
    <div
      className={[modalToggle ? modalAnimation.showed : modalAnimation.base]}
    >
      <div
        className={[
          modalToggle ? modalWindowAnimation.showed : modalWindowAnimation.base,
        ]}
      >
        <div className="flex h-[98%] w-[80%] flex-col items-center">
          <div className="my-10 flex flex-col">
            <div className="mb-4">
              <p className="mb-2 border-b text-lg font-bold text-slate-700">
                本のタイトル
              </p>
              <input
                type="text"
                autoFocus
                placeholder="本のタイトルを入力"
                className="w-full rounded-md border p-2 outline-none"
              />
            </div>
            <div className="mb-4">
              <p className="mb-2 border-b text-lg font-bold text-slate-700">
                表紙
              </p>
              <label className="inline-block h-52 w-full bg-gray-100">
                <input
                  type="file"
                  onChange={(e) => processImage(e)}
                  className="hidden"
                />
                <img
                  src={fileUrl}
                  onError={(e) => (e.target.value = "OK")}
                  alt="表紙の画像"
                  className="h-full w-full object-cover"
                />
              </label>
            </div>
            <div>
              <p className="border-b text-lg font-bold text-slate-700">
                カテゴリー
              </p>
              <Tab hidden={"hidden"} animation={modalTabAnimation} />
            </div>
          </div>
        </div>
      </div>
      {/* 追加ボタン */}
      <button
        onClick={() => setModalToggle(false)}
        className="absolute bottom-10 rounded-md bg-green-600 px-3 py-2 font-bold text-white"
      >
        追加する
      </button>
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
