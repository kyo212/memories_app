export const ChangeJapanese = ({ category }) => {
  return (
    <>
      {category === "diary" ? (
        "日記"
      ) : category === "family" ? (
        "家族"
      ) : category === "child" ? (
        "子供"
      ) : category === "pet" ? (
        "ペット"
      ) : category === "hoby" ? (
        "趣味"
      ) : category === "friend" ? (
        "友達"
      ) : category === "lover" ? (
        "恋人"
      ) : category === "travel" ? (
        "旅行"
      ) : category === "portfolio" ? (
        "作品"
      ) : (
        <></>
      )}
    </>
  );
};
