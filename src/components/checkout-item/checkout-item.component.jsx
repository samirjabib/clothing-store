
import { useDispatch, useSelector } from 'react-redux';

import {
    addItemToCart,
    clearItemFromCart,
    removeItemFromCart
} from '../../store/cart/cart.actions';

import { 
    Arrow,
    BaseSpan,
    CheckoutItemContainer,
    ImageContainer,
    Quantity,
    RemoveButton,
    Value
} from './checkout-item.styles'
import { selectCartItems } from '../../store/cart/cart.selector';




const CheckoutItem = ({ cartItem }) => {



    const { name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
   
    const clearItemHandler = () =>
        dispatch(clearItemFromCart(cartItems, cartItem));

    const addItemHandler = () => 
        dispatch(addItemToCart(cartItems, cartItem));

    const removeItemHandler = () =>
        dispatch(removeItemFromCart(cartItems, cartItem));

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