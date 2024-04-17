import React, { useEffect, useState } from 'react';
import { 
  Box,
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

type Props = {
  show: boolean;
  onClose: (paid: boolean, address?: Address) => void
}

const publishKey: string = process.env.REACT_APP_STRIPE_PUPLISH_KEY as string;
const stripePromise = loadStripe(publishKey);

export default function PaymentDialog(props: Props) {
  const { show } = props;
  const [clientSecret, setClientSecret] = useState<string>('');
  const [pay, setPay] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    getStripeClient();
  }, []);

  const getStripeClient = async () => {
    try {
      const stripeSecret: StripeSecret = await apiService.getStripeClient();
      setClientSecret(stripeSecret.clientSecret);
    } catch (e) {
      setError('Connecting to payment system failed! Please try again later!')
    }
  }

  const handleCancel = () => {
    props.onClose(false);
  }

  const handlePayment = () => {
    setPay(!pay);
  }

  const handlePaymentResult = (paid: boolean, address?: Address) => {
    if (paid) {
      props.onClose(paid, address);
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
