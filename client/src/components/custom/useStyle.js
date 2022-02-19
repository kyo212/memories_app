export const useStyle = () => {
  const tabAnimation = {
    base: "rounded-full w-[76px] h-[76px] leading-[76px] border bg-white shadow-lg text-indigo-900 ",
    selected:
      "rounded-full w-[76px] h-[76px] leading-[76px] border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200",
  };
  const modalAnimation = {
    base: "fixed transform transition-all -translate-x-full  top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-80 flex items-center justify-center",
    showed:
      "fixed transform transition-all ease-in top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-80 flex items-center justify-center",
  };
  return { tabAnimation, modalAnimation };
};
