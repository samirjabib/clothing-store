import { PaymentFormContainer, FormContainer, PaymentButton } from './payment-form.styles'

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

import Button , { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { useSelector } from 'react-redux';



const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();


    const paymentHandler = async (e) => {
        e.preventDefault();

        if(!stripe || !elements) {
            return;
        }

        const response = await fetch('/netlify/functions/create-payment-intent', {
            method:'post',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({ amount: 10000 })
        }).then((res) => {
            return res.json();
        });

        console.log(response)

    };

    return (
        <PaymentFormContainer>
            <FormContainer onSubmit={ paymentHandler }>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <PaymentButton buttonType={BUTTON_TYPE_CLASSES.inverted }> Pay now </PaymentButton>
            </FormContainer>
        </PaymentFormContainer>
    );
};

export default PaymentForm;