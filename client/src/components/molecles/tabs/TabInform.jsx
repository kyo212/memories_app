export const TabInform = ({ category }) => {
  const tabList = ["自分","家族", "子供", "ペット", "趣味", "友達", "恋人", "旅行"];

  return (
    <div>
      {tabList.map((tab, index) => {
        return (
          tab === category && (
            // tabとtabListIndex(選択中のtab)が一致しているものだけ表示させる
            <div
              key={index}
              className="mt-4 h-[400px] w-full rounded-md border bg-white  shadow-md"
            >
              <p>{category}</p>
              <p></p>
            </div>
          )
        );
      })}
    </div>
  );
};
