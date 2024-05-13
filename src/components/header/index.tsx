import {
  FirstSec1Laptop,
  FirstSec1Mobile,
  FirstSec1Tablet,
  GoalsFirstLaptop,
  GoalsFirstMobile,
  GoalsFirstTablet,
  LogoLaptop,
  LogoMobile,
  LogoTablet,
  NewsFirstLaptop,
  NewsFirstMobile,
  NewsFirstTablet,
  PartnersFirstLaptop,
  PartnersFirstMobile,
  PartnersFirstTablet,
  Product1Laptop,
  Product1Mobile,
  Product1Tablet,
} from "assets/images";
import {
  ArrowIcon,
  CheckedIcon,
  CloseIcon,
  DropArrow,
  NavbarIcon,
  UncheckedIcon,
} from "assets/images/icons";
import gsap from "gsap";
import { useHooks } from "hooks";
import { useEffect, useState } from "react";
import i18next from "i18next";
import { Link } from "react-router-dom";
import { storage } from "services";
import useStore from "store";


interface Link {
  id: number;
  name: string;
  imageLaptop: string;
  imgTablet: string;
  imgMobile: string;
  url: string;
}

const Links: Link[] = [
  {
    id: 1,
    name: "Biz haqimizda",
    imageLaptop: FirstSec1Laptop,
    imgTablet: FirstSec1Tablet,
    imgMobile: FirstSec1Mobile,
    url: "about",
  },
  {
    id: 2,
    name: "Bizneslarimiz",
    imageLaptop: Product1Laptop,
    imgTablet: Product1Tablet,
    imgMobile: Product1Mobile,
    url: "about/#products",
  },
  {
    id: 3,
    name: "Maqsadlarimiz",
    imageLaptop: GoalsFirstLaptop,
    imgTablet: GoalsFirstTablet,
    imgMobile: GoalsFirstMobile,
    url: "goals",
  },
  {
    id: 4,
    name: "Hamkorlarimiz",
    imageLaptop: PartnersFirstLaptop,
    imgTablet: PartnersFirstTablet,
    imgMobile: PartnersFirstMobile,
    url: "partners",
  },
  {
    id: 5,
    name: "Yangiliklar",
    imageLaptop: NewsFirstLaptop,
    imgTablet: NewsFirstTablet,
    imgMobile: NewsFirstMobile,
    url: "news",
  },
  {
    id: 6,
    name: "Aloqa",
    imageLaptop: NewsFirstLaptop,
    imgTablet: NewsFirstTablet,
    imgMobile: NewsFirstMobile,
    url: "contact",
  },
];
const HeaderComponent = () => {
  const [formattedTime, setFormattedTime] = useState<string>("");
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hoveredLink, setHoveredLink] = useState<number | null>(1);
  const { t } = useHooks();
  const {
    system: { loadingStatus },
  } = useStore();
  const changeLang = (langCode: string) => {
		i18next.changeLanguage(langCode);
    window.location.reload();
	};
  let lang = storage.get("i18nextLng");
  

  let mm = gsap.matchMedia();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".header", { y: -200, duration: 0.8 });
        if (isOpen === true) {
          gsap.from(".open_navbar", {
            opacity: 0,
            y: 400,
            duration: 0.8,
            delay: 3,
          });
        }
      });
    }
    
  }, [loadingStatus]);
  useEffect(() => {
    const handleEscKey = (event: any) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscKey);

    return () => {
      document.removeEventListener("keydown", handleEscKey);
    };
  }, [isOpen]);
  const handleMouseEnter = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    id: number
  ) => {
    const elements = document.querySelectorAll(".header-img-container");
    elements.forEach((element) => {
      element.classList.add("hoverLink");
    });
    setHoveredLink(id);
  };

  const handleMouseLeave = () => {
    const elements = document.querySelectorAll(".header-img-container");
    elements.forEach((element) => {
      element.classList.remove("hoverLink");
    });
    setHoveredLink(null);
  };

  const handleOpen = () => {
    setIsOpen(!isOpen);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    document.body.style.overflow = isOpen ? "" : "clip";
  };
  useEffect(() => {
    // Get current time
    const intervalId = setInterval(() => {
      const now = new Date();
      const hours = now.getHours() % 12 || 12; // Convert to 12-hour format
      const minutes = now.getMinutes();
      setFormattedTime(`${hours}:${minutes < 10 ? "0" : ""}${minutes}`);
    }, 1000);

    // Set a default location format
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await response.json();
          setCurrentLocation(`${data.address.city}, ${data.address.country}`);
        } catch (error) {
          setCurrentLocation("Unable to retrieve location");
        }
      },
      (error) => {
        setCurrentLocation("Unable to retrieve location");
      }
    );
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <header className="header">
        <div className="header_left-side">
          <button onClick={handleOpen}>
            <NavbarIcon />
          </button>
          <button className="header_products-dropdown">
            <span className="products-dropdown__title">
              <p>{t("Ishlab chiqarish")}</p>
              <DropArrow />
            </span>
            <div className={`products-dropdown__list`}>
              <div>
                <Link to="/products/6">{t("Chorvachilik kompleksi")}</Link>

                <Link to="/products/2">{t("Yog’ moy")}</Link>
                <Link to="/products/3">{t("Paxtani qayta ishlash")}</Link>
                <Link to="/products/4">{t("Qishloq xo’jalik")}</Link>
              </div>
              <div>
                <Link to="/products/5">{t("Tikuvchilik")}</Link>
                <Link to="/products/1">{t("Ip yigiruv")}</Link>

                <Link to="/products/7">{t("Bo’yoq")}</Link>
                <Link to="/products/8">{t("To’quv")}</Link>
              </div>
            </div>
          </button>
        </div>
        <Link className="header_logo" to={"/"}>
          <picture>
            <source media="(max-width:450px)" srcSet={LogoMobile} />
            <source media="(max-width:990px)" srcSet={LogoTablet} />
            <img src={LogoLaptop} alt="Hero section img" />
          </picture>
        </Link>
        <div className="header_right-side">
          <div className="header_lang-dropdown">
            <span className="lang-dropdown__title">
              <p>{storage.get("i18nextLng")?.toUpperCase() || lang}</p>
              <DropArrow />
            </span>
            <div className="lang-dropdown__list">
              <span onClick={() => (
                changeLang("ru")
              )}>
                {lang === "ru" ? <CheckedIcon /> : <UncheckedIcon />}
                <p>RU</p>
              </span>
              <span onClick={() => (
                
                changeLang("uz")
              )}>
                {lang === "uz" ? <CheckedIcon /> : <UncheckedIcon />}
                <p>UZ</p>
              </span>
              <span onClick={() => (
                changeLang("en")
              )}>
                {lang === "en" ? <CheckedIcon /> : <UncheckedIcon />}
                <p>EN</p>
              </span>
            </div>
          </div>
          <Link className="contact_link" to="/contact">
            {t("Aloqa")}
          </Link>
        </div>
      </header>

      <div className={`inside-header ${isOpen ? "open_navbar" : ""}`}>
        <div className="inside-header_top">
          <div className="close-navbar">
            <button onClick={handleOpen} className="close-navbar-btn">
              <CloseIcon />
            </button>
            <p>{t("Yopish")}</p>
          </div>
          <div className="navbar-time">
            <p>{currentLocation}</p>
            <p>{formattedTime}</p>
          </div>
        </div>
        <div className="inside-header_bottom">
          <div className="header-left-wrapper">
            <div className="header-links">
              {Links.map((link) => (
                <Link
                  key={link.id}
                  onClick={handleOpen}
                  onMouseEnter={(e) => handleMouseEnter(e, link.id)}
                  onMouseLeave={handleMouseLeave}
                  to={`/${link.url}`}
                >
                  {t(link.name)}
                </Link>
              ))}
            </div>
            <div className="header-img-container">
              {hoveredLink !== null && (
                <picture className="header-img">
                  <source
                    media="(max-width:450px)"
                    srcSet={
                      hoveredLink
                        ? Links.find((link) => link.id === hoveredLink)
                          ?.imgMobile
                        : ""
                    }
                  />
                  <source
                    media="(max-width:990px)"
                    srcSet={
                      hoveredLink
                        ? Links.find((link) => link.id === hoveredLink)
                          ?.imgTablet
                        : ""
                    }
                  />
                  <img
                    src={
                      hoveredLink
                        ? Links.find((link) => link.id === hoveredLink)
                          ?.imageLaptop
                        : ""
                    }
                    alt="Hero section img"
                  />
                </picture>
              )}
            </div>
          </div>
          <div className="header-social-wrapper">
            <div>
              <a href="https://t.me/gurlanglobal" className="header-social">
                <p>{t("Telegram")}</p>
                <ArrowIcon />
              </a>
              <a
                href="https://www.instagram.com/gurlanglobal/"
                className="header-social"
              >
                <p>{t("Instagram")}</p>
                <ArrowIcon />
              </a>
            </div>
            <a href="tel:+998978570005" className="header-phone">
              +99897-857-00-05
            </a>
          </div>
        </div>
      </div>

      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={handleOpen}
      ></div>
    </>
  );
};

export default HeaderComponent;
