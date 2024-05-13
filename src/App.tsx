
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import RoutesWrapper from "routes";
import useStore from "store";

import ScrollToHashElement from "components/scrollHashElement";
import { Loading } from "assets/images";
import "assets/styles/index.scss";

function App() {
  const { setLoadingStatus, system: { loadingStatus } } = useStore()

  loadingStatus
    ? (document.body.style.overflow = "auto")
    : (document.body.style.overflow = "hidden");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoadingStatus(true)
    }, 5000); // 5000 milliseconds = 5 seconds
    return () => {
      clearTimeout(timeout);
    };
  }, [setLoadingStatus]);

  return (
    <>
      <ScrollToHashElement />
      {!loadingStatus ? (
        <div className={`loader-video`}>
          <img className="intro-video" src={Loading} alt="Intro GIF" />
        </div>
      ) : (
        <></>
      )}
      <ToastContainer />
      <RoutesWrapper />
    </>
  );
}

export default App;
