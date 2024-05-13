import { useEffect, useState } from "react";
import { useGet, useHooks } from "hooks";
import {
  NewsFirstLaptop,
  NewsFirstMobile,
  NewsFirstTablet,
} from "assets/images";
import { DropArrow, FilterIcon } from "assets/images/icons";
import FirstSection from "components/firstsection";
import BlogCard from "./components/BlogCard";
import "../../assets/styles/_news.scss";
import Container from "modules/container";
import { Pagination } from "antd";
import { uniqueId } from "lodash";
import gsap from "gsap";
import useStore from "store";
import { ScrollTrigger } from "gsap/all";
import { Helmet } from "react-helmet";

const News = () => {
  let mm = gsap.matchMedia();
  gsap.registerPlugin(ScrollTrigger);
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".news_list", { y: 400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: "news_list_head",
          start: "40% 80%",
        } });
        gsap.from(".news_list_head-title", { x: -400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: ".general_first-section",
          start: "90% 50%"
        } });
        gsap.from(".news_list_head-filter", { x: 400, opacity: 0,  duration: 1, scrollTrigger: {
          trigger: ".general_first-section",
          start: "90% 50%"
        } });

      });
    }
  }, [loadingStatus]);
  const { get, t } = useHooks();

  const [page, setPage] = useState(1);
  const [checkedValues, setCheckedValues] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [fetchedData, setData] = useState([]);

  const { data } = useGet({
    name: "hashtags",
    url: "hashtags",
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const filterOptions = get(data, "data", []);

  const handleCheckedValues = (value: any) => {

    //@ts-ignore
    if (checkedValues.includes(value)) {
      setCheckedValues(checkedValues.filter((item: any) => item !== value));
    } else {
      //@ts-ignore
      setCheckedValues([...checkedValues, value]);
    }
  };

  useEffect(
    () =>
      setFilteredData(
        fetchedData.filter((item) =>
          checkedValues?.includes(get(item, "hashtag"))
        )
      ),
    [checkedValues, fetchedData, get]
  );

  return (
    <div className="news_page">
      <div>
      <Helmet>
        <title>News - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
      </Helmet>
      </div>
      <FirstSection
        title="Yangiliklar"
        imgLaptop={NewsFirstLaptop}
        imgTablet={NewsFirstTablet}
        imgMobile={NewsFirstMobile}
        contact={false}
        pageDesc={t("News content")}
        pageName={t("Barcha yangiliklar")}
      />
      <div className="news_list_head">
        <p className="news_list_head-title">{t("Barcha yangiliklar")}</p>
        <div className="news_list_head-filter">
          <FilterIcon />
          <div className="filter-select">
            <p>{t("Filter")}</p>
            <DropArrow />
            <div className="filter_items">
              {filterOptions.map((item) => (
                <span key={get(item, "_id")} className="filter-option">
                  <input
                    type="checkbox"
                    className="filter-checkbox"
                    onChange={(e) =>
                      // setFilterItem()
                      handleCheckedValues(get(item, "_id"))
                    }
                    name=""
                    id=""
                  />
                  <p>
                    {get(item, "title", "")
                      .charAt(0)
                      .toUpperCase() + get(item, "title", "").slice(1)}
                  </p>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Container.All
        name="news"
        url="news"
        params={{
          limit: 99,
          page,
        }}
      >
        {({ isLoading, items, meta, isFetched }) => {
          //@ts-ignore
          setData(items);

          return (
            <>
              <div className="news_list">
                {/* <div className="blog_cards"> */}
                {filteredData.length && checkedValues.length
                  ? filteredData?.map((news: any) => (
                      <BlogCard key={uniqueId("blogCard")} {...{ news }} />
                    ))
                  : items?.map((news: any) => (
                      <BlogCard key={uniqueId("blogCard")} {...{ news }} />
                    ))}
                {/* </div> */}
              </div>
              {meta && meta.perPage && (
                <div className="mt-[20px] flex justify-center">
                  <Pagination
                    current={meta.currentPage}
                    pageSize={meta.perPage}
                    total={meta.totalCount}
                    onChange={(page: any) => {
                      setPage(page);
                      window.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: 0,
                      });
                    }}
                  />
                </div>
              )}
            </>
          );
        }}
      </Container.All>
    </div>
  );
};

export default News;
