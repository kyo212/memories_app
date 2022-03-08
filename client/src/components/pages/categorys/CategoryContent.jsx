import { memo } from "react";
// コンポーネント
import { ChangeJapanese } from "../../atoms/ChangeJapanese";

export const CategoryContent = memo(({ category }) => {
  return (
    // カテゴリー専用のインプット要素 
    <>
      <div className="mt-4 text-sm">
        {category === "diary" ? (
          <div className="">
            <p className="text-sm">
              <ChangeJapanese category={category} />
            </p>
          </div>
        ) : category === "family" ? (
          <div className="">
            家族構成
            <select name="" id="">
              <option value="aaa">母親</option>
              <option value="">1人</option>
              <option value="">2人</option>
            </select>
            <select name="" id="">
              <option value="aaa">父親</option>
              <option value="">1人</option>
              <option value="">2人</option>
            </select>
            <select name="" id="">
              <option value="aaa">子供</option>
              <option value="">1人</option>
            </select>
          </div>
        ) : category === "child" ? (
          <div>
            <div className="flex flex-col justify-center">
              <span className="font-bold">生まれた時間</span>
              {true ? (
                <>
                  <div className="flex space-x-2">
                    <input type="date" className="w-40 border py-2 pl-2" />
                    <input
                      type="number"
                      placeholder="例 1230 (12時30分)"
                      className="w-40 border py-2 pl-2"
                    />
                  </div>
                </>
              ) : (
                <>生まれた時間 誕生日 年齢 (誕生日と現在の年齢を自動算出)</>
              )}
            </div>
            <div className="mt-4 flex w-40 flex-col justify-center">
              <span className="font-bold">生まれたときのグラム</span>
              {true ? (
                <input
                  type="number"
                  placeholder="例 2000"
                  className="border py-2 pl-2"
                />
              ) : (
                <>グラム</>
              )}
            </div>
          </div>
        ) : category === "pet" ? (
          <div className="">
            <>ペット専用</>
          </div>
        ) : category === "hoby" ? (
          <div className="">
            <>趣味専用</>
          </div>
        ) : category === "friend" ? (
          <div className="">
            <>友達専用</>
          </div>
        ) : category === "lover" ? (
          <div className="">
            <>恋人専用</>
          </div>
        ) : category === "travel" ? (
          <div className="">
            <>旅行専用</>
          </div>
        ) : (
          category === "portfolio" && (
            <div className="">
              <>作品専用</>
            </div>
          )
        )}
      </div>
    </>
  );
});
