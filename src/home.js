import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/features/cartSlice";
import { addCategories, addProducts } from './redux/features/productSlice'
import styled from "styled-components";
import useAuth from "./hooks/useAuth";
import { addcurrentCategory } from "./redux/features/productSlice";

import RatingStar from './components/RatingStar'
const StyleComp = styled.div`
  
  
  
  
  .container {
    display: flex;
    align-items: center;
    flex-direction: row;
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
  
  .card button {
    border: none;
    outline: 0;
    padding: 12px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 80%;
    font-size: 18px;
  }
  
  .checkout {
    border: none;
    outline: 0;
    padding: 12px;
    color: white;
    background-color: #000;
    text-align: center;
    cursor: pointer;
    width: 20%;
    font-size: 18px;
    margin: top 2px;
  }
  
  .checkout a {
    color: #cbe4de;
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
  
  .buttons {
    position: relative;
    padding-top: 30px;
    margin-right: 60px;
  }
  
  .delete-btn,
  .like-btn {
    display: inline-block;
    Cursor: pointer;
  }
  
  .delete-btn {
    width: 18px;
    height: 17px;
  }
  
  .like-btn {
    position: absolute;
    top: 9px;
    left: 15px;
    /* background: url('twitter-heart.png'); */
    width: 60px;
    height: 60px;
    background-size: 2900%;
    background-repeat: no-repeat;
  }
  
  .image {
    margin-right: 50px;
  }
  
  .description {
    padding-top: 10px;
    margin-right: 60px;
    width: 115px;
  }
  
  .description span {
    display: block;
    font-size: 14px;
    color: #43484D;
    font-weight: 400;
  }
  
  .description span:first-child {
    margin-bottom: 5px;
  }
  
  .description span:last-child {
    font-weight: 300;
    margin-top: 8px;
    color: #86939E;
  }
  
  .quantity {
    padding-top: 20px;
    margin-right: 60px;
  }
  
  .quantity input {
    border: none;
    text-align: center;
    width: 32px;
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
  }
  
  button[class*=btn] {
    width: 30px;
    height: 30px;
    background-color: #E1E8EE;
    border-radius: 6px;
    border: none;
    cursor: pointer;
  }
  
  .minus-btn img {
    margin-bottom: 3px;
  }
  
  .plus-btn img {
    margin-top: 2px;
  }
  
  button:focus,
  input:focus {
    outline: 0;
  }
  
  .total-price {
    width: 83px;
    padding-top: 27px;
    text-align: center;
    font-size: 16px;
    color: #43484D;
    font-weight: 300;
  }`

const Home = () => {
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.productReducer.allProducts);
  const currentCategory = useSelector((state) => state.productReducer.currentCategory);
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
  };


  return (
    <StyleComp>
      <div className='container'>
        {showProducts && showProducts.map((item, index) => {
          return (<div key={item.id} className="card">
            <Link to={{ pathname: `/product/${item.id}` }}>
              <img src={item.image} alt="Denim Jeans" style={{ width: "100%" }} />
            </Link>
            <Link>{item.title}</Link>

            <p className="price">&#x20B9; {item.price}</p>
            <p className='desc'>{item.description}</p>
            <p><button onClick={() => addCart(item)}>Add to Cart</button></p>
          </div>)
        })}

      </div>
    </StyleComp>
  )
}

export default Home