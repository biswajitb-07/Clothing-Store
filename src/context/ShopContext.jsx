import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const navigate = useNavigate();

    const addToCart = async (itemid, size) => {

        if (!size) {
            toast.error('Select Product Size');
            return;
        }

        if (size) {
            toast.success('Product added');
        }

        let cartData = structuredClone(cartItems);

        if (cartData[itemid]) {
            if (cartData[itemid][size]) {
                cartData[itemid][size] += 1;
            } else {
                cartData[itemid][size] = 1;
            }
        } else {
            cartData[itemid] = {};
            cartData[itemid][size] = 1;
        }

        setCartItems(cartData);
    };

    const updateQuantity = async (itemid, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemid][size] = quantity;

        setCartItems(cartData);
    }

    const getCartCount = () => {
        let totalCount = 0;
        for(const items in cartItems) {
            for(const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalCount;
    }

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]) {
                try {
                    if(cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const value = {
        products, currency, delivery_fee, search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity, getCartAmount, navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

