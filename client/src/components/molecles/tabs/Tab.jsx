import { memo, useState, useContext, useEffect } from "react";
// コンテキスト
import { Context } from "../../../App";

export const Tab = memo(({ animation, ulClass, setCategory }) => {
  // 情報
  const [tabListSelected, setTabListSelected] = useState("家族");
  const tabList = ["家族", "子供", "ペット", "趣味", "友達", "恋人", "旅行"];
  // コンテキスト
  const { defaultIndex, setDefaultIndex } = useContext(Context);

  useEffect(() => {
    defaultIndex && setTabListSelected(tabList[0]);
    // console.log(defaultIndex);
  }, [defaultIndex]);

  const tabCliced = (index) => {
    setTabListSelected(tabList[index]);
    setCategory(tabList[index]);
    setDefaultIndex(false);
  };

  return (
    <>
      <ul
        className={`${ulClass} flex flex-wrap items-center justify-center text-center `}
      >
        {tabList.map((tab, index) => (
          <li
            key={tab}
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
