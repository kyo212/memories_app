import { memo } from "react";

export const confirmWindow = memo(({ message }) => {
  return (
    <>
      <div className="">
        <p>{message}</p>
      </div>
    </>
  );
});
