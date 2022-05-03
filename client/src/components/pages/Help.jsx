import { memo, useState } from "react";
// アイコン
import { BsChevronRight, BsArrow90DegUp } from "react-icons/bs";
// 画像
import helpImage1 from "../../images/help_image1.png";
import helpImage2 from "../../images/help_image2.png";

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

  const imageArry = [
    { src: helpImage1, text: "追加ボタンをタップ" },
    {
      src: helpImage2,
      text: "1:フォトブックの表紙になるタイトルを入力します。",
    },
  ];

  return (
    <>
      <div className="relative flex h-screen w-screen justify-center bg-white">
        {previewWindow && (
          <>
            <div
              onClick={() => setPreviewWindow(false)}
              className="absolute z-50 h-screen w-screen bg-black bg-opacity-80"
            />
            <img
              src={previewImageSrc}
              alt="プレビュー画像"
              className="absolute top-1/2 z-50 h-[80%] w-auto -translate-y-1/2 transform md:h-screen"
            />
          </>
        )}
        <div className="w-[90%] space-y-4 overflow-scroll bg-white leading-8 md:w-[80%]">
          <button
            onClick={toMybooks}
            className="mt-6 flex items-center rounded-md border bg-sky-600 px-2 font-bold text-white active:bg-sky-900"
          >
            <BsArrow90DegUp className="mr-2" />
            戻る
          </button>
          <h1 className="text-4xl font-bold">使い方ガイド</h1>
          <div className="py-6 px-4">
            <div className="flex space-x-2">
              <p className="flex h-8 w-8 items-center justify-center bg-slate-500 p-2 text-white">
                1
              </p>
              <h2 className="mb-2 text-2xl">フォトブックの追加</h2>
            </div>
            <p className="text-sm">※ 画像をクリックして拡大</p>
            <div className="mt-6 flex overflow-scroll border">
              {imageArry.map((image, index) => (
                <div key={image.src} className="flex">
                  <div className="border bg-slate-100 p-6">
                    <div className="flex w-56 items-center text-sm">
                      <p className="my-2 mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-400 p-3 text-white">
                        {index + 1}
                      </p>
                      <p>{image.text}</p>
                    </div>
                    <div onClick={() => imagePreview(image.src)}>
                      <img
                        src={image.src}
                        alt="追加の使い方ガイド"
                        className="w-56 cursor-pointer border border-slate-300"
                      />
                    </div>
                  </div>
                  <div className="flex h-full items-center px-4">
                    <BsChevronRight className="text-4xl text-slate-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
