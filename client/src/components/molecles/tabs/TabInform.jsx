export const TabInform = ({ category }) => {
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

  return (
    <>
      {tabList.map((tab, index) => {
        return (
          tab === category && (
            // tabとtabListIndex(選択中のtab)が一致しているものだけ表示させる
            <div
              key={index}
              className="mt-4 mb-32 h-[300px] w-full rounded-md bg-white opacity-90"
            >
              <>
                {category === "日記" ? (
                  <div className="bg-tab-my h-full w-full bg-cover">
                    <>日記</>
                  </div>
                ) : category === "家族" ? (
                  <>
                    <div className="bg-tab-family h-full w-full bg-cover" />
                    <p>家族で撮った集合写真や、何気なく撮った写真を残そう。</p>
                  </>
                ) : category === "子供" ? (
                  <>
                    <div className="bg-tab-child h-full w-full bg-cover" />
                    <p>子供の成長の過程や様子を記録しよう。</p>
                  </>
                ) : category === "ペット" ? (
                  <>
                    <div className="bg-tab-pet h-full w-full bg-cover" />
                    <p>
                      ペットの好きな場所、たべもの、遊び、すべてをここに記そう。
                    </p>
                  </>
                ) : category === "趣味" ? (
                  <>
                    <div className="" />
                    <p>
                      趣味も大切な日常の一部。カフェ巡りも、キャンプも、作品づくりもすべてここに記そう。
                    </p>
                  </>
                ) : category === "友達" ? (
                  <div className="bg-tab-friend h-full w-full bg-cover">
                    <>友達</>
                  </div>
                ) : category === "恋人" ? (
                  <div className="bg-tab-lover h-full w-full bg-cover">
                    <>恋人</>
                  </div>
                ) : category === "旅行" ? (
                  <div className="bg-tab-lover h-full w-full bg-cover">
                    <>旅行</>
                  </div>
                ) : (
                  <div className="bg-tab-travel h-full w-full bg-cover">
                    <>作品</>
                  </div>
                )}
              </>
            </div>
          )
        );
      })}
    </>
  );
};
