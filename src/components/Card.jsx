/* eslint-disable react/prop-types */
import { generateStars } from "../handlers/useSearchContext";
function Card({ img, productName, productdesc, price, rating, addtoCart, id }) {
  return (
    <div className="flex items-center px-4 bg-white gap-2 max-[540px]:flex-col shadow-md">
      <div className="overflow-hidden flex h-full min-w-40">
        <img src={img} alt={productName} className="h-40 w-40 object-contain" />
      </div>
      <div className="flex flex-col ml-4">
        <div
          className="font-bold text-xl hover:text-orange-600 cursor-pointer"
          onClick={() => addtoCart(id)}
        >
          {productName}
        </div>
        <div className="flex items-center">
          {generateStars(rating.rate)}
          <span className="ml-1">{rating.rate}</span>
        </div>
        <div>{rating.count}+ bought in past month</div>
        <div className="text-gray-700 flex">
          ₹<span className="text-2xl font-semibold text-black">{price}</span>
        </div>
        <div>{productdesc}</div>
      </div>
    </div>
  );
}

export default Card;
