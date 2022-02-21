export const BookRibbon = () => {
  return (
    <div className="">
      {/* リボン */}
      <span className="absolute left-10 -top-2 h-2 w-8 -skew-x-[42deg] transform bg-red-700"></span>
      <span className="absolute left-9 top-0 h-10 w-8 transform bg-red-600"></span>
      <span className="absolute left-10 top-7 h-6 w-6 rotate-45 transform bg-white"></span>
    </div>
  );
};
