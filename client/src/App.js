import { createContext, useState } from "react";
import { Router } from "./root/Router";

export const Context = createContext();

function App() {
  // コンテキストに渡すstate
  const [defaultIndex, setDefaultIndex] = useState(false);
  const [imageFileUrl, setImageFileUrl] = useState("");
  const [videoFileUrl, setVideoFileUrl] = useState("");
  const [modalImageUrl, setModalImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [searchToggle, setSearchToggle] = useState(false);
  const [modalToggle, setModalToggle] = useState(false);
  const [headerToggle, setHeaderToggle] = useState(false);

  return (
    <>
      <Context.Provider
        value={{
          defaultIndex,
          setDefaultIndex,
          imageFileUrl,
          setImageFileUrl,
          videoFileUrl,
          setVideoFileUrl,
          modalImageUrl,
          setModalImageUrl,
          videoUrl,
          setVideoUrl,
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
    </>
  );
}

export default App;
