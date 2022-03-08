import { createContext, useState } from "react";
import { Router } from "./root/Router";

export const Context = createContext();

function App() {
  // コンテキストに渡すstate
  const [defaultIndex, setDefaultIndex] = useState(false);
  const [imageFile, setImageFile] = useState("");
  const [videoFile, setVideoFile] = useState("");
  const [imageUrl, setImageUrl] = useState("");
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
          imageFile,
          setImageFile,
          videoFile,
          setVideoFile,
          imageUrl,
          setImageUrl,
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
