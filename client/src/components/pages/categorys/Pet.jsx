import { memo } from "react";
import { useLocation } from "react-router-dom";

export const Pet = memo(() => {
  const location = useLocation();
  console.log(location.state.id);
  console.log(location.state.title);
  console.log(location.state.username);
  return (
    <>
      <>Pet</>
      <p>{location.state.id}</p>
      <p>{location.state.title}</p>
      <p>{location.state.username}</p>
    </>
  );
});
