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
      base: "rounded-full w-[78px] h-10 leading-10 border bg-white shadow-md text-indigo-900 m-1",
      selected:
        "rounded-full w-[78px] h-10 leading-10 border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200 m-1",
    },
    modalConfirmAnimation: {
      base: "fixed top-0 left-0 -z-50 flex h-screen w-screen transform justify-center overflow-hidden opacity-0 transition-all duration-700",
      showed:
        "fixed top-0 left-0 z-50 flex h-screen w-screen transform justify-center overflow-hidden bg-white bg-opacity-80 transition-all duration-700",
    },
    filterMenuTabAnimation: {
      base: "w-[42px] h-8 leading-8 text-indigo-900 m-1 text-center",
      selected:
        "w-[42px] h-8 leading-8 transition-all transform font-bold text-center text-slate-600 bg-slate-200 m-1",
    },
  };
  // menu-open
  const menuOpens = {
    menuOpenBtnAnimation: {
      base: "transform text-gray-500 ml-2 border border-gray-400 bg-white rounded-full p-2 md:p-3 md:ml-3 transition-all",
      showed:
        "transform p-2 ml-2 bg-gray-500 text-white border rounded-full transition-all md:p-3",
    },
    menuOpenAnimation: {
      base: "fixed top-20 right-6 w-72 rounded-md border bg-white px-3 text-sm text-slate-700 opacity-0 shadow-md",
      showed:
        "fixed top-20 right-6 w-72 rounded-md border bg-white py-4 px-3 text-sm text-slate-700 shadow-md",
    },
  };
  // search
  const searchOpen = {
    base: "w-0 absolute top-12 -left-32 rounded-full px-2 py-2 opacity-0 text-gray-500 text-[12px] sm:top-0 sm:hidden",
    showed:
      "w-[200px] absolute top-12 -left-32 border border-gray-400 text-slate-500 rounded-full placeholder:text-slate-500 font-bold shadow-inline px-3 py-2 opacity-100 text-[12px] sm:static sm:ml-2 md:text-[14px] sm:px-4 md:w-[300px] sm:top-0",
  };

  const messageWindow = {
    errorMsg: {
      base: "w-[90%] translate-y-10 transform fixed top-16 opacity-0 transition-all ",
      showed:
        "w-[90%] border border-red-500 rounded-lg fixed top-16 bg-red-600 bg-red-100 px-4 py-2 text-sm text-red-800 opacity-100 transition-all duration-500",
    },
    successMsg: {
      base: "w-[90%] z-50 transform fixed -top-10 left-1/2 -translate-x-1/2 opacity-0 transition-all",
      showed:
        "w-[90%] z-50 border border-green-500 rounded-lg fixed top-14 left-1/2 -translate-x-1/2 bg-green-600 bg-green-100 px-4 py-2 text-sm text-green-800 opacity-100 transition-all duration-500",
    },
    errorBorderMsg: {
      base: "w-full rounded border border-slate-300 px-4 py-2 placeholder:text-sm",
      showed: "w-full rounded border px-4 border border-red-400 py-2",
    },
  };

  const bookOpenAnimation = {
    base: "absolute top-0 right-0 h-1 w-1 transform transition-all duration-500",
    showed:
      "absolute top-0 right-0 border-b-[255px] border-b-slate-200 shadow-md border-r-[190px] border-r-white transform transition-all duration-500",
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
