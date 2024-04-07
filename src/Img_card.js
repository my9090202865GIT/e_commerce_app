import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import RatingStar from './components/RatingStar'
import { Link } from 'react-router-dom';
const Img_card = () => {
    const allProducts = useSelector((state) => state.productReducer.allProducts);
    useEffect(() => console.log(allProducts), [])

    return (
        <div className='flex items-center flex-row flex-wrap'>
            {allProducts.map((item) => (
                <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <Link to={{pathname:`/product/:${item.id}`}}>
                        <img class="p-8 rounded-t-lg" src={item.image} alt="product image" />
                    </Link>
                    <div class="px-5 pb-5">
                        <a href="#">
                            <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{item.title}</h5>
                        </a>
                        <div class="flex items-center mt-2.5 mb-5">
                            
                            <RatingStar rating={item?.rating.rate}></RatingStar>
                        </div>
                        <div class="flex items-center justify-between">
                            <span class="text-3xl font-bold text-gray-900 dark:text-white">{item.price}</span>
                            <a href="#" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</a>
                        </div>
                    </div>
                </div>

            ))}
        </div>

    )
}

export default Img_card