import { BackIcon } from "assets/images/icons";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="notfound-page">
      <div className="gradient" />
      <p className="error-text">404</p>
      <p className="error-message">Sahifa topilmadi</p>
      <p className="error-message-2">
        Kechirasiz, siz qidirayotgan sahifani topa olmadik
      </p>
      <Link className="back-btn" to={"/"}>
        <BackIcon />
        <span>Asosiy sahifaga o'tish</span>
      </Link>
      <div className="gradient"></div>
    </div>
  );
};

export default NotFound;
