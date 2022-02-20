export const useStyle = () => {
  // Tab
  const tabs = {
    tabAnimation: {
      base: "rounded-full w-[76px] h-[76px] leading-[76px] border bg-white shadow-lg text-indigo-900 ",
      selected:
        "rounded-full w-[76px] h-[76px] leading-[76px] border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200",
    },
  };
  // Modal
  const modals = {
    modalTabAnimation: {
      base: "rounded-full w-16 h-10 leading-10 border bg-white shadow-lg text-indigo-900",
      selected:
        "rounded-full w-16 h-10 leading-10 border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200",
    },
    modalAnimation: {
      base: "fixed transform transition-all -translate-x-full  top-0 left-0 z-40 h-screen w-screen opacity-0 bg-black bg-opacity-80 flex items-center justify-center",
      showed:
        "fixed transform transition-all ease-in top-0 left-0 z-40 h-screen w-screen bg-black bg-opacity-80 flex items-center justify-center",
    },
    modalWindowAnimation: {
      base: "flex h-[70%] w-[65%] items-center opacity-0 justify-center rounded-md bg-white transform transition-all",
      showed:
        "flex h-[70%] w-[85%] items-center opacity-100 transform transition-all delay-100 duration-1000 justify-center rounded-md bg-white overflow-scroll",
    },
  };
  // menu-open
  const menuOpens = {
    menuOpenBtnAnimation: {
      base: "transform text-2xl text-slate-600 transition-all",
      showed: "rotate-180 transform text-2xl text-slate-600 transition-all",
    },
    menuOpenAnimation: {
      base: "fixed top-14 h-0 w-32 transform rounded-md border bg-white px-3 text-sm text-slate-700 opacity-0 shadow-md transition-all ease-in",
      showed:
        "fixed top-14 h-40 w-32 transform space-y-2 rounded-md border bg-white py-4 px-3 text-sm text-slate-700 shadow-md transition-all duration-500",
    },
  };
  return {
    tabs,
    modals,
    menuOpens,
  };
};
