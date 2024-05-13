import { CallIcon } from "assets/images/icons";
import gsap from "gsap";
import { useHooks } from "hooks";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useStore from "store";


interface FirstSectionProps {
  title: string;
  imgLaptop: any;
  imgTablet: any;
  imgMobile: any;
  pageName: string;
  pageDesc: string;
  contact: boolean;
}
const FirstSection: React.FC<FirstSectionProps> = (props) => {
  let mm = gsap.matchMedia();
  const {
    system: { loadingStatus },
  } = useStore();
  const {t} = useHooks()
  useEffect(() => {
   if(loadingStatus){
    mm.add("(min-width: 800px)", () => {
      gsap.from(".g_first_section_right", { scale: 0, transformOrigin: "right bottom",  duration: 1 });
      gsap.from(".g_first-section_left", { y: 400, opacity: 0, duration: 1,  });
      gsap.from(".g_page_title_wrapper", { x: 200, opacity: 0, duration: 1, });
      gsap.from(".g_page_name", { x: -100, opacity: 0, duration: 1,  });
      gsap.from(".p_page_desc_wrapper", { y: 100, opacity: 0, duration: 1, });
    });
   }
  }, [loadingStatus]);
  return (
    <div className="general_first-section">
      <div className="g_first-section_left">
        <div className="g_first-section_left-top">
        <div className="g_page_title_wrapper">
          <span className="g_green_dot" />
          <p className="">{t(props.title)}</p>
        </div>
        <p className="g_page_name">{t(props.pageName)}</p>
        </div>
        <div className="p_page_desc_wrapper">
          <p className="p_page_desc">{t(props.pageDesc)}</p>
          {props.contact === true && (
            <Link to={"/contact"}>
              <CallIcon />
              <p>{t("Batafsil")}</p>
            </Link>
          )}
        </div>
      </div>
      <div className="g_first_section_right">
        <picture className="g_first-section_img">
          <source media="(max-width:450px)" srcSet={""} />
          <source media="(max-width:990px)" srcSet={""} />
          <img src={props.imgLaptop} alt="Hero section img" />
        </picture>
      </div>
    </div>
  );
};

export default FirstSection;
