import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { uniqueId } from "lodash";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGet, useHooks } from "hooks";
import ProductsSwiper from "./components/ProductsSwiper";
import CommentSection from "./components/commentSection";
import Reels from "./components/Reels";

import {
  BackIcon,
  CloseIcon,
  DropIcon,
  EnergyIcon,
  FlameIcon,
  MuteIcon,
  PauseIcon,
  PlanetIcon,
  PlayIcon,
  QualityIcon,
  VerifyIcon,
  VolumeIcon,
} from "assets/images/icons";
import {
  FirstSec1Laptop,
  FirstSec1Mobile,
  FirstSec1Tablet,
  HeroIMGLaptop,
  HomeIMG1Laptop,
  HomeIMG1Mobile,
  HomeIMG1Tablet,
  HomeIMG2Laptop,
  HomeIMG2Mobile,
  HomeIMG2Tablet,
  mapUzbEn,
  mapUzbRu,
  mapUzbUz,
  mapWorldEn,
  mapWorldRu,
  mapWorldUz,
  videoMain,
} from "assets/images";

import "assets/styles/_home.scss";
import NumberCounter from "./components/CountUp";
import useStore from "store";
import { storage } from "services";
import PartnersSection from "components/partners";
import ThreeBlogs from "components/threenews";

