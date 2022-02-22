import { useCallback, useState } from "react";

// 再レンダリングさせるフック
export const useForceUpdate = () => {
  const [update, setUpdate] = useState(false);
  useCallback(() => {
    // useCallback - 関数に特化した最適化関数。
    setUpdate(update ? false : true);
  }, []);
  return [
    update,
    {
      setUpdate,
    },
  ];
};
