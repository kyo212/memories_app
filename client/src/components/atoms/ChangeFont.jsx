import { memo, useState } from "react";

export const ChangeFont = memo(({ setFontChange }) => {
  const [fontChangeStyle, setFontChangeStyle] = useState(false);

  // 共通化
  const btnStyleShow = "w-1/2 px-2 py-1 font-bold bg-slate-100";
  const btnStyleNomal = "w-1/2 px-2 py-1";
  const SelectBorderStyle =
    "absolute bottom-0 inline-block w-1/2 transform border-b-2 border-slate-600 transition-transform";

  const fontChangeToggle = (e) => {
    if (e.target.id === "serif") {
      setFontChange("font-serif");
      setFontChangeStyle(!fontChangeStyle);
    } else {
      setFontChange("font-suns");
      setFontChangeStyle(!fontChangeStyle);
    }
  };

  return (
    <div className="flex w-44 transform justify-between border text-sm text-slate-800 transition-transform">
      <span
        className={[
          fontChangeStyle
            ? SelectBorderStyle
            : `${SelectBorderStyle} translate-x-full`,
        ]}
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
