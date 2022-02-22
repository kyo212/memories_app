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
      // 黒背景
      base: "fixed transform transition-all -translate-y-full duration-300 top-0 left-0 z-40 h-screen w-screen opacity-0 bg-black bg-opacity-80 flex items-center justify-center",
      showed:
        "fixed transform transition-all ease-in top-0 left-0 z-40 duration-300 h-screen w-screen bg-black bg-opacity-80 flex items-center justify-center",
    },
    modalWindowAnimation: {
      // 白背景
      base: "flex h-[70%] w-[95%] items-center opacity-0 justify-center rounded-sm bg-white transform transition-all",
      showed:
        "flex h-[80%] w-[95%] items-center opacity-100 transform transition-all delay-100 duration-1000 justify-center rounded-sm bg-white overflow-scroll",
    },
  };
  // menu-open
  const menuOpens = {
    menuOpenBtnAnimation: {
      base: "transform text-2xl text-slate-600 transition-all",
      showed: "rotate-180 transform text-2xl text-slate-600 transition-all",
    },
    menuOpenAnimation: {
      base: "fixed top-14 right-6 h-0 w-44 transform rounded-md border bg-white px-3 text-sm text-slate-700 opacity-0 shadow-md transition-all ease-in",
      showed:
        "fixed top-14 right-6 h-40 w-52 transform space-y-2 rounded-md border bg-white py-4 px-3 text-sm text-slate-700 shadow-md transition-all duration-500",
    },
  };
  // search
  const searchOpen = {
    base: "w-0 transform rounded-sm py-1 opacity-0 outline-none transition-all",
    showed:
      "w-[116px] transform rounded-sm bg-slate-100 px-2 py-1 opacity-100 outline-none transition-all",
  };

  const messageWindow = {
    errorMsg: {
      base: "translate-y-10 transform fixed bottom-10 opacity-0 transition-all",
      showed:
        "border-b border-red-800 fixed bottom-10 bg-red-600 bg-opacity-10 px-4 py-2 text-sm text-red-800 opacity-100 transition-all duration-500",
    },
    successMsg: {
      base: "translate-y-10 transform fixed bottom-10 opacity-0 transition-all",
      showed:
        "border-b border-green-800 fixed bottom-10 bg-green-600 bg-opacity-10 px-4 py-2 text-sm text-green-800 opacity-100 transition-all duration-500",
    },
    errorBorderMsg: {
      base: "w-full rounded border border-slate-400 px-4 py-2 outline-none",
      showed:
        "w-full rounded border border-slate-400 px-4 border border-red-400 placeholder:text-red-400 py-2 outline-none",
    },
  };

  return {
    tabs,
    modals,
    menuOpens,
    searchOpen,
    messageWindow,
  };
};
