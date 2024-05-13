import { Link } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import { useGet, useHooks } from "hooks";

import { BackIcon, DateIcon, ShareIcon, TimeIcon } from "assets/images/icons";
import "../../assets/styles/_blog.scss";
import gsap from "gsap";
import useStore from "store";
import { ScrollTrigger } from "gsap/all";
import { useEffect } from "react";
import { Helmet } from "react-helmet";

const Blog = () => {
  let mm = gsap.matchMedia();
  gsap.registerPlugin(ScrollTrigger);
  const {
    system: { loadingStatus },
  } = useStore();
  useEffect(() => {
    if (loadingStatus) {
      mm.add("(min-width: 800px)", () => {
        gsap.from(".blog_page", { y: 400, opacity: 0,  duration: 1,  });


      });
    }
  }, [loadingStatus]);
  const { get, params } = useHooks()
  const ID = get(params, "id")

  const handleCopyUrl = () => {
    const currentUrl = window.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        toast.success("Link is copied", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      })
      .catch((error) => {
        console.error("Failed to copy URL: ", error);
      });
  };

  const { data } = useGet({
    name: `news-${ID}`,
    url: `news/${ID}`,
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  const blogData = get(data, "data", [])

  return (
    <div className="blog_page">
      <div>
      <Helmet>
        <title>Blog - Your Website Name</title>
        <meta
          name="description"
          content="Description of your about page."
        />
        <link rel="canonical" href="https://test-seo-sigma.vercel.app/news" />
      </Helmet>
      </div>
      <div className="blog_page_head">
        <Link to="/news">
          <BackIcon />
          <p>Orqaga</p>
        </Link>
        <button onClick={handleCopyUrl}>
          <p>Ulashish:</p>
          <ShareIcon />
        </button>
      </div>
      <div className="blog_page_content">
        <div className="blog_page_content-head">
          <p className="blog_page_content-title">{get(blogData, "title")}</p>
          <div className="blog_date_time">
            {/* <span className="blog_time">
              <TimeIcon />
              <p>340 views</p>
            </span> */}
            <span className="blog_date">
              <DateIcon />
              <p>
                {get(blogData, "createdAt", "").slice(0, 10).replaceAll("-", ".")}
              </p>
            </span>
          </div>
        </div>
        <div className="blog_page_content_main">
          <picture className="content_main_image">
            <source media="(max-width:450px)" srcSet={get(blogData, "image[0].small")} />
            <source media="(max-width:990px)" srcSet={get(blogData, "image[0].medium")} />
            <img src={get(blogData, "image[0].large")} alt="Hero section img" />
          </picture>
          <p className="content_main_desc">
            {get(blogData, "description")}
          </p>
          <div className="bottom_img">
            {get(blogData, "image02[0]") && <picture className="content_main_image">
              <source media="(max-width:450px)" srcSet={get(blogData, "image02[0].small")} />
              <source media="(max-width:990px)" srcSet={get(blogData, "image02[0].medium")} />
              <img src={get(blogData, "image02[0].large")} alt="Hero section img" />
            </picture>}
            {get(blogData, "image03[0]") && <picture className="content_main_image">
              <source media="(max-width:450px)" srcSet={get(blogData, "image03[0].small")} />
              <source media="(max-width:990px)" srcSet={get(blogData, "image03[0].medium")} />
              <img src={get(blogData, "image03[0].large")} alt="Hero section img" />
            </picture>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
