import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addcurrentCategory } from "../redux/features/productSlice";

const SategorySearchCompo = () => {
  const [visible, setVisibel] = useState(false);
  const categories = useSelector((state) => state.productReducer.categories);
  const currentCategory = useSelector(
    (state) => state.productReducer.currentCategory
  );
  const dispatch = useDispatch();
  const innerRef = useRef();

  useEffect(() => {
    document.addEventListener("click", handleClick);
    console.log("component mounted");
    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        setVisibel(false);
      } else {
        showDropdown();
      }
    }
  }, []);

  const showDropdown = () => {
    setVisibel((PrevState) => !PrevState);
  };

  const setCurrentCategory = (item) => {
    dispatch(addcurrentCategory(item));
  };

  return (
    <>
      <form ref={innerRef} className="max-w-lg mx-auto">
        <div className="flex relative">
          <button
            id="dropdown-button"
            data-dropdown-toggle="dropdown"
            className="min-w-40 flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200  focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600"
            type="button"
          >
            {currentCategory === "all" ? "All Categories" : currentCategory}{" "}
            <svg
              className="w-2.5 h-2.5 ms-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>
          <div
            id="dropdown"
            className={`z-10 ${
              visible ? "" : "hidden"
            } absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdown-button"
            >
              <li>
                <button
                  type="button"
                  onClick={() => setCurrentCategory("all")}
                  className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  All categories
                </button>
              </li>
              {categories.map((item) => (
                <li key={item}>
                  <button
                    type="button"
                    onClick={() => setCurrentCategory(item)}
                    className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative w-full">
            <input
              type="search"
              id="search-dropdown"
              className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
              placeholder="Search ..."
              required
            />
            <button
              type="submit"
              className="absolute  top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default SategorySearchCompo;
