import {  useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart } from "../redux/features/cartSlice";
import RatingStar from "../components/RatingStar";
import toast ,{ Toaster } from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useDispatch } from "react-redux";
import React from "react";

const SingleProduct = () => {
  const dispatch = useDispatch();
  const { productID } = useParams();
  const [product, setProduct] = useState();
  const [selectedImg, setSelectedImg] = useState();
  const { requireAuth } = useAuth();

  useEffect(() => {
    const fetchProductDetails = () => {
      fetch(`https://fakestoreapi.com/products/${productID}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setSelectedImg(data.image);
        });
    };
    fetchProductDetails();
  }, [productID]);


  const addCart = () => {
    requireAuth(() => {
      if (product)
        dispatch(
          addToCart(product)
        );
      toast.success("item added to cart successfully", {
        duration: 3000
      });
    });
  };


  return (
    <div className="container mx-auto pt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 px-4 font-karla">
        <div className="space-y-2">
          <img src={selectedImg} alt="selected" className="h-80" />
        </div>
        <div className="px-2">
          <h2 className="text-2xl">{product?.title}</h2>
          {product?.rating && <RatingStar rating={product?.rating.rate} />}
          <div className="mt-1">
            <h2 className="font-medium text-black-500 text-xl">&#x20B9; {product?.price}</h2>
          </div>
          <table className="mt-2">
            <tbody>
              <tr>
                <td className="pr-2 font-bold">Category</td>
                <td>{product?.category}</td>
              </tr>
            </tbody>
          </table>
          <div className="mt-2">
            <h2 className="font-bold">About the product</h2>
            <p className="leading-5">
              {product?.description}
            </p>
          </div>
          <div className="flex flex-wrap items-center mt-4 mb-2 space-x-2">
            <button
              type="button"
              className="flex items-center space-x-1 mb-2 hover:bg-pink-700 text-white p-2 rounded bg-blue-500"
              onClick={addCart}
            >
              <AiOutlineShoppingCart />
              <span>ADD TO CART</span>
            </button>
          </div>
        </div>

      </div>
      <hr className="mt-4" />
      <br />
      <Toaster />
    </div>
  );
};

export default SingleProduct;
