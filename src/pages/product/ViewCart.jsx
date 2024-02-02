import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { generateStars } from "../../handlers/useSearchContext";
import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
import { itemPurchased } from "../../store";

function ViewCart() {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cartitems);
  const dispatch = useDispatch();
  // Initialize the processedCartItems state with the transformed cart items from Redux
  const [processedCartItems, setProcessedCartItems] = useState(() =>
    Object.values(
      cartItems.itemList.reduce(
        (acc, item) => ({
          ...acc,
          [item.id]: {
            ...item,
            quantity: (acc[item.id]?.quantity || 0) + 1,
            totalPrice: (acc[item.id]?.totalPrice || 0) + item.price,
          },
        }),
        {}
      )
    )
  );

  // Handle changes in quantity for a specific item in the cart
  const handleQuantityChange = (itemId, newQuantity) => {
    // Update the local state with the modified quantity and total price
    const updatedCartItems = processedCartItems.map((item) =>
      item.id === itemId
        ? {
            ...item,
            quantity: newQuantity,
            totalPrice: newQuantity * item.price,
          }
        : item
    );
    setProcessedCartItems(updatedCartItems);
  };

  // Calculate the total quantity of items in the cart
  const totalQuantity = processedCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Calculate the subtotal of the items in the cart
  const subtotal = processedCartItems.reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  // Buy now
  const handlebuyNow = () => {
    // Navigate to product list;
    navigate("/");
    // dispatch
    dispatch(itemPurchased());
  };

  return (
    <div className="p-4 flex max-[540px]:flex-col gap-4">
      <div className="flex flex-col flex-1 p-4 bg-white shadow-md">
        <div className="text-3xl mb-2">Shopping Cart</div>
        {processedCartItems.length > 0 ? (
          processedCartItems.map((item, index) => (
            <div key={index} className="flex h-full w-full py-4 items-center">
              <img
                src={item.image}
                className="h-40 max-w-40 object-contain"
                alt={item.title}
              />
              <div className="flex flex-col">
                <div className="text-xl">{item.title}</div>
                <p className="flex">
                  {generateStars(item.rating.rate)} {item.rating.rate}
                </p>
                <p>{item.rating.count}+ bought in past month</p>
                <div>
                  <div className="p-1 rounded-md bg-slate-300 inline-flex">
                    Quantity:
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="bg-slate-300 focus:outline-none"
                    >
                      {[...Array(item.quantity).keys()].map((optionValue) => (
                        <option key={optionValue + 1} value={optionValue + 1}>
                          {optionValue + 1}
                        </option>
                      ))}
                    </select>
                  </div>

                  <p className="flex">
                    Total Price: ₹
                    <span className="text-lg">
                      {item.totalPrice.toFixed(2)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="italic">
            Your shopping cart is currently empty. Kindly explore our product
            list and add items to your cart for an enhanced shopping experience.
          </div>
        )}
      </div>
      <div className=" bg-white shadow-md p-4 text-xl flex flex-col">
        <p className="text-green-600 flex text-lg items-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
              clipRule="evenodd"
            />
          </svg>
          Your order is eligible for FREE Delivery.
        </p>
        <div className="flex">
          <p>Subtotal ({totalQuantity} items): ₹</p>
          <span className="font-semibold text-4xl">{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex flex-col mt-10">
          <Button
            className="bg-yellow-400 p-1 rounded-sm w-full text-[16px] shadow-sm cursor-pointer"
            onClick={() => handlebuyNow()}
          >
            Buy Now
          </Button>
        </div>
        <p className="p-4 text-sm italic max-w-80">
          {/* eslint-disable-next-line react/no-unescaped-entities */}
          Clicking "Buy Now" will initiate the purchase process, clearing the
          items from the cart by resetting the local storage, and seamlessly
          redirecting users to the product page.
        </p>
      </div>
    </div>
  );
}

export default ViewCart;
