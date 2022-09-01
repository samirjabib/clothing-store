import { useContext } from "react";

import { 
    Arrow,
    BaseSpan,
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from './checkout-item.styles'

import { CartContext } from "../../contexts/cart.context";

const CheckoutItem = ({ cartItem }) => {


    console.log(cartItem)

    const { name, imageUrl, price, quantity} = cartItem;

    const { addItemToCart, removeItemToCart, clearItemFromCart } = useContext(CartContext)

   
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemToCart(cartItem)
    const clearItemHandler = () => clearItemFromCart(cartItem)


    return (

        <CheckoutItemContainer>
            <ImageContainer>
            <img src={imageUrl} alt={`${name}`} />
            </ImageContainer>
            <BaseSpan> {name} </BaseSpan>
            <Quantity>
                <Arrow className='arrow' onClick={removeItemHandler}>
                &#10094;
                </Arrow>
                <Value className='value'>{quantity}</Value>
                <Arrow className='arrow' onClick={addItemHandler}>
                &#10095;
                </Arrow>
            </Quantity>
            <BaseSpan className='price'> {price}</BaseSpan>
            <RemoveButton onClick={clearItemHandler}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    );
};

export default CheckoutItem;