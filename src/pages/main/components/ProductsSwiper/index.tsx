import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Keyboard, Autoplay } from "swiper/modules";
import { BackIcon } from "assets/images/icons";
import { useHooks } from "hooks";
const ProductsSwiper = () => {
  const {t} = useHooks()
  return (
    <>
      <Swiper
        mousewheel={true}
        slidesPerView={3.2}
        loop={true}
        keyboard={true}
        grabCursor={true}
        modules={[Keyboard, Autoplay]}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 3.2,
          },
        }}
      >
        <SwiperSlide id="swiper-item1">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
            <p>{t("Yog’ moy")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item2">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Chorvachilik kompleksi")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item3">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Paxtani qayta ishlash")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item4">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Qishloq xo’jaligi")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item5">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Ip yigiruv")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item6">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("To’quv")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item7">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Bo’yoq")}</p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide id="swiper-item8">
          <div className="swiper_item">
            <div className="swiper_item-wrapper">
              <BackIcon />
              <p>{t("Tikuvchilik")}</p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default ProductsSwiper;
