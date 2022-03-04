import { CgSpinner } from "react-icons/cg";

export const Loading = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <span className="animate-spin text-4xl text-gray-500">
        <CgSpinner />
      </span>
    </div>
  );
};
