import { memo, useState } from "react";
// カスタムフック
import { useStyle } from "../../custom/useStyle";

export const Tab = memo(() => {
  const [tabStyle, setTabStyle] = useState(1);
  const { tabAnimation } = useStyle();

  return (
    <>
      <ul className="my-10 flex flex-wrap items-center justify-center space-x-1 text-center">
        <li
          className={[
            tabStyle !== 1 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(1)}
        >
          <a href="#page1">家族</a>
        </li>
        <li
          className={[
            tabStyle !== 2 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(2)}
        >
          <a href="#page2">子供</a>
        </li>
        <li
          className={[
            tabStyle !== 3 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(3)}
        >
          <a href="#page2">ペット</a>
        </li>
        <li
          className={[
            tabStyle !== 4 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(4)}
        >
          <a href="#page3">趣味</a>
        </li>
        <li
          className={[
            tabStyle !== 5 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(5)}
        >
          <a href="#page4">友達</a>
        </li>
        <li
          className={[
            tabStyle !== 6 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(6)}
        >
          <a href="#page5">恋人</a>
        </li>
        <li
          className={[
            tabStyle !== 7 ? tabAnimation.base : tabAnimation.selected,
          ]}
          onClick={() => setTabStyle(7)}
        >
          <a href="#page5">旅行</a>
        </li>
      </ul>

      <div>
        {tabStyle === 1 ? (
          <div className="mt-4 h-[400px] w-full rounded-md border bg-white  shadow-md">
            <div className="bg-tab-image-fam h-[200px] w-full bg-cover"></div>
            <p>家族</p>
            <p></p>
          </div>
        ) : tabStyle === 2 ? (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>子供</p>
          </div>
        ) : tabStyle === 3 ? (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>ペット</p>
          </div>
        ) : tabStyle === 4 ? (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>趣味</p>
          </div>
        ) : tabStyle === 5 ? (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>友達</p>
          </div>
        ) : tabStyle === 6 ? (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>恋人</p>
          </div>
        ) : (
          <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
            <p>旅行</p>
          </div>
        )}
      </div>
    </>
  );
});
