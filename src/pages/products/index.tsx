import React, { useEffect } from "react";
import "../../assets/styles/_products.scss";
import FirstSection from "components/firstsection";
import { Product1Laptop, Product1Mobile, Product1Tablet } from "assets/images";
import { QualityIcon } from "assets/images/icons";
import { Cards } from "services/data/cards";
import GallerySwiper from "./components/GallerySwiper";
import { useHooks } from "hooks";
import { useParams } from "react-router-dom";
import { ProductsData } from "services/data/products";
import { number } from "yup";
import gsap from "gsap";
import useStore from "store";
import { ScrollTrigger } from "gsap/all";
import { Helmet } from "react-helmet";

interface Product {
  id: number;
  title: string;
  desc: string;
  pic: any
}
const Products = ({ data }: { data: Product[] }) => {
  const { id } = useParams<{ id: string }>();
  let mm = gsap.matchMedia();
  gsap.registerPlugin(ScrollTrigger);
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".products_page_second_section", { y: 400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: ".products_page",
          start: "25% 50%"
        } });
        gsap.from(".third_section_left", { x: -400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: ".products_page",
          start: "40% 50%"
        } });
        gsap.from(".products_page_fourth_section", { y: 400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: ".products_page",
          start: "90% 50%"
        } });

      });
    }
  }, [loadingStatus]);

  const product = ProductsData.find(product => product.id === parseInt(id ?? ""));
  const {t, get} = useHooks()
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="products_page">
      <div>
      <Helmet>
        <title>Products - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
        <link rel="canonical" href="https://test-seo-sigma.vercel.app/about/#products" />
      </Helmet>
      </div>
      <FirstSection
        title="Mahsulot"
        imgLaptop={product?.pic}
        imgTablet={product.pic}
        imgMobile={product.pic}
        contact={true}
        pageDesc={product.desc}
        pageName={product.title}
      />
      <div className="products_page_second_section">
        <p>
          {t(`Biz milliy madaniyat, innovatsiyaga sodiq qolgan holda doimiy
          takomillashtirishga asoslangan jahon darajasidagi to'qimachilik
          mahsulotlarini ishlab chiqarish`)}.
        </p>
      </div>
      <div className="products_page_third_section">
        <div className="third_section_left">
          <p className="third_section_left-top">{t("Barqarorlik")}</p>
          <p className="third_section_left-bottom">
            {t(`Boshqalardan bo’yicha bu yerdan ma’lumot mumkin`)}
          </p>
        </div>
        <div className="third_section_right">
          {Cards.map((card, index) => (
            <div key={index} className="cards_element">
              {<card.icon />}
              <div>
                <p className="cards_element_title">{t(card.title)}</p>
                <p className="cards_element_desc">{t(card.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <GallerySwiper/>
    </div>
  );
};

export default Products;
