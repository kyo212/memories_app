import { memo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// 画像
import { ImportImages } from "../ImportImages";

export const Help = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  // Toggle
  const [previewWindow, setPreviewWindow] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");
  // 画像
  const {
    helpImage1,
    helpImage2,
    helpImage3,
    helpImage4,
    helpImage5,
    helpImage6,
  } = ImportImages();

  const toMybooks = () => {
    if (location.state.root === "fromHome") {
      navigate("/");
    } else {
      navigate("/mybooks");
    }
  };

  const imagePreview = (src) => {
    setPreviewImageSrc(src);
    setPreviewWindow(true);
  };

  return (
    <>
      <div className="relative flex h-screen w-screen bg-white">
        {previewWindow && (
          <>
            <div
              onClick={() => setPreviewWindow(false)}
              className="fixed z-50 h-screen w-screen bg-black bg-opacity-80"
            />
            <img
              src={previewImageSrc}
              alt="プレビュー画像"
              className="fixed left-1/2 top-1/2  z-50 h-[80%] w-auto -translate-x-1/2 -translate-y-1/2 transform md:h-screen"
            />
          </>
        )}
        <div className="w-full space-y-4 bg-white leading-8">
          <button onClick={toMybooks} className="px-2 text-sky-600">
            戻る
          </button>
          <h1 className="ml-4 text-3xl font-bold">使い方ガイド</h1>
          <div className="py-6">
            <>
              <div className="ml-4 border-b-2 pb-4">
                <div className="flex space-x-2">
                  <p className="flex h-8 w-8 items-center justify-center bg-slate-500 p-2 text-white">
                    1
                  </p>
                  <h2 className="mb-2 text-2xl">フォトブックの追加</h2>
                </div>
                <p className="text-sm text-slate-600">
                  ※ 画像をクリックして拡大
                </p>
              </div>
              <div className="mt-6 flex">
                <ul className="flex snap-x snap-mandatory overflow-scroll">
                  <li className="flex snap-center justify-around">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        1
                      </p>
                      <div className="flex h-24 w-72 text-sm">
                        <p>
                          追加ボタンをタップして入力ウィンドウを表示させます。
                        </p>
                      </div>
                      <div onClick={() => imagePreview(helpImage1)}>
                        <img
                          src={helpImage1}
                          alt="追加の使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="flex snap-center">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        2
                      </p>
                      <div className="flex h-24 w-72 text-sm">
                        <ol className="ml-4 list-decimal">
                          <li>フォトブックのタイトルを入力。</li>
                          <li>任意の画像を写真フォルダから選択。</li>
                          <li>
                            カテゴリーを選択。
                            <br />※ デフォルトは「日記」カテゴリー
                          </li>
                        </ol>
                      </div>
                      <div onClick={() => imagePreview(helpImage2)}>
                        <img
                          src={helpImage2}
                          alt="追加の使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="flex snap-center">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        3
                      </p>
                      <div className="h-24 w-72 text-sm">
                        <ol className="ml-4 list-disc">
                          <li>
                            「フォトブックを追加する」ボタンをタップしてフォトブックを追加します。
                          </li>
                          <li>
                            閉じるボタンを押すことにより、入力のキャンセルが行われます。
                          </li>
                        </ol>
                      </div>
                      <div onClick={() => imagePreview(helpImage3)}>
                        <img
                          src={helpImage3}
                          alt="追加の使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </>
            <>
              <div className="ml-4 border-b-2 pb-4">
                <div className="mt-20 flex space-x-2">
                  <p className="flex h-8 w-8 items-center justify-center bg-slate-500 p-2 text-white">
                    2
                  </p>
                  <h2 className="mb-2 text-2xl">フォトブックの使い方</h2>
                </div>
                <p className="text-sm">※ 画像をクリックして拡大</p>
              </div>
              <div className="mt-6 flex">
                <ul className="flex snap-x snap-mandatory overflow-scroll">
                  <li className="flex snap-center justify-around">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        1
                      </p>
                      <div className="flex h-24 w-72 text-sm">
                        <p>
                          横スクロールまたは矢印のタップで次のフォトブックへ移動することができます。
                        </p>
                      </div>
                      <div onClick={() => imagePreview(helpImage5)}>
                        <img
                          src={helpImage5}
                          alt="フォトブックの使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="flex snap-center">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        2
                      </p>
                      <div className="flex h-24 w-72 text-sm">
                        <p>
                          フォトブックの表紙には追加時に選択したカテゴリーと作成日が表示されます。また、矢印をタップすることにより、メニューを開くことができます。
                        </p>
                      </div>
                      <div onClick={() => imagePreview(helpImage4)}>
                        <img
                          src={helpImage4}
                          alt="フォトブックの使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                  <li className="flex snap-center">
                    <div className="relative mx-2 flex w-full flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        3
                      </p>
                      <div className="h-24 w-72 text-sm">
                        <p>
                          開く・お気に入り・共有・削除の4つのメニューが選択できます。
                        </p>
                      </div>
                      <div onClick={() => imagePreview(helpImage6)}>
                        <img
                          src={helpImage6}
                          alt="フォトブックの使い方ガイド"
                          className="w-72 cursor-pointer border border-slate-300"
                        />
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </>
          </div>
        </div>
      </div>
    </>
  );
});
