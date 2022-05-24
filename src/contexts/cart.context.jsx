import { createContext, useState, useEffect } from "react";

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen : () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartCount: 0,
    reduceCartItem: () => {},
    removeCartItem: () => {},
    totalPrice: 0
})

export const addCartItem = (cartItems, productToAdd) => {
    // find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id
    })

    if(existingCartItem){
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        })
    }
    // if found, increment quantity

    // return new array with modified cartitems/ new cart items
    return [...cartItems, { ...productToAdd, quantity: 1}]
}

export const reduceCartItem = (cartItems, productToReduce) => {
    // find if cart items contains product to add
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToReduce.id
    })

    if(existingCartItem.quantity === 1) {
        return cartItems.filter(cartItem => cartItem.id !== productToReduce.id)
    }

    return cartItems.map(cartItem => {
        return cartItem.id === productToReduce.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem
    })

    // if(existingCartItem){
    //     const newCartItems = []
    //     cartItems.map((cartItem) => {
    //         if(cartItem.id === productToReduce.id) {
    //             if(cartItem.quantity - 1 !== 0) {
    //                 newCartItems.push({...cartItem, quantity: cartItem.quantity - 1})
    //             }
    //         }else {
    //             newCartItems.push(cartItem)
    //         }
            
    //     })
    //     return newCartItems
    // }
    // if found, increment quantity

}

export const removeCartItem = (cartItems, productToBeRemoved) => {
    return cartItems.filter(cartItem => cartItem.id !== productToBeRemoved.id)
}

/*
    product {id, name, price, imageUrl}

    cartItem { id, name, price, imageUrl, quantity}

*/

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [cartCount, setCartCount] = useState(0)
    const [totalPrice, setTotalPrice] = useState(0)
    

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const reduceItemFromCart = (productToReduce) => {
        setCartItems(reduceCartItem(cartItems, productToReduce))
    }

    const removeItemFromCart = (productToBeRemoved) => {
        setCartItems(removeCartItem(cartItems, productToBeRemoved))
    }

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity
        }, 0)

        setCartCount(newCartCount)
    }, [cartItems])

    useEffect(() => {
        const totalPrice = cartItems.reduce((total, cartItem) => {
            return total + (cartItem.price * cartItem.quantity)
        }, 0)
        setTotalPrice(totalPrice)

    }, [cartItems])

    const value = { isCartOpen, setIsCartOpen,  cartItems , addItemToCart, cartCount, reduceItemFromCart, removeItemFromCart, totalPrice}
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

