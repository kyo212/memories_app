import { memo, useState, useContext, useEffect } from "react";
// コンテキスト
import { Context } from "../../../App";

export const Tab = memo(({ animation, ulClass, setCategory }) => {
  // 情報
  const [tabListSelected, setTabListSelected] = useState("日記");
  const tabList = [
    "日記",
    "家族",
    "子供",
    "ペット",
    "趣味",
    "友達",
    "恋人",
    "旅行",
    "作品",
  ];
  // コンテキスト
  const { defaultIndex, setDefaultIndex } = useContext(Context);

  useEffect(() => {
    // タブの初期アニメーションを"日記"にする
    defaultIndex && setTabListSelected(tabList[0]);
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
            <button className="cursor-pointer">{tab}</button>
          </li>
        ))}
      </ul>
    </>
  );
});
