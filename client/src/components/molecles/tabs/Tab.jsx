import { memo, useState } from "react";
// カスタムフック
import { TabInform } from "./TabInform";

export const Tab = memo(({ animation, hidden }) => {
  const [tabListIndex, setTabListIndex] = useState("家族");
  const tabList = ["家族", "子供", "ペット", "趣味", "友達", "恋人", "旅行"];

  return (
    <>
      <ul className="my-10 flex flex-wrap items-center justify-center space-x-1 text-center">
        {tabList.map((tab, index) => (
          <li
            key={index}
            className={[
              tabListIndex !== tabList[index]
                ? animation.base
                : animation.selected,
            ]}
            onClick={() => setTabListIndex(tabList[index])}
          >
            <a href="#a">{tab}</a>
          </li>
        ))}
      </ul>
      <div className={hidden}>
        <TabInform tabListIndex={tabListIndex} tabList={tabList} />
      </div>
    </>
  );
});
