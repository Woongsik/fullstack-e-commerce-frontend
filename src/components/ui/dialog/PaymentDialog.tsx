import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent,  
  DialogTitle,
  Typography
} from '@mui/material';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import { MUIButtonVariant, MUIColor } from '../../../misc/types/MUI';
import PaymentCheckout from '../paymentCheckout/PaymentCheckout';
import { StripeSecret } from '../../../misc/types/StripeSecret';
import { apiService } from '../../../services/APIService';
import { Address } from '../../../misc/types/Address';
import { Order, OrderRegistesr, OrderRegistesrItem } from '../../../misc/types/Order';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { CartItem } from '../../../misc/types/CartItem';

type Props = {
  show: boolean;
  onClose: (paid: boolean) => void
}

const publishKey: string = process.env.REACT_APP_STRIPE_PUPLISH_KEY as string;
const stripePromise = loadStripe(publishKey);

export default function PaymentDialog(props: Props) {
  const { show } = props;
  const [clientSecret, setClientSecret] = useState<string>('');
  const [pay, setPay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const { total, cartItems } = useSelector((state: AppState) => state.cartReducer);

  useEffect(() => {
    getStripeClient();
  }, []);

  const getStripeClient = async () => {
    try {
      const stripeSecret: StripeSecret = await apiService.getStripeClient(total);
      setClientSecret(stripeSecret.clientSecret);
    } catch (e) {
      const error = e as Error;
      setError(`Connecting to payment system failed, ${error.message}`);
    }
  }

  const handleCancel = () => {
    props.onClose(false);
  }

  const handlePayment = () => {
    setPay(true);
    setTimeout(() => {
      setPay(false);
    }, 500);
  }

  const registerOrder = async (paid: boolean, address: Address) => {
    const orderItems: OrderRegistesrItem[] = cartItems.map((item: CartItem) => ({
      ...item,
      product: item.item._id
    }));
 
    const newOrderInfo: OrderRegistesr = {
      items: orderItems,
      totalPrice: total,
      shippingAddress: address,
      payment: paid
    }
 
    return await apiService.registerOrder(newOrderInfo);
  }
   
  const handlePaymentResult = async (paid: boolean, address: Address) => {
    if (paid && address) {
      try {
        await registerOrder(paid, address);
        props.onClose(paid);
      } catch (e) {
        const error = e as Error;
        setError(`Cannot create order, ${error.message}`);
      }
    }
  }

  return (
    <React.Fragment>
      <Dialog
        open={show}
        onClose={handleCancel}
        scroll={'paper'}>
        <DialogTitle>
          Payment
        </DialogTitle>
        <DialogContent dividers={true}>
        { clientSecret &&
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentCheckout 
              pay={pay}
              onPaymentResult={handlePaymentResult} />
          </Elements>
        }

        { error && 
          <Typography color={'red'} my={4}>
            {error}
          </Typography>}  
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Cancel</Button>
          <Button onClick={handlePayment} variant={MUIButtonVariant.CONTAINED} color={MUIColor.PRIMARY}>Pay</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
