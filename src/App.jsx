/* eslint-disable no-unused-vars */
import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Loading Spinner
import Loading from "./components/Loading";
import { SearchProvider } from "./handlers/searchContext";

// Enable lazy Loading
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductList = lazy(() => import("./pages/product/ProductList"));
const ViewCart = lazy(() => import("./pages/product/ViewCart"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

function App() {
  return (
    <SearchProvider>
      <Router>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="" element={<HomePage />}>
              <Route index element={<Navigate replace to="products" />} />
              <Route path="products" element={<ProductList />} />
              <Route path="cart" element={<ViewCart />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </SearchProvider>
  );
}

export default App;
