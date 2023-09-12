import React, {useState} from "react";
import {useShoppingCart} from "../context/ShoppingCartContext";
import CartItem from "./CartItem";
import {Modal, ModalBody, Stack} from "react-bootstrap";
import axiosRepository from "../axiosRepo/axiosRepository";

function Cart({ isOpen }) {
    const {closeCart, cartItems, cartQuantity} = useShoppingCart()
    //const [paymentURL, setPaymentURL] = useState("");

    const getStripe = async () => {
        try {
            const response = await axiosRepository.toPaymentPage(cartItems).then(result => window.location = result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal show={isOpen} onHide={closeCart} size="lg">
            <ModalBody>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <p className="mb-1">Shopping cart</p>
                        <p className="mb-0">You have {cartQuantity} items in your cart</p>
                    </div>
                </div>
                <Stack gap={1}>
                    {cartItems.map(item => (
                        <CartItem key={item.id} id={item.id} quantity={item.quantity}/>
                    ))}
                        <button type="submit" onClick={getStripe} className="btn btn-outline-dark mt-3" >
                            Checkout
                        </button>
                </Stack>
            </ModalBody>
        </Modal>
    );
}

export default Cart;