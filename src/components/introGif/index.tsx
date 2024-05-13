import { Loading } from 'assets/images';  
import React, { useEffect, useState } from 'react';

const LoaderVideo = () => {
  const [videoEnded, setVideoEnded] = useState(false);
  videoEnded ? document.body.style.overflow = "auto" : document.body.style.overflow = "hidden"
  useEffect(() => {
    const timeout = setTimeout(() => {
      setVideoEnded(true);
    }, 5000); // 5000 milliseconds = 5 seconds
    return () => {
      clearTimeout(timeout);
    };
    
  }, []);

  return (
    <div className={`loader-video ${videoEnded === true ? 'close' : ''}`}>
        <img className='intro-video' src={Loading} alt="Intro GIF" />
    </div>
  );
};

export default LoaderVideo;
