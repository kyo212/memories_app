export const useStyle = () => {
  // Tab
  const tabs = {
    tabAnimation: {
      base: "rounded-full w-[72px] h-[72px] leading-[72px] border bg-white shadow-lg text-indigo-900 my-2",
      selected:
        "rounded-full w-[72px] h-[72px] leading-[72px] border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200 my-2",
    },
  };
  // Modal
  const modals = {
    modalTabAnimation: {
      base: "rounded-full w-16 h-10 leading-10 border bg-white shadow-md text-indigo-900 m-1",
      selected:
        "rounded-full w-16 h-10 leading-10 border bg-white shadow-inner translate-y-1 transition-all transform font-bold text-slate-600 bg-slate-200 m-1",
    },
    modalAnimation: {
      // 黒背景
      base: "fixed transform transition-all -translate-y-full duration-300 top-0 left-0 z-40 h-screen w-screen opacity-0 bg-black bg-opacity-80 flex  justify-center",
      showed:
        "fixed transform transition-all ease-in top-0 left-0 z-40 duration-300 h-screen w-screen bg-black items-center bg-opacity-80 flex justify-center",
    },
    modalWindowAnimation: {
      // 白背景
      base: "flex h-[50%] w-[95%] items-center -translate-y-full opacity-0 justify-center rounded-sm bg-white transform transition-all",
      showed:
        "flex h-[50%] w-[95%] items-center opacity-100 transform transition-all duration-1000 justify-center rounded-sm bg-white overflow-scroll",
    },
  };
  // menu-open
  const menuOpens = {
    menuOpenBtnAnimation: {
      base: "transform text-white bg-gray-500 rounded-full p-2 transition-all",
      showed:
        "rotate-180 transform p-2 text-white bg-gray-500 rounded-full transition-all",
    },
    menuOpenAnimation: {
      base: "fixed top-14 right-6 h-0 w-60 transform rounded-md border bg-white px-3 text-sm text-slate-700 opacity-0 shadow-md transition-all ease-in -translate-y-64",
      showed:
        "fixed top-14 right-6 h-603 w-60 transform space-y-2 rounded-md border bg-white py-4 px-3 text-sm text-slate-700 shadow-md transition-all duration-500",
    },
  };
  // search
  const searchOpen = {
    base: "w-0 transform rounded-sm py-1 opacity-0 outline-none transition-all",
    showed:
      "w-[116px] transform rounded-full placeholder:text-white shadow-inline px-2 py-2 bg-gray-500 opacity-100 outline-none transition-all text-[8px]",
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

  return {
    tabs,
    modals,
    menuOpens,
    searchOpen,
    messageWindow,
  };
};
