import React, { useEffect, useRef, useState } from "react";
import "../../assets/styles/_about.scss";
import FirstSection from "components/firstsection";
import { Link } from "react-router-dom";
import { BackIcon } from "assets/images/icons";
import {
  FirstSec1Laptop,
  FirstSec1Mobile,
  FirstSec1Tablet,
  Product1Laptop,
  Product1Mobile,
  Product1Tablet,
  Product2Laptop,
  Product2Mobile,
  Product2Tablet,
  Product3Laptop,
  Product3Mobile,
  Product3Tablet,
  Product4Laptop,
  Product4Mobile,
  Product4Tablet,
  Product5Laptop,
  Product5Mobile,
  Product5Tablet,
  Product6Laptop,
  Product6Mobile,
  Product6Tablet,
  Product7Laptop,
  Product7Mobile,
  Product7Tablet,
  Product8Laptop,
  Product8Mobile,
  Product8Tablet,
  productsEn,
  productsResEn,
  productsResRu,
  productsResUz,
  productsRu,
  productsUz,
} from "assets/images";
import { url } from "inspector";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useHooks } from "hooks";
import { storage } from "services";
import useStore from "store";
import { Helmet } from "react-helmet";

gsap.registerPlugin(ScrollTrigger);
const About = () => {
  const { t } = useHooks();
  const [activeSection, setActiveSection] = useState("");
  const [showPlayer, setShowPlayer] = useState(window.innerWidth > 600);
  const navbarRef = useRef<HTMLDivElement>(null);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const section7Ref = useRef<HTMLDivElement>(null);
  const section8Ref = useRef<HTMLDivElement>(null);
  const gif4Ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const gif1Element = gif4Ref.current;
  
    if (gif1Element ) {
      gif1Element.controls = false;
  
      gif1Element.addEventListener('play', () => {
        gif1Element.controls = false;
      });
  
      gif1Element.addEventListener('pause', () => {
        gif1Element.controls = false;
      });
    }
  
    return () => {
      if (gif1Element) {
        gif1Element.removeEventListener('play', () => {
          gif1Element.controls = false;
        });
  
        gif1Element.removeEventListener('pause', () => {
          gif1Element.controls = false;
        });
      }
    };
  }, []);

  let mm = gsap.matchMedia();
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        const productImgs = document.querySelectorAll('.about_page_products');

        productImgs.forEach((el, position) => {
          gsap.timeline({
              scrollTrigger: {
                  trigger: el,
                  start: 'top bottom',
                  end: 'top top',
                  toggleActions: 'play reverse play reverse',
                  scrub: true
              }
          })
          .fromTo(el, {
              opacity: 0,
              y: 50,
              scale: 0.5
          }, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1
          });
      });
        gsap.from(".about_page_gif", {
          scale: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: ".general_first-section",
            start: "70% 50%",
          },
        });
      });
    }
    ScrollTrigger.refresh();

    // Clean up function to unregister ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach((instance) => instance.kill());
    };
  }, [loadingStatus]);


  useEffect(() => {
    const handleResize = () => {
      setShowPlayer(window.innerWidth > 600);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  let lang = storage.get("i18nextLng");

  return (
    <div className="about_page">
      <div>
      <Helmet>
        <title>About - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
        <link rel="canonical" href="https://test-seo-sigma.vercel.app/about" />
      </Helmet>
      </div>
      <FirstSection
        title="Biz haqimizda"
        imgLaptop={FirstSec1Laptop}
        imgTablet={FirstSec1Tablet}
        imgMobile={FirstSec1Mobile}
        contact={false}
        pageDesc="Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
        pageName="Gurlan Global Teks"
      />
      <div className="about_page_gif">
        <video ref={gif4Ref} autoPlay muted loop>
          {lang === "uz" && (
            <source
              src={showPlayer ? productsUz : productsResUz}
              type="video/mp4"
            />
          )}
          {lang === "ru" && (
            <source
              src={showPlayer ? productsRu : productsResRu}
              type="video/mp4"
            />
          )}
          {lang === "en" && (
            <source
              src={showPlayer ? productsEn : productsResEn}
              type="video/mp4"
            />
          )}
          Your browser does not support HTML5 video.
        </video>
      </div>
      <div id="products" className="products_section">
        <section
          className="about_page_products"
          ref={section1Ref}
          id="product1"
        >
          <div className="products_left">
            <p className="products_title">{t("Yog’ moy")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              to={"/products/2"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img" id="first_product">
            <source media="(max-width:450px)" srcSet={Product1Mobile} />
            <source media="(max-width:990px)" srcSet={Product1Tablet} />
            <img src={Product1Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section2Ref}
          id="product2"
        >
          <div className="products_left">
            <p className="products_title">{t("Chorvachilik kompleksi")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/6"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product2Mobile} />
            <source media="(max-width:990px)" srcSet={Product2Tablet} />
            <img src={Product2Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section3Ref}
          id="product3"
        >
          <div className="products_left">
            <p className="products_title">{t("Paxtani qayta ishlash")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/3"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product3Mobile} />
            <source media="(max-width:990px)" srcSet={Product3Tablet} />
            <img src={Product3Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section4Ref}
          id="product4"
        >
          <div className="products_left">
            <p className="products_title">{t("Qishloq xo’jalik")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/4"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product4Mobile} />
            <source media="(max-width:990px)" srcSet={Product4Tablet} />
            <img src={Product4Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section5Ref}
          id="product5"
        >
          <div className="products_left">
            <p className="products_title">{t("Ip yigiruv")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/1"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product5Mobile} />
            <source media="(max-width:990px)" srcSet={Product5Tablet} />
            <img src={Product5Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section6Ref}
          id="product6"
        >
          <div className="products_left">
            <p className="products_title">{t("To’quv")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/8"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product6Mobile} />
            <source media="(max-width:990px)" srcSet={Product6Tablet} />
            <img src={Product6Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section7Ref}
          id="product7"
        >
          <div className="products_left">
            <p className="products_title">{t("Bo’yoq")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/7"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product7Mobile} />
            <source media="(max-width:990px)" srcSet={Product7Tablet} />
            <img src={Product7Laptop} alt="Hero section img" />
          </picture>
        </section>
        <section
          className="about_page_products"
          ref={section8Ref}
          id="product8"
        >
          <div className="products_left">
            <p className="products_title">{t("Tikuvchilik")}</p>
            <p className="products_desc">
              {t(
                "Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
              )}
            </p>
            <Link
              onClick={() =>
                window.scrollTo({
                  top: 0,
                })
              }
              className="products_link"
              to={"/products/5"}
            >
              <BackIcon />
              <p>{t("Batafsil ma'lumot")}</p>
            </Link>
          </div>
          <picture className="product_img">
            <source media="(max-width:450px)" srcSet={Product8Mobile} />
            <source media="(max-width:990px)" srcSet={Product8Tablet} />
            <img src={Product8Laptop} alt="Hero section img" />
          </picture>
        </section>
      </div>
    </div>
  );
};

export default About;
