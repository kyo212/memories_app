
export const TabInform =({tabStyle})=>{

  return(
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
  )
}