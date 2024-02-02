/* eslint-disable react/prop-types */
import Input from "./Input";
import SearchSVG from "../assets/search.svg";
import { useSearchContext } from "../handlers/useSearchContext";

function SearchBar() {
  const { searchInput, setSearchInput } = useSearchContext();
  return (
    <div className="w-full">
      <form>
        <div className="bg-white rounded-lg overflow-hidden text-slate-700 flex w-full  items-center">
          <div className="flex items-center w-full">
            <div className="bg-orange-600">
              <img className="h-10 w-6 mx-2" src={SearchSVG} alt="search.ico" />
            </div>
            <Input
              className="flex w-full py-2 focus:outline-none bg-transparent whitespace-nowrap text-ellipsis overflow-hidden"
              type="text"
              placeholder="Search for a product...."
              inputValue={searchInput}
              handleInputValue={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
