import { createContext, useState } from "react";
import { Router } from "./root/Router";

export const TabContext = createContext();

function App() {
  // コンテキストに渡すstate
  const [defaultIndex, setDefaultIndex] = useState(false);

  return (
    <div>
      <TabContext.Provider value={{ defaultIndex, setDefaultIndex }}>
        <Router />
      </TabContext.Provider>
    </div>
  );
}

export default App;
