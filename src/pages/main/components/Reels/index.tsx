import { InstagramIcon, MuteIcon, PauseIcon, PlayIcon, VolumeIcon } from "assets/images/icons";
import { useHooks } from "hooks";
import { useRef, useState } from "react";

const Reels = ({ videoSrc, videoPoster, isPlaying, onPlayToggle }: any) => {
  const { t } = useHooks();
  const [isMuted, setIsMuted] = useState(false);
  const reelRef = useRef<HTMLVideoElement>(null);

  const handleToggleMute = () => {
    const video = reelRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };

  const handlePlayToggle = () => {
    if (onPlayToggle) {
      onPlayToggle();
    }
  };

  return (
    <div className="video-player">
      <video
        onClick={handlePlayToggle}
        poster={videoPoster}
        className="custom-video"
        width="100%"
        ref={reelRef}
        autoPlay={isPlaying}
        muted={isMuted}
      >
        <source src={videoSrc} type="video/mp4" />
        {t("Your browser does not support the video tag")}.
      </video>
      <span>
        <InstagramIcon />
      </span>
      <div className="controls">
        <button className="play-button" onClick={handlePlayToggle}>
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </button>
        <button className="mute-button" onClick={handleToggleMute}>
          {isMuted ? <MuteIcon /> : <VolumeIcon />}
        </button>
      </div>
    </div>
  );
};

export default Reels;