const Main = () => {
  const { t, get } = useHooks();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoOpen, setVideoOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const [showPlayer, setShowPlayer] = useState(window.innerWidth > 600);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const thirdSectionRef = useRef<HTMLDivElement>(null);
  gsap.registerPlugin(ScrollTrigger);
  const {
    system: { loadingStatus },
  } = useStore();
  const videoResRef = useRef<HTMLVideoElement>(null);
  const gif1Ref = useRef<HTMLVideoElement | null>(null);
  const gif2Ref = useRef<HTMLVideoElement | null>(null);
  const gif3Ref = useRef<HTMLVideoElement | null>(null);


  useEffect(() => {
    const gif1Element = gif1Ref.current;
    const gif2Element = gif2Ref.current;
    const gif3Element = gif3Ref.current;
  
    if (gif1Element && gif2Element && gif3Element) {
      gif1Element.controls = false;
      gif2Element.controls = false;
      gif3Element.controls = false;
  
      gif1Element.addEventListener('play', () => {
        gif1Element.controls = false;
      });
  
      gif1Element.addEventListener('pause', () => {
        gif1Element.controls = false;
      });
  
      gif2Element.addEventListener('play', () => {
        gif2Element.controls = false;
      });
  
      gif2Element.addEventListener('pause', () => {
        gif2Element.controls = false;
      });
      gif3Element.addEventListener('play', () => {
        gif2Element.controls = false;
      });
  
      gif3Element.addEventListener('pause', () => {
        gif2Element.controls = false;
      });
    }
  
    return () => {
      if (gif1Element && gif2Element && gif3Element) {
        gif1Element.removeEventListener('play', () => {
          gif1Element.controls = false;
        });
  
        gif1Element.removeEventListener('pause', () => {
          gif1Element.controls = false;
        });
  
        gif2Element.removeEventListener('play', () => {
          gif2Element.controls = false;
        });
  
        gif2Element.removeEventListener('pause', () => {
          gif2Element.controls = false;
        });
        gif3Element.removeEventListener('play', () => {
          gif2Element.controls = false;
        });
  
        gif3Element.removeEventListener('pause', () => {
          gif2Element.controls = false;
        });
      }
    };
  }, []);

  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      videoElement.controls = false;

      videoElement.addEventListener("play", () => {
        videoElement.controls = false;
      });

      videoElement.addEventListener("pause", () => {
        videoElement.controls = false;
      });
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("play", () => {
          videoElement.controls = false;
        });

        videoElement.removeEventListener("pause", () => {
          videoElement.controls = false;
        });
      }
    };
  }, []);
  useEffect(() => {
    const handleFullScreenChange = () => {
      if (!document.fullscreenElement) {
        if (videoResRef.current && !videoResRef.current.paused) {
          videoResRef.current.pause();
        }
      }
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("msfullscreenchange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange
      );
      document.removeEventListener(
        "msfullscreenchange",
        handleFullScreenChange
      );
    };
  }, []);

  const openFullscreen = () => {
    if (videoResRef.current) {
      const element = videoResRef.current as HTMLVideoElement & {
        requestFullscreen?(): Promise<void>;
        webkitRequestFullscreen?(): Promise<void>;
        msRequestFullscreen?(): Promise<void>;
      };

      if (element.requestFullscreen) {
        element.requestFullscreen().then(() => element.play());
      } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen().then(() => element.play());
      } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen().then(() => element.play());
      }
    }
  };
  useEffect(() => {
    const handleScroll = () => {
      const top = thirdSectionRef.current?.getBoundingClientRect()?.top ?? 0;
      const screenHeight = window.innerHeight;
      if (top < screenHeight * 0.9) {
        setTriggerAnimation(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  let mm = gsap.matchMedia();

  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".home_page_first-section", { scale: 0, duration: 1 });
        gsap.from(".first-section_img", { y: 400, duration: 1, delay: 0.1 });
        gsap.from(".first-section_right", { x: 400, duration: 1 });
        gsap.from(".home_page_second-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home-page",
            start: "15% 70%",
          },
        });
        gsap.from(".second-section_text", {
          opacity: 0,
          duration: 1,
          delay: 0.1,
          scrollTrigger: {
            trigger: ".home-page",
            start: "15% 70%",
          },
        });
        gsap.from(".home-img1", {
          opacity: 0,
          y: 400,
          duration: 1,
          delay: 0.1,
          scrollTrigger: {
            trigger: ".home-page",
            start: "15% 70%",
          },
        });
        gsap.from(".home-img2", {
          opacity: 0,
          y: 400,
          duration: 1,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".home-page",
            start: "15% 70%",
          },
        });
        gsap.from(".home-img3", {
          opacity: 0,
          y: 400,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".home-page",
            start: "15% 70%",
          },
        });
        gsap.from(".home_page_third-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: ".home-page",
            start: "25% 70%",
          },
        });
        gsap.from(".home_page_fifth-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home-page",
            start: "65% 70%",
          },
        });
        gsap.from(".home_page_sixth-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page",
            start: "70% 70%",
          },
        });
        gsap.from(".home_page_seventh-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page",
            start: "77% 70%",
          },
        });
        gsap.from(".home_page_eighth-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page",
            start: "80% 70%",
          },
        });
        gsap.from(".home_page_ninth-section", {
          opacity: 0,
          y: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page",
            start: "90% 70%",
          },
        });
        gsap.from("#first_card", {
          opacity: 0,
          x: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "70% 20%",
          },
        });

        gsap.from("#fourth_card", {
          opacity: 0,
          x: -400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "80% 20%",
          },
        });
        gsap.from("#second_card", {
          opacity: 0,
          x: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "85% 20%",
          },
        });
        gsap.from("#fifth_card", {
          opacity: 0,
          x: -400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "90% 20%",
          },
        });
        gsap.from("#third_card", {
          opacity: 0,
          x: 400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "100% 30%",
          },
        });
        gsap.from("#sixth_card", {
          opacity: 0,
          x: -400,
          duration: 1,
          scrollTrigger: {
            trigger: ".home_page_third-section",
            start: "100% 5%",
          },
        });
        gsap.utils.toArray(".client").forEach((section, index) => {
          gsap.from(section as gsap.DOMTarget, {
            opacity: 0,
            scale: 0,
            delay: 0.2,
            duration: 1,
            scrollTrigger: {
              trigger: section as gsap.DOMTarget,
              start: "50% 50%",
              toggleActions: "play none none none",
            },
          });
        });
      });
    }
  }, [loadingStatus]);

  const { isLoading, data } = useGet({
    name: "partners",
    url: "partners",
    params: {
      limit: 90,
    },
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const partnersData = get(data, "data", []);

  const { data: rData } = useGet({
    name: "videos",
    url: "videos",
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const reelsData = get(rData, "data", []);

  const handleTimelineClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = timelineRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const percentage = offsetX / rect.width;
    const newTime = percentage * duration;
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isScrubbing && videoRef.current) {
        const rect = timelineRef.current?.getBoundingClientRect();
        if (rect) {
          const offsetX = e.clientX - rect.left;
          const percentage = offsetX / rect.width;
          const newTime = percentage * duration;
          videoRef.current.currentTime = newTime;
          setCurrentTime(newTime);
        }
      }
    };

    const handleMouseUp = () => {
      setIsScrubbing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [duration, isScrubbing]);
  let lang = storage.get("i18nextLng");
  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", updateTime);
    video.addEventListener("loadedmetadata", updateTime);

    return () => {
      video.removeEventListener("timeupdate", updateTime);
      video.removeEventListener("loadedmetadata", updateTime);
    };
  }, []);
  const handleToggleMute = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = !video.muted;
      setIsMuted(video.muted);
    }
  };
  const handlePlay = () => {
    const video = videoRef.current;
    if (video && !video.paused) {
      video.pause();
    } else if (video) {
      video.play();
    }
    setIsPlay(!isPlay);
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
    }
    setIsPlay(false);
  };
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
    }
  };
  const OpenVideo = () => {
    setVideoOpen(!videoOpen);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const handleResize = () => {
      setShowPlayer(window.innerWidth > 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [currentPlayingIndex, setCurrentPlayingIndex] = useState<number | null>(
    null
  );

  const handlePlayToggle = (index: number) => {
    if (index === currentPlayingIndex) {
      setCurrentPlayingIndex(null); // Stop current reel if clicked again
    } else {
      setCurrentPlayingIndex(index); // Play the clicked reel
    }
  };

  return (
    <div className="home-page">
      {!showPlayer && (
        <video className="mobile_video" ref={videoResRef} width="100%" controls>
          <source
            src="https://api.gapyoq.com.uz/video/video.mp4"
            type="video/mp4"
          />
          {t("Your browser does not support the video tag") + "."}
        </video>
      )}
      {showPlayer && (
        <div className={`main_player ${videoOpen ? "video-opened" : ""}`}>
          <video
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleTimeUpdate}
            className="custom-video"
            width="100%"
            ref={videoRef}
          >
            <source
              src="https://api.gapyoq.com.uz/video/video.mp4"
              type="video/mp4"
            />
            {t("Your browser does not support the video tag") + "."}
          </video>
          <button
            className="close_video"
            onClick={() => {
              handlePause();
              OpenVideo();
            }}
          >
            <CloseIcon />
          </button>
          <div className="main_video_controls">
            <button className="play-button" onClick={handlePlay}>
              {isPlay ? <PauseIcon /> : <PlayIcon />}
            </button>
            <div
              ref={timelineRef}
              className="timeline"
              onMouseDown={() => setIsScrubbing(true)}
              onClick={handleTimelineClick}
            >
              <div
                className="progress"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              ></div>
            </div>
            <div className="time-display">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
            <button className="mute-button" onClick={handleToggleMute}>
              {isMuted ? <MuteIcon /> : <VolumeIcon />}
            </button>
          </div>
        </div>
      )}
      <div className="home_page_first-section">
        <picture className="first-section_img">
          <source media="(max-width:450px)" srcSet={HeroIMGLaptop} />
          <source media="(max-width:990px)" srcSet={HeroIMGLaptop} />
          <img src={HeroIMGLaptop} alt="Hero section img" />
        </picture>
        <div className="first-section_right">
          <div className="first-section_right_text">
            {t("MASHAQQATLI MEHNATNING  MUKAMMAL MAHSULOTI")}
          </div>
          <div className="first-section_video">
            <div className="player">
              <video ref={gif3Ref} autoPlay muted loop id="myVideo">
                <source src={videoMain} type="video/mp4" />
                Your browser does not support HTML5 video.
              </video>
              <button
                onClick={() => {
                  OpenVideo();
                  openFullscreen();
                  handlePlay();
                }}
                className="play-btn"
              >
                <PlayIcon />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="home_page_second-section">
        <div className="second-section_text-wrap">
          <p className="second-section_text">
            {t(`Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy
            takomillashtirishga asoslangan jahon darajasidagi to'qimachilik
            mahsulotlarini ishlab chiqarish`)}
            .
          </p>
          <Link className="contact_link" to={"/contact"}>
            <BackIcon />
            <p>{t("Batafsil ma'lumot")}</p>
          </Link>
        </div>
        <picture className="home-img1">
          <source media="(max-width:450px)" srcSet={FirstSec1Mobile} />
          <source media="(max-width:990px)" srcSet={FirstSec1Tablet} />
          <img src={FirstSec1Laptop} alt="Hero section img" />
        </picture>
        <picture className="home-img2">
          <source media="(max-width:450px)" srcSet={HomeIMG1Mobile} />
          <source media="(max-width:990px)" srcSet={HomeIMG1Tablet} />
          <img src={HomeIMG1Laptop} alt="Hero section img" />
        </picture>
        <picture className="home-img3">
          <source media="(max-width:450px)" srcSet={HomeIMG2Mobile} />
          <source media="(max-width:990px)" srcSet={HomeIMG2Tablet} />
          <img src={HomeIMG2Laptop} alt="Hero section img" />
        </picture>
      </div>
      <div className="home_page_third-section" ref={thirdSectionRef}>
        <div className="third-section_evolution_numbers">
          <div className="evolution_numbers_element">
            <p>
              <NumberCounter
                startValue={1500}
                endValue={2020}
                triggerAnimation={triggerAnimation}
              />
              {t(" yil")}
            </p>
            <p>{t("dan beri faoliyat yuritamiz kelmoqdamiz")}</p>
          </div>
          <div className="evolution_numbers_element">
            <p>
              <NumberCounter
                startValue={1000}
                endValue={1200}
                triggerAnimation={triggerAnimation}
              />
              +
            </p>
            <p>{t("dan ortiq ishchixodimlar faoliyat yuritadi.")}</p>
          </div>
          <div className="evolution_numbers_element">
            <p>
              {" "}
              <NumberCounter
                startValue={0}
                endValue={8}
                triggerAnimation={triggerAnimation}
              />{" "}
              {t(" xil")}
            </p>
            <p>{t("turdagi mahsulotlar ishlab chiqaramiz")}</p>
          </div>
          <div className="evolution_numbers_element">
            <p>
              {" "}
              <NumberCounter
                startValue={0}
                endValue={5}
                triggerAnimation={triggerAnimation}
              />
              +
            </p>
            <p>{t("dan ortiq davlatlarga eksport qilamiz")}</p>
          </div>
        </div>
        <div className="third-section_countries">
          <p>{t("Eksport qiladigan viloyatlarimiz")}</p>
          <div className="countries_wrapper">
            <div className="countries_element">
              <span></span>
              <span>{t("Toshkent")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Buxoro")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Qoraqalpog’iston")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Jizzax")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Qashqadaryo")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Samarqand")}</span>
            </div>
          </div>
          <div className="third_section_gif">
            <video ref={gif1Ref} autoPlay muted loop>
              {lang === "uz" && <source src={mapUzbUz} type="video/mp4" />}
              {lang === "ru" && <source src={mapUzbRu} type="video/mp4" />}
              {lang === "en" && <source src={mapUzbEn} type="video/mp4" />}
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
        <div className="third-section_countries">
          <p>{t("Eksport qiladigan davlatlarimiz")}</p>
          <div className="countries_wrapper">
            <div className="countries_element">
              <span></span>
              <span>{t("AQSH")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Germaniya")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Rossiya")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Fransiya")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Qatar")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Singapur")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Singapur")}</span>
            </div>
            <div className="countries_element">
              <span></span>
              <span>{t("Yaponiya")}</span>
            </div>
          </div>
          <div className="third_section_gif">
            <video ref={gif2Ref} autoPlay muted loop>
              {lang === "uz" && <source src={mapWorldUz} type="video/mp4" />}
              {lang === "ru" && <source src={mapWorldRu} type="video/mp4" />}
              {lang === "en" && <source src={mapWorldEn} type="video/mp4" />}
              Your browser does not support HTML5 video.
            </video>
          </div>
        </div>
      </div>
      <div className="home_page_fourth-section">
        <div className="fourth-section_card-wrapper" id="first_card">
          <div className="fourth-section_card">
            <QualityIcon />
            <p className="fourth-section_card_name">
              {t("Yuqori sifatli paxta yog'i")}
            </p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-right">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
        <div className="fourth-section_card-wrapper" id="second_card">
          <div className="fourth-section_card">
            <VerifyIcon />
            <p className="fourth-section_card_name">{t("Birinchi nav")}</p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-right">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
        <div className="fourth-section_card-wrapper" id="third_card">
          <div className="fourth-section_card">
            <FlameIcon />
            <p className="fourth-section_card_name">{t("️Kuydirilgan")}</p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-right">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
        <div
          className="fourth-section_card-wrapper fourth-section_card-wrapper-rev"
          id="fourth_card"
        >
          <div className="fourth-section_card">
            <DropIcon />
            <p className="fourth-section_card_name">
              {t("100% tabiiy mahsulot")}
            </p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-left">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
        <div
          className="fourth-section_card-wrapper fourth-section_card-wrapper-rev"
          id="fifth_card"
        >
          <div className="fourth-section_card">
            <EnergyIcon />
            <p className="fourth-section_card_name">
              {t("4 xil filterdan o'tish")}
            </p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-left">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
        <div
          className="fourth-section_card-wrapper fourth-section_card-wrapper-rev"
          id="sixth_card"
        >
          <div className="fourth-section_card">
            <PlanetIcon />
            <p className="fourth-section_card_name">
              {t("Xalqaro standartlari")}
            </p>
            <p className="fourth-section_card_desc">
              {t(
                "Barcha mahsulotlar tabiiy va o’zimiz barcha jarayonlari nazorat qilamiz"
              )}
            </p>
          </div>
          <div className="fourth-section_card-line-left">
            <span className="card-line_length"></span>
            <span className="card-line_dot"></span>
          </div>
        </div>
      </div>
      <div className="home_page_fifth-section">
        <p className="fifth_section-title">
          {t("Ishlab chiqaradigan mahsulotlarimiz")}
        </p>
        <ProductsSwiper />
      </div>
      <div className="home_page_sixth-section">
        <p className="sixth-section_clients_title">
          {t("Bizning hamkorlarimiz")}
        </p>

        <PartnersSection />
      </div>
      <CommentSection />
      <div className="home_page_eighth-section">
        <div className="reels">
          {reelsData.map((i) => (
            <Reels
              isPlaying={i === currentPlayingIndex}
              onPlayToggle={() => handlePlayToggle(i)}
              key={uniqueId("reels")}
              {...{
                videoSrc: get(i, "video[0]"),
                videoPoster: get(i, "image[0].medium"),
              }}
            />
          ))}
        </div>
      </div>
      <div className="home_page_ninth-section">
        <ThreeBlogs />
      </div>
    </div>
  );
};

export default Main;
