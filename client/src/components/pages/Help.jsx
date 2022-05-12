import { memo, useState } from "react";
// アイコン
import { BsChevronRight } from "react-icons/bs";
// 画像
import helpImage1 from "../../images/help_image1.png";
import helpImage2 from "../../images/help_image2.png";
import helpImage3 from "../../images/help_image3.png";

import { useLocation, useNavigate } from "react-router-dom";

export const Help = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();
  // Toggle
  const [previewWindow, setPreviewWindow] = useState(false);
  const [previewImageSrc, setPreviewImageSrc] = useState("");

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
      <div className="relative flex h-screen w-screen justify-center bg-white">
        {previewWindow && (
          <>
            <div
              onClick={() => setPreviewWindow(false)}
              className="fixed z-50 h-screen w-screen overflow-hidden bg-black bg-opacity-80"
            />
            <img
              src={previewImageSrc}
              alt="プレビュー画像"
              className="fixed top-1/2 z-50 h-[80%] w-auto -translate-y-1/2 transform md:h-screen"
            />
          </>
        )}
        <div className="w-[90%] space-y-4 bg-white pt-16 leading-8">
          <button
            onClick={toMybooks}
            className="fixed top-0 left-0 px-2 text-xl text-sky-600"
          >
            戻る
          </button>
          <h1 className="text-4xl font-bold">使い方ガイド</h1>
          <div className="py-6 px-4">
            <>
              <div className="border-b-2 pb-4">
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
                <ul className="flex overflow-scroll">
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
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
                    <div className="flex h-full items-center px-4">
                      <BsChevronRight className="text-4xl text-slate-400" />
                    </div>
                  </li>
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
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
                    <div className="flex h-full items-center px-4">
                      <BsChevronRight className="text-4xl text-slate-400" />
                    </div>
                  </li>
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
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
              <div className="border-b-2 pb-4">
                <div className="mt-20 flex space-x-2">
                  <p className="flex h-8 w-8 items-center justify-center bg-slate-500 p-2 text-white">
                    2
                  </p>
                  <h2 className="mb-2 text-2xl">フォトブックの使い方</h2>
                </div>
                <p className="text-sm">※ 画像をクリックして拡大</p>
              </div>
              <div className="mt-6 flex overflow-scroll">
                <ul className="flex">
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
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
                    <div className="flex h-full items-center px-4">
                      <BsChevronRight className="text-4xl text-slate-400" />
                    </div>
                  </li>
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        1
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
                    <div className="flex h-full items-center px-4">
                      <BsChevronRight className="text-4xl text-slate-400" />
                    </div>
                  </li>
                  <li className="flex">
                    <div className="relative flex flex-col items-center border bg-slate-100 p-8">
                      <p className="absolute top-0 left-2 my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        1
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
          </div>
        </div>
      </div>
    </>
  );
});
