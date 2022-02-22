export const TabInform = ({ tabListSelected, tabList }) => {
  return (
    <div>
      {tabList.map((tab, index) => {
        return (
          tab === tabListSelected && (
            // tabとtabListIndex(選択中のtab)が一致しているものだけ表示させる
            <div
              key={index}
              className="mt-4 h-[400px] w-full rounded-md border bg-white  shadow-md"
            >
              <p>{tabListSelected}</p>
              <p></p>
            </div>
          )
        );
      })}
    </div>
  );
};

// ) : tabListIndex === 2 ? (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>子供</p>
//     子供の成長を知るそう
//   </div>
// ) : tabListIndex === 3 ? (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>ペット</p>
//   </div>
// ) : tabListIndex === 4 ? (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>趣味</p>
//     趣味で作ったものをみんなに見せよう
//   </div>
// ) : tabListIndex === 5 ? (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>友達</p>
//   </div>
// ) : tabListIndex === 6 ? (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>恋人</p>
//     恋人との思い出を残そう
//   </div>
// ) : (
//   <div className="mt-4 h-96 w-full rounded-md border bg-white shadow-md">
//     <p>旅行</p>
//   </div>
// )}
