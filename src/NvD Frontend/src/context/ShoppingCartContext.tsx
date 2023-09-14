import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import Cart from "../template/Cart";
import AxiosRepository from "../axiosRepo/axiosRepository";

type ShoppingCartProviderProps = {
    children: ReactNode
}
type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number, price: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

type CartItem = {
    id: number
    quantity: number
    price: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)


export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}



export function ShoppingCartProvider ( {children} : ShoppingCartProviderProps ) {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0)

    useEffect(() => {
        const fetchCart = async () => {
            try{
                const updateCart = await AxiosRepository.updateCart(1)
                .then(result => {
                    let listofProducts = result.data.productList;
                    listofProducts.forEach((prod: any) => {
                        increaseCartQuantity(prod.id, prod.price)
                    });
                })
            }
            catch(e) {
                console.log(e)
            }
        }
        fetchCart()
    }, [])


    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        // @ts-ignore
        return cartItems.find(item => item.id === id).quantity || 0
    }

    function increaseCartQuantity(id: number, price: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id) == null) {
                return [...currItems, {id, price, quantity: 1}]

            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity + 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    function decreaseCartQuantity(id: number) {
        setCartItems(currItems => {
            if(currItems.find(item => item.id === id)?.quantity === 1) {
                return currItems.filter(item => item.id !== id)
            } else {
                return currItems.map(item => {
                    if(item.id === id) {
                        return {...item, quantity: item.quantity - 1}
                    } else {
                        return item
                    }
                })
            }
        })
    }

    
        
    const removeFromCart = async (id: number) => {
        try{
            const removeItemFromCart = await AxiosRepository.removeProductFromCart(id, 1)
        }
        catch (e) {
            console.log(e)
        }
        
    }


    return <ShoppingCartContext.Provider value ={{getItemQuantity, increaseCartQuantity, decreaseCartQuantity, removeFromCart, cartItems, cartQuantity, openCart, closeCart}} >
        {children}
        <Cart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}