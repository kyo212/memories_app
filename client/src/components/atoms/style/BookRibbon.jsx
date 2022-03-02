import React from "react";

export const BookRibbon = ({ favorite }) => {
  return (
    <>
      <div
        className={[favorite ? "transform transition-all" : "opacity-0"]}
      >
        {/* リボン */}
        <span
          className={[
            favorite
              ? ` absolute left-5 top-2 h-2 w-8 -skew-x-[42deg] transform bg-red-600 transition-all duration-1000`
              : `h-0`,
          ]}
        />
        <span
          className={[
            favorite
              ? `absolute left-4 top-4 h-12 w-8 transform bg-red-500 transition-all delay-500 duration-[1000ms]`
              : `h-0`,
          ]}
        />
        <span className="absolute left-5 top-[52px] h-6 w-6 rotate-45 transform rounded-sm bg-white transition-all" />
      </div>
    </>
  );
};
