import { createContext, useState } from "react";
import { Router } from "./root/Router";

export const Context = createContext();

function App() {
  // コンテキストに渡すstate
  const [defaultIndex, setDefaultIndex] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [headerToggle, setHeaderToggle] = useState(false);

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
          searchToggle,
          setSearchToggle,
          modalToggle,
          setModalToggle,
          headerToggle,
          setHeaderToggle,
        }}
      >
        <Router />
      </Context.Provider>
    </div>
  );
}

export default App;
