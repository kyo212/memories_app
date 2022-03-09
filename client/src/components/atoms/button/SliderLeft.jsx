import { BsChevronLeft } from "react-icons/bs";

export const SliderLeft = ({ navigationPrevRef }) => {
  return (
    <>
      <button
        ref={navigationPrevRef}
        className="absolute top-1/2 left-0 z-50 flex h-10 w-10 items-center justify-center text-3xl text-gray-500"
      >
        <BsChevronLeft />
      </button>
    </>
  );
};
