import NotFoundImage from "../assets/images/pagenotfound.png";
import { Link } from "react-router-dom";
const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex items-center justify-center">
        <img src={NotFoundImage} alt="error404" />
      </div>
      <div>
        <Link to="products">
          <button className="p-3 bg-indigo-600 rounded-full text-white">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
