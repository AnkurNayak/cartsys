/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import ProductApiHanlder from "../../handlers/apiHandler";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  additemtoCart,
  getProductList,
  getProductListFromLocalStorage,
} from "../../store";
import { useSearchContext } from "../../handlers/useSearchContext";
import Button from "../../components/Button";

function ProductList() {
  const { fetchProductList } = ProductApiHanlder();
  const dispatch = useDispatch();
  const { searchInput } = useSearchContext();

  useEffect(() => {
    const localStorageProductList = getProductListFromLocalStorage();

    if (localStorageProductList) {
      // If product list is present in localStorage, dispatch the action
      dispatch(getProductList(localStorageProductList));
    } else {
      // If localStorage is empty, fetch the data
      try {
        fetchProductList();
      } catch (err) {
        console.error("Error fetching product list:", err);
      }
    }
  }, []);

  const selectorProductList = useSelector((state) => state.productlist);
  const selectorCart = useSelector((state) => state.cartitems);

  // State to keep track of the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addtoCart = (item) => {
    dispatch(additemtoCart(item));
  };

  // Set of unique product categories
  const productCategory = new Set(
    selectorProductList.map((prod) => prod.category)
  );

  // Function to handle category button click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on search input and selected category
  const filteredProductList = selectorProductList.filter((prod) => {
    const isMatchingSearch = Object.values(prod).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchInput.toLowerCase())
    );

    const isMatchingCategory =
      selectedCategory === "All" || prod.category === selectedCategory;

    return isMatchingSearch && isMatchingCategory;
  });

  return (
    <div className="h-full">
      <div className="px-4 py-2 flex items-center gap-3">
        {/* Button for All category */}
        <Button
          onClick={() => handleCategoryClick("All")}
          className={`${
            selectedCategory === "All" ? "bg-orange-800" : "bg-orange-600"
          } p-1 text-white rounded-md`}
        >
          All
        </Button>
        {/* Buttons for each unique product category */}
        {Array.from(productCategory).map((category) => (
          <Button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`${
              selectedCategory === category ? "bg-orange-800" : "bg-orange-600"
            } p-1 text-white rounded-md`}
          >
            {category}
          </Button>
        ))}
      </div>
      <div className="flex flex-col p-4 gap-3">
        {/* Render filtered product cards */}
        {filteredProductList.map((prod) => (
          <Card
            key={prod.id}
            id={prod}
            img={prod.image}
            productName={prod.title}
            productdesc={prod.description}
            price={prod.price}
            rating={prod?.rating}
            addtoCart={addtoCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
