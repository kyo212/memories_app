import React from "react";

export const BookRibbon = ({ favorite }) => {
  return (
    <>
      <div
        className={[
          favorite
            ? "transform cursor-pointer transition-all "
            : "cursor-pointer opacity-0",
        ]}
      >
        {/* リボン */}
        <span
          className={[
            favorite
              ? `absolute left-5 top-2 h-2 w-8 -skew-x-[42deg] transform bg-red-600 transition-all duration-300`
              : `opacity-0`,
          ]}
        />
        <span
          className={[
            favorite
              ? `absolute left-4 top-4 h-12 w-8 transform bg-red-500 transition-all delay-100`
              : `opacity-0`,
          ]}
        />
        <span
          className={[
            favorite
              ? `absolute left-5 top-[52px] h-6 w-6 rotate-45 transform rounded-sm border-t border-l border-slate-600 bg-white transition-all`
              : `opacity-0`,
          ]}
        />
      </div>
    </>
  );
};
