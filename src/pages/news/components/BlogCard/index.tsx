import { ArrowIcon } from "assets/images/icons";
import { useHooks } from "hooks";
import { Link } from "react-router-dom";

const BlogCard = ({ news }: any) => {
  const { get } = useHooks();

  return (
    <div className="blog_card">
      <picture className="blog_image">
        <source
          media="(max-width:450px)"
          srcSet={get(news, "image[0].small")}
        />
        <source
          media="(max-width:990px)"
          srcSet={get(news, "image[0].medium")}
        />
        <img src={get(news, "image[0].large")} alt="Hero section img" />
      </picture>
      <div className="blog_hashtag">
        <span className="g_green_dot" />
        <p>{get(news, "hashtag.title")}</p>
      </div>
      <p className="blog_title">{get(news, "title")}</p>
      <p className="blog_desc">{get(news, "description")}</p>
      <Link
        onClick={() =>
          window.scrollTo({
            top: 0,
          })
        }
        className="blog_link"
        to={`/news/${get(news, "_id")}`}
      >
        <ArrowIcon />
      </Link>
    </div>
  );
};

export default BlogCard;
