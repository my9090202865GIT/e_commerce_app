import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/features/cartSlice";
import { addCategories, addProducts } from '../redux/features/productSlice'
import styled from "styled-components";
import useAuth from "../hooks/useAuth";
import { addcurrentCategory } from "../redux/features/productSlice";
import toast, { Toaster } from 'react-hot-toast';

import RatingStar from '../components/RatingStar'
const StyleComp = styled.div`
  
  .container {
    display: flex;
    align-items: center;
    flex-cdirection: row;
    flex-wrap: wrap;
  }
  
  .card {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    max-width: 300px;
    margin: auto;
    text-align: center;
    font-family: arial;
    /* overflow: hidden; */
  }
  
  .desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .price {
    color: grey;
    font-size: 22px;
  }
  
  
  /* cart styling */
  .card button:hover {
    opacity: 0.7;
  }
  

  .title {
    height: 60px;
    border-bottom: 1px solid #E1E8EE;
    padding: 20px 30px;
    color: #5E6977;
    font-size: 18px;
    font-weight: 400;
  }
  
  .item {
    padding: 20px 30px;
    height: 120px;
    display: flex;
  }
  
  .item:nth-child(3) {
    border-top: 1px solid #E1E8EE;
    border-bottom: 1px solid #E1E8EE;
  }
  
  
  imag {
    margin-right: 50px;
  }

  button:focus,
  input:focus {
    outline: 0;
  }
  `

const Home = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const currentCategory = useSelector((state) => state.productReducer.currentCategory);
  const logggedIn = useSelector((state) => state.authReducer.isLoggedIn);
  const [showProducts, setshowProducts] = useState()
  const { requireAuth } = useAuth();

  useEffect(() => {
    const fetchProducts = () => {
      fetch('https://fakestoreapi.com/products/')
        .then(res => res.json())
        .then(json => {
          dispatch(addProducts(json));
          setshowProducts(json);

        })
    }
    const fetchCategories = () => {
      fetch("https://fakestoreapi.com/products/categories")
        .then((res) => res.json())
        .then((data) => {
          dispatch(addCategories(data));
          dispatch(addcurrentCategory("all"))
        });
    };
    fetchProducts();
    fetchCategories();
  }, [])

  useEffect(() => {
    if (currentCategory !== "all") {
      const updated = allProducts.filter((pro) => pro.category === currentCategory);
      setshowProducts(updated);
      console.log("currentCategory after filtered", updated,)
    } if (currentCategory == "all") {
      setshowProducts(allProducts);
    }
  }, [currentCategory, allProducts])

  const addCart = (item) => {
    requireAuth(() => dispatch(addToCart(item)));
    if (logggedIn) {
      toast.success("your order has been confirmed");
    }

  };


  return (
    // <StyleComp>
    <div className='container flex flex-wrap mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {showProducts && showProducts.map((item, index) => {
        return (
          <div key={item.id} class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            {/* <Link to={{ pathname: `/product/${item.id}` }} >
              <img class="p-8 rounded-t-lg w-full h-80" src={item.image} alt="product image" />
            </Link> */}
            <Link to={{ pathname: `/product/${item.id}` }} >
              <div class="rounded-t-lg h-80 card-img" style={{backgroundImage: "url("+item.image+")"}}></div>
              {/* <img class="p-8 rounded-t-lg w-full h-80" src={item.image} alt="product image" /> */}
            </Link>
            <div class="px-5 pb-5">
              <Link to={{ pathname: `/product/${item.id}` }}>
                <h5 class="text-xl truncate font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
              </Link>
              <div class="flex items-center mt-2.5 mb-5">
                <RatingStar rating={item?.rating.rate}></RatingStar>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base	 font-bold text-gray-900 dark:text-white">&#x20B9; {item.price}</span>
                <button onClick={() => addCart(item)} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Add to cart</button>
              </div>
            </div>
          </div>
          // <div key={item.id} className="card aspect-w-3 aspect-h-4">
          //   <Link to={{ pathname: `/product/${item.id}` }}>
          //     <img src={item.image} className="w-full h-48 " alt={item.name} style={{ width: "100%" }} />
          //   </Link>
          //   <Link to={{ pathname: `/product/${item.id}` }}>
          //   <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
          //   </Link>
          //   <p className="price">&#x20B9; {item.price}</p>
          //   {/* <p className='desc'>{item.description}</p> */}
          //   <button
          //     type="button"
          //     className="flex items-center space-x-2 hover:bg-blue-500 text-white py-2 px-4 rounded bg-pink-500"
          //     onClick={() => addCart(item)}
          //     data-test="add-cart-btn"
          //   >
          //     <span>ADD TO CART</span>
          //   </button>
          // </div>
        )
      })}

      <Toaster />
    </div>
    // </StyleComp>
  )
}

export default Home