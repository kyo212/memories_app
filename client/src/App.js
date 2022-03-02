import { createContext, useState } from "react";
import { Router } from "./root/Router";

export const Context = createContext();

function App() {
  // コンテキストに渡すstate
  const [defaultIndex, setDefaultIndex] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");

  return (
    <div>
      <Context.Provider
        value={{
          defaultIndex,
          setDefaultIndex,
          fileUrl,
          setFileUrl,
          modalImageUrl,
          setModalImageUrl,
        }}
      >
        <Router />
      </Context.Provider>
    </div>
  );
}

export default App;
