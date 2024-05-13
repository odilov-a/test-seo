import { ArrowIcon } from "assets/images/icons";
import { useGet, useHooks } from "hooks";
import { uniqueId } from "lodash";
import BlogCard from "pages/news/components/BlogCard";
import React from "react";
import { Link } from "react-router-dom";
import "../../assets/styles/_news.scss";

const ThreeBlogs = () => {
  const { get, t } = useHooks();
  const { data } = useGet({
    name: "news",
    url: "news",
    onSuccess: (data) => {},
    onError: (error) => {},
  });

  const news = get(data, "data", []);
  return (
    <div className="threeBlogs">
      <div className="threeBlogs_head">
        <p>{t("Yangiliklar")}</p>
        <Link
          onClick={() =>
            window.scrollTo({
              top: 0,
            })
          }
          to={"/news"}
        >
          <span>{t("Barchasi")}</span>
          <ArrowIcon />
        </Link>
      </div>
      <div className="threeBlogs_wrapper">
        <div className="threeBlogs_items">
          {news.slice(0, 3).map((news) => (
            <BlogCard key={uniqueId("blogCard")} {...{ news }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ThreeBlogs;
