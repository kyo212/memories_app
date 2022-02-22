import { memo, useState } from "react";
// カスタムフック
import { TabInform } from "./TabInform";

export const Tab = memo(({ animation, hidden, ulClass, setCategory }) => {
  const [tabListSelected, setTabListSelected] = useState("家族");
  const tabList = ["家族", "子供", "ペット", "趣味", "友達", "恋人", "旅行"];

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
            onClick={() => {
              setTabListSelected(tabList[index]);
              setCategory(tabList[index]);
            }}
          >
            <a href="#a">{tab}</a>
          </li>
        ))}
      </ul>
      <div className={hidden}>
        <TabInform tabListSelected={tabListSelected} tabList={tabList} />
      </div>
    </>
  );
});
