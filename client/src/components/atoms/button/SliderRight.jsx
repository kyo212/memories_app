import { BsChevronRight } from "react-icons/bs";

export const SliderRight = ({ navigationNextRef, length }) => {
  return (
    <button
      ref={navigationNextRef}
      className={["absolute bottom-4 right-[15%] z-50 flex h-10 w-10 items-center justify-center text-3xl text-gray-500"]}
    >
      <BsChevronRight />
    </button>
  );
};
