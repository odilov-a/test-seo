import { useGet, useHooks } from "hooks";
import {
  FirstSec1Laptop,
  FirstSec1Mobile,
  FirstSec1Tablet,
  GoalsFirstLaptop,
  GoalsFirstMobile,
  GoalsFirstTablet,
  GoalsImg1Mobile,
  GoalsImg1Tablet,
  GoalsImg1tLaptop,
  GoalsImg2Mobile,
  GoalsImg2Tablet,
  GoalsImg2tLaptop,
} from "assets/images";
import "../../assets/styles/_goals.scss";
import FirstSection from "components/firstsection";
import { uniqueId } from "lodash";
import gsap from "gsap";
import useStore from "store";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Goals = () => {

  const { get, t } = useHooks()

  const { isLoading, data } = useGet({
    name: "evolutions",
    url: "evolutions",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });
  gsap.registerPlugin(ScrollTrigger);
  let mm = gsap.matchMedia();
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    
      mm.add("(min-width: 800px)", () => {
        if (loadingStatus) {
          gsap.from('#goals-first-img', {
            opacity: 0,
            scale: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".goals_page",
              start: "20% 50%",
            },
          })
          gsap.from('#goals-second-img', {
            opacity: 0,
            scale: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".goals_page",
              start: "40% 50%",
            },
          })
          gsap.from('#goals-third-img', {
            opacity: 0,
            scale: 0,
            duration: 1,
            scrollTrigger: {
              trigger: ".goals_page",
              start: "70% 50%",
            },
          })
          gsap.utils.toArray(".second_section-left_year").forEach((div, index) => {
            gsap.from(div as gsap.DOMTarget, {
              opacity: 0,
              x: -450,
              duration: 0.9,
              scrollTrigger: {
                trigger: div as gsap.DOMTarget,
                start: "10% 90%",
                toggleActions: "play none none none",
              },
            });
          });
          gsap.utils.toArray(".second_section-right_plan").forEach((div, index) => {
            gsap.from(div as gsap.DOMTarget, {
              opacity: 0,
              x: 450,
              duration: 1,
              scrollTrigger: {
                trigger: div as gsap.DOMTarget,
                start: "10% 90%",
                toggleActions: "play none none none",
              },
            });
          });
          gsap.utils.toArray(".goals_page_second_section-center").forEach((div, index) => {
            gsap.from(div as gsap.DOMTarget, {
              opacity: 0,
              scale: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: div as gsap.DOMTarget,
                start: "10% 50%",
                toggleActions: "play none none none",
              },
            });
          });
        }
       

      });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [loadingStatus]);

  const evolution = get(data,"data", [])

  return (
    <div className="goals_page">
      <div>
      <Helmet>
        <title>Goals - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
      </Helmet>
      </div>
      <FirstSection
        title="Maqsadlarimiz"
        imgLaptop={GoalsFirstLaptop}
        imgTablet={GoalsFirstTablet}
        imgMobile={GoalsFirstMobile}
        contact={false}
        pageDesc="Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
        pageName="5 yillik rejalarimiz"
      />
      <div className="goals_page_second_section">
        <picture id="goals-first-img">
          <source media="(max-width:450px)" srcSet={FirstSec1Mobile} />
          <source media="(max-width:990px)" srcSet={FirstSec1Tablet} />
          <img src={FirstSec1Laptop} alt="Hero section img" />
        </picture>
        <picture id="goals-second-img">
          <source media="(max-width:450px)" srcSet={GoalsImg1Mobile} />
          <source media="(max-width:990px)" srcSet={GoalsImg1Tablet} />
          <img src={GoalsImg1tLaptop} alt="Hero section img" />
        </picture>
        <picture id="goals-third-img">
          <source media="(max-width:450px)" srcSet={GoalsImg2Mobile} />
          <source media="(max-width:990px)" srcSet={GoalsImg2Tablet} />
          <img src={GoalsImg2tLaptop} alt="Hero section img" />
        </picture>
        {evolution.map((item: any) => (
          <div key={uniqueId("goals")} className="plan-wrapper">
          <p className="second_section-left_year">{get(item, "year")} {t("yil")}</p>
          <div className="goals_page_second_section-center"></div>
          <p className="second_section-right_plan">
            {get(item, "description")}
          </p>
        </div>
        ))}
      </div>
    </div>
  );
};

export default Goals;
