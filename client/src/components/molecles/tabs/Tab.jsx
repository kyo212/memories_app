import { memo, useState, useContext, useEffect } from "react";
// コンテキスト
import { Context } from "../../../App";
import { ChangeJapanese } from "../../atoms/ChangeJapanese";

export const Tab = memo(({ animation, ulClass, setCategory }) => {
  // 情報
  const [tabListSelected, setTabListSelected] = useState("diary");
  const tabList = [
    "diary",
    "family",
    "child",
    "pet",
    "hoby",
    "friend",
    "lover",
    "travel",
    "portfolio",
  ];
  // コンテキスト
  const { defaultIndex, setDefaultIndex } = useContext(Context);

  useEffect(() => {
    // タブの初期アニメーションを"日記"にする
    defaultIndex && setTabListSelected(tabList[0]);
  }, [defaultIndex]);

  const tabClicked = (index) => {
    setTabListSelected(tabList[index]);
    setCategory(tabList[index]);
    setDefaultIndex(false);
  };

  return (
    <>
      <ul
        className={`${ulClass}`}
      >
        {tabList.map((tab, index) => (
          <li
            key={tab}
            className={[
              tabListSelected !== tabList[index]
                ? animation.base
                : animation.selected,
            ]}
            onClick={() => tabClicked(index)}
          >
            <button className="cursor-pointer">
              <ChangeJapanese category={tab} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
});
