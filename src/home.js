import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./redux/cartSlice";

const Home = () => {
    const [product, setProduct] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/')
            .then(res => res.json())
            .then(json => {
                setProduct(json)
                console.log(json)
            })
    }, [])

    const addCart = (item) => {
        dispatch(
            addToCart(item)
        );
        // alert("added to cart")
    };


    return (
        <div className='container'>
            {product.map((item, index) => {
                return (<div key={item.id} className="card">
                    <img src={item.image} alt="Denim Jeans" style={{ width: "100%" }} />
                    <h3>{item.title}</h3>
                    <p className="price">&#x20B9; {item.price}</p>
                    <p className='desc'>{item.description}</p>
                    <p><button onClick={() => addCart(item)}>Add to Cart</button></p>
                </div>)
            })}
            <button className='checkout'><Link to={{ pathname: "\cart" }}>Check out</Link></button>
        </div>
    )
}

export default Home