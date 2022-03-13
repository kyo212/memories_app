import { memo, useState } from "react";

export const ChangeFont = memo(({ setFontChange }) => {
  const [fontChangeStyle, setFontChangeStyle] = useState(false);

  // 共通化
  const btnStyleShow = "w-1/2 px-2 py-1 font-bold text-sky-700";
  const btnStyleNomal = "w-1/2 px-2 py-1";
  const SelectBorderStyle =
    "absolute bottom-0 inline-block w-1/2 transform border-b-2 border-slate-600 transition-transform duration-100 ease-in";

  const fontChangeToggle = (e) => {
    if (e.target.id === "serif") {
      setFontChange("font-serif");
      setFontChangeStyle(true);
    } else {
      setFontChange("font-suns");
      setFontChangeStyle(false);
    }
  };

  return (
    <div className="flex w-44 transform justify-between text-sm text-slate-800 transition-transform">
      <span
        className={`${[
          !fontChangeStyle && "translate-x-full",
        ]} ${SelectBorderStyle}`}
      />
      <button
        id="serif"
        onClick={fontChangeToggle}
        className={[fontChangeStyle ? btnStyleShow : btnStyleNomal]}
      >
        おしゃれ
      </button>
      <button
        id="nomal"
        onClick={fontChangeToggle}
        className={[!fontChangeStyle ? btnStyleShow : btnStyleNomal]}
      >
        ふつう
      </button>
    </div>
  );
});
