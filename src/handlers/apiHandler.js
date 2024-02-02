import axios from "axios";
import { useDispatch } from "react-redux";
import { getProductList, getProductListFromLocalStorage } from "../store";

const ProductApiHanlder = () => {
  const dispatch = useDispatch();
  // Get product data and dispatch
  // We can handle try error while using the function fetchProductList
  const fetchProductList = async () => {
    try {
      // Check if product list is present in localStorage
      const localStorageProductList = getProductListFromLocalStorage();

      if (localStorageProductList) {
        // If present, dispatch the action with the data from localStorage
        dispatch(getProductList(localStorageProductList));
        return;
      }

      // If not present, make an API call
      const response = await axios.get("https://fakestoreapi.com/products");
      const productList = response.data;

      // Set the response to localStorage
      localStorage.setItem("productlist", JSON.stringify(productList));

      // Dispatch the action with the product list
      dispatch(getProductList(productList));
    } catch (error) {
      console.error("Error fetching product list:", error);
    }
  };

  return { fetchProductList };
};

export default ProductApiHanlder;
