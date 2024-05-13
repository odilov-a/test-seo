import {
  PartnersFirstLaptop,
  PartnersFirstMobile,
  PartnersFirstTablet,
} from "assets/images";
import FirstSection from "components/firstsection";
import PartnersSection from "components/partners";
import React, { useEffect } from "react";
import gsap from "gsap";
import useStore from "store";
import { ScrollTrigger } from "gsap/all";
import ThreeBlogs from "components/threenews";
import { Helmet } from "react-helmet";

const Partners = () => {
  let mm = gsap.matchMedia();
  gsap.registerPlugin(ScrollTrigger);
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {

      });
    }
  }, [loadingStatus]);
  return (
    <div className="partners_page">
      <div>
      <Helmet>
        <title>Partners - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
        <link rel="canonical" href="https://test-seo-sigma.vercel.app/partners" />
      </Helmet>
      </div>
      <FirstSection
        title="Hamkorlarimiz"
        imgLaptop={PartnersFirstLaptop}
        imgTablet={PartnersFirstTablet}
        imgMobile={PartnersFirstMobile}
        contact={false}
        pageDesc="Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy takomillashtirishga asoslangan jahon darajasidagi to'qimachilik mahsulotlarini ishlab chiqarish."
        pageName="50 dan ortiq kompaniyalar"
      />
      <div className="mx-[3vw] my-[7vw] partners">
        <PartnersSection />
      </div>
      <ThreeBlogs/>
    </div>
  );
};

export default Partners;
