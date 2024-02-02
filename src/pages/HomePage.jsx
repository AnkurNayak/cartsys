import { Outlet, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import CartSVG from "../assets/cart.svg";
import { useSelector } from "react-redux";
function HomePage() {
  const navigate = useNavigate();
  // Get Total Number of Items From LocalStorage
  // Redux will reset state
  const totalItems = useSelector((state) => state.cartitems.totalItems);
  return (
    <div className="h-full">
      <div className="flex items-center bg-[#131921] p-4 gap-3">
        <div className="w-full">
          <SearchBar />
        </div>
        <div
          className="relative cursor-pointer"
          onClick={() => navigate("/cart")}
        >
          <div className="badge badge-primary badge-xs absolute">
            {totalItems}
          </div>
          <img src={CartSVG} alt="cart" className="h-8 w-8" />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default HomePage;
