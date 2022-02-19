import { memo, useState } from "react";
// カスタムフック
import { TabInform } from "./TabInform";

export const Tab = memo(({ animation, hidden }) => {
  const [tabStyle, setTabStyle] = useState(1);

  return (
    <>
      <ul className="my-10 flex flex-wrap items-center justify-center space-x-1 text-center">
        <li
          className={[tabStyle !== 1 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(1)}
        >
          <a href="#page1">家族</a>
        </li>
        <li
          className={[tabStyle !== 2 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(2)}
        >
          <a href="#page2">子供</a>
        </li>
        <li
          className={[tabStyle !== 3 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(3)}
        >
          <a href="#page2">ペット</a>
        </li>
        <li
          className={[tabStyle !== 4 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(4)}
        >
          <a href="#page3">趣味</a>
        </li>
        <li
          className={[tabStyle !== 5 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(5)}
        >
          <a href="#page4">友達</a>
        </li>
        <li
          className={[tabStyle !== 6 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(6)}
        >
          <a href="#page5">恋人</a>
        </li>
        <li
          className={[tabStyle !== 7 ? animation.base : animation.selected]}
          onClick={() => setTabStyle(7)}
        >
          <a href="#page5">旅行</a>
        </li>
      </ul>
      <div className={hidden}>
        <TabInform tabStyle={tabStyle} />
      </div>
    </>
  );
});
