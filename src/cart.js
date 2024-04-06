import React, { useEffect } from 'react'
import { useSelector } from "react-redux";

const Cart = () => {

    const allCartItems = useSelector(
        (state) => state.cartReducer.cartItems
    );
    useEffect(() => console.log(allCartItems))


    return (
        <div class="shopping-cart">

            <div class="title">
                Cart
            </div>


            {allCartItems.map((item) => {
                return <>
                    <div class="item">
                        <div class="buttons">
                            <span class="delete-btn"></span>
                            <span class="like-btn"></span>
                        </div>

                        <div class="image">
                            <img alt="" />
                        </div>

                        <div class="description">
                            <span>{item.title}</span>

                        </div>

                        <div class="quantity">
                            <button class="plus-btn" type="button" name="button">
                                <img src="plus.svg" alt="" />
                            </button>
                            <input type="text" name="name" value="1" />
                            <button class="minus-btn" type="button" name="button">
                                <img src="minus.svg" alt="" />
                            </button>
                        </div>

                        <div class="total-price">&#x20B9;{item.price}</div>
                    </div>
                </>
            })}
            <div><span>Total-{allCartItems.reduce()}</span></div>

            {/* <!-- Product #2 --> */}
            {/* <div class="item">
                <div class="buttons">
                    <span class="delete-btn"></span>
                    <span class="like-btn"></span>
                </div>

                <div class="image">
                    <img src="item-2.png" alt="" />
                </div>

                <div class="description">
                    <span>Maison Margiela</span>
                    <span>Future Sneakers</span>
                    <span>White</span>
                </div>

                <div class="quantity">
                    <button class="plus-btn" type="button" name="button">
                        <img src="plus.svg" alt="" />
                    </button>
                    <input type="text" name="name" value="1" />
                    <button class="minus-btn" type="button" name="button">
                        <img src="minus.svg" alt="" />
                    </button>
                </div>

                <div class="total-price">$870</div>
            </div> */}

            {/* <!-- Product #3 --> */}
            {/* <div class="item">
                <div class="buttons">
                    <span class="delete-btn"></span>
                    <span class="like-btn"></span>
                </div>

                <div class="image">
                    <img src="item-3.png" alt="" />
                </div>

                <div class="description">
                    <span>Our Legacy</span>
                    <span>Brushed Scarf</span>
                    <span>Brown</span>
                </div>

                <div class="quantity">
                    <button class="plus-btn" type="button" name="button">
                        <img src="plus.svg" alt="" />
                    </button>
                    <input type="text" name="name" value="1" />
                    <button class="minus-btn" type="button" name="button">
                        <img src="minus.svg" alt="" />
                    </button>
                </div>

                <div class="total-price">$349</div>
            </div> */}
        </div>
    )
}

export default Cart