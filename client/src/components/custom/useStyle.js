export const useStyle = () => {
  // Tab
  const tabs = {
    tabAnimation: {
      base: "rounded-full w-[60px] h-[60px] leading-[60px] border bg-white shadow-lg text-indigo-900 my-2",
      selected:
        "rounded-full w-[60px] h-[60px] leading-[60px] border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200 my-2",
    },
  };
  // Modal
  const modals = {
    modalTabAnimation: {
      base: "rounded-full w-16 h-10 leading-10 border bg-white shadow-md text-indigo-900 m-1",
      selected:
        "rounded-full w-16 h-10 leading-10 border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200 m-1",
    },
  };
  // menu-open
  const menuOpens = {
    menuOpenBtnAnimation: {
      base: "transform text-gray-500 mx-3 border border-gray-500 rounded-full p-2 transition-all",
      showed:
        "rotate-180 transform p-2 mx-3 bg-gray-500 text-white text-gray-500 border border-gray-500 rounded-full transition-all",
    },
    menuOpenAnimation: {
      base: "fixed top-14 right-6 w-60 rounded-md border bg-white px-3 text-sm text-slate-700 opacity-0 shadow-md",
      showed:
        "fixed top-14 right-6 w-60 rounded-md border bg-white py-4 px-3 text-sm text-slate-700 shadow-md",
    },
  };
  // search
  const searchOpen = {
    base: "w-0 transform rounded-sm py-1 opacity-0 outline-none transition-all text-gray-500",
    showed:
      "w-[116px] transform bg-gray-500 text-white rounded-full placeholder:text-white font-bold shadow-inline px-2 py-2 text-gray-500 opacity-100 outline-none transition-all text-[8px]",
  };

  const messageWindow = {
    errorMsg: {
      base: "translate-y-10 transform fixed bottom-10 opacity-0 transition-all",
      showed:
        "border-b border-red-800 fixed bottom-10 bg-red-600 bg-opacity-10 px-4 py-2 text-sm text-red-800 opacity-100 transition-all duration-500",
    },
    successMsg: {
      base: "w-64 translate-y-10 transform fixed top-10 left-1/2 -translate-x-1/2 opacity-0 transition-all",
      showed:
        "w-64 border-b border-green-800 fixed top-16 left-1/2 -translate-x-1/2 bg-green-600 bg-opacity-10 px-4 py-2 text-sm text-green-800 opacity-100 transition-all duration-500",
    },
    errorBorderMsg: {
      base: "w-full rounded border border-slate-400 px-4 py-2 outline-none",
      showed:
        "w-full rounded border border-slate-400 px-4 border border-red-400 placeholder:text-red-400 py-2 outline-none",
    },
  };

  const bookOpenAnimation = {
    base: "absolute top-0 right-0 h-1 w-1 transform transition-all duration-500",
    showed: "corner_box transform transition-all duration-500",
  };

  return {
    tabs,
    modals,
    menuOpens,
    searchOpen,
    messageWindow,
    bookOpenAnimation,
  };
};
