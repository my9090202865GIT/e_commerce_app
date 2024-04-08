import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToCart, setCartState } from "../redux/features/cartSlice";
import RatingStar from "../components/RatingStar";
import toast ,{ Toaster } from "react-hot-toast";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useDispatch, useSelector } from "react-redux";
import React from "react";

const lorem =
  "It is important to take care of the patient, to be followed by the patient, but it will happen at such a time that there is a lot of work and pain. For to come to the smallest detail, no one should practice any kind of work unless he derives some benefit from it. Do not be angry with the pain in the reprimand in the pleasure he wants to be a hair from the pain in the hope that there is no breeding. Unless they are blinded by lust, they do not come forth; they are in fault who abandon their duties and soften their hearts, that is, their labors.";

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
