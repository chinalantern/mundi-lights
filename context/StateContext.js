import React, { useState, createContext, useContext, useEffect } from 'react'
import { toast } from 'react-hot-toast'

const Context = createContext() // Hook

export const StateContext = ({ children }) => {
  const [showCart, setShowCart] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [totalPrice, setTotalPrice] = useState()
  const [totalQuantities, setTotalQuantities] = useState(0)
  const [qty, setQty] = useState(1)

  const onAdd = (product, quantity) => {
    const checkProductInCart = cartItems.find((item) => item.id === product.id)

    // Update shopper's total price tally
    setTotalPrice(
      (previousTotalPrice) => previousTotalPrice + product.price * quantity
    )
    // Update shopper's total items in cart tally
    setTotalQuantities(
      (previousTotalQuantities) => previousTotalQuantities + quantity
    )

    //   If the item already exists in customer cart
    if (checkProductInCart) {
      // Update the actual items in the cart itself
      const updatedCartItems = cartItems.map((cartProduct) => {
        // We dont need to add a duplicated product in the cart, instead increment the quantity of that item in the cart
        if (cartProduct._id === product._id)
          return {
            // An object wherein we spread the original object then update one of the properties (quantity) within
            ...cartProduct,
            quantity: cartProduct.quantity + quantity,
          }
      })

      setCartItems(updatedCartItems)

      //   The item doesn't already exists in customer cart
    } else {
      product.quantity = quantity
      setCartItems([...cartItems, { ...product }])
    }
    toast.success(`${qty} ${product.name} added to cart`)
  }

  const increaseQty = () => {
    setQty((previousQty) => previousQty + 1) // Passing setQty() a callback function
  }

  const decreaseQty = () => {
    setQty((previousQty) => {
      if (previousQty - 1 < 1) return 1

      return previousQty - 1
    }) // Passing setQty() a callback function
  }

  return (
    <Context.Provider
      value={{
              showCart,
          setShowCart,
        cartItems,
        totalPrice,
        totalQuantities,
        qty,
        increaseQty,
        decreaseQty,
        onAdd,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context)
