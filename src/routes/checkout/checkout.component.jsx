import './checkout.styles.scss'

import { CartContext } from '../../contexts/cart.context';
import { useContext } from 'react';




const Checkout =  () => {
    const { cartItems , removeItemToCart ,  addItemToCart } = useContext(CartContext);




    return(
        <div>
            <h1>im the checkout page</h1>
            <div>
            {cartItems.map( (cartItem) => {
                const { id, name, quantity } = cartItem;

                return(
                    <div key={ id }>
                        <h2>{ name }</h2>
                        <span>{ quantity }</span>
                        <br/>
                        <span onClick={ () => removeItemToCart(cartItem)}>DECREMENT</span>
                        <br/>
                        <span onClick={ () => addItemToCart( cartItem ) }>increment</span>
                    </div>
                )   
            })}
              
            </div>
        </div>
    )
}


export default Checkout;