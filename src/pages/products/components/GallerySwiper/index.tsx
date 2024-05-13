// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// import required modules
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { SwiperArrow } from "assets/images/icons";
import { Clients } from "services/data/clients";
import { useGet, useHooks } from "hooks";

export default function GallerySwiper() {
  const { get, t } = useHooks()

  const { isLoading, data } = useGet({
    name: "galleries",
    url: "galleries",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  const galeryData = get(data, "data", [])

  return (
    <div className="products_page_fourth_section">
      <div className="fourth_section_top">
        <p className="fourth_section_top-title">{t("Galereya")}</p>
        <div className="fourth_section_top-buttons">
          <button className="image-swiper-button-prev">
            <SwiperArrow />
          </button>
          <button className="image-swiper-button-next">
            <SwiperArrow />
          </button>
        </div>
      </div>
      <Swiper
        cssMode={true}
        slidesPerView={2.5}
        breakpoints={{
          0: {
            slidesPerView: 1.5,
          },
          768: {
            slidesPerView: 2.5,
          },
          1024: {
            slidesPerView: 2.5,
          },
        }}
        navigation={{
          nextEl: ".image-swiper-button-next",
          prevEl: ".image-swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        mousewheel={true}
        keyboard={true}
        modules={[Navigation, Pagination, Mousewheel, Keyboard]}
        className="mySwiper"
      >
        {galeryData.map((el) => (
          <SwiperSlide key={get(el,"_id")}>
            <picture className="">
              <source media="(max-width:450px)" srcSet={get(el,"image[0].large")} />
              <source media="(max-width:990px)" srcSet={get(el,"image[0].large")} />
              <img src={get(el,"image[0].large")} alt="swiper img" />
            </picture>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
