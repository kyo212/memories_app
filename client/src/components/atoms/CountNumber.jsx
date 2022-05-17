import { memo } from "react";

export const CountNumber = memo(({ countNumber, max, formId }) => {
  const { id, num } = countNumber;
  return (
    <p className="absolute right-0 top-0 text-sm text-slate-500">
      {id === formId && `${num}/${max}`}
    </p>
  );
});
