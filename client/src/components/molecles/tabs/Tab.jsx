import { memo, useState } from "react";
// カスタムフック

export const Tab = memo(({ animation, ulClass, setCategory }) => {
  const [tabListSelected, setTabListSelected] = useState("家族");
  const tabList = ["家族", "子供", "ペット", "趣味", "友達", "恋人", "旅行"];

  const tabCliced = (index) => {
    setTabListSelected(tabList[index]);
    setCategory(tabList[index]);
  };

  return (
    <>
      <ul
        className={`${ulClass} flex flex-wrap items-center justify-center text-center `}
      >
        {tabList.map((tab, index) => (
          <li
            key={index}
            className={[
              tabListSelected !== tabList[index]
                ? animation.base
                : animation.selected,
            ]}
            onClick={() => tabCliced(index)}
          >
            <button>{tab}</button>
          </li>
        ))}
      </ul>
    </>
  );
});
