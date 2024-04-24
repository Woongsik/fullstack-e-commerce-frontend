import { Box, CircularProgress, TextField, Typography, styled } from '@mui/material';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentElement } from '@stripe/react-stripe-js';
import { StripeError, PaymentIntentResult } from '@stripe/stripe-js';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { AppState } from '../../../redux/store';
import { SubmitHandler, useForm } from 'react-hook-form';
import CenteredContainer from '../layout/CenteredContainer';
import { Address } from '../../../misc/types/Address';

type Props = {
  pay: boolean;
  onPaymentResult: (paid: boolean, address: Address) => void
}

const TotalTitile = styled('h3')({
  textAlign: 'right',
  margin: '0 0 10px 0'
});

export default function PaymentCheckout(props: Props) {
  const { pay } = props;
  const hiddenInput = useRef<HTMLInputElement | null>(null);
  const stripe = useStripe();
  const elements = useElements();

  const { register, handleSubmit, formState: { errors } } = useForm<Address>();
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const { total } = useSelector((state: AppState) => state.cartReducer);

  useEffect(() => {
    if (pay) {
      hiddenInput.current?.click();
    }
  }, [pay]);
  
  const onSubmit: SubmitHandler<Address> = async (data: Address) => {
    // Check the address from the ourside
    // Then handel payment, that will check payment fields
    const paid: boolean = await handlePayment();
    if (paid) {
      props.onPaymentResult(paid, data);
    }
  }

  const handlePayment = async (): Promise<boolean> => {
    if (!stripe || !elements) {
      return Promise.resolve(false);
    }
    
    setIsProcessing(true);

    if (stripe) {
      const response: PaymentIntentResult = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/cart`,
        },
        redirect: 'if_required'
      });

      if (response.paymentIntent && response.paymentIntent.status === 'succeeded') {
        return true;
      } else if (response.error) {
        const error: StripeError = response.error;
        let message: string = 'An unexpected error occured, please try again later!';
        if (error.type === "card_error" || error.type === "validation_error") {
          message = 'The information of the card is not valid!';
          if (error.message) {
            message = error.message;
          }
        } 
        setMessage(message);
      }
      setIsProcessing(false);
    }

    return Promise.resolve(false);
  }

  return (
    <CenteredContainer>
      <Box component={'form'} width={'100%'} onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <TotalTitile>Total: € {total}</TotalTitile>
        </Box>

        <Box>
          <PaymentElement />
        </Box>

        <Box width={'100%'} my={2}>
          <Typography my={1}>
            Shipping address
          </Typography>

          <TextField fullWidth
            {...register("street", { required: true, pattern: /^[A-Za-z0-9?.,=_@&\- ]+$/i }) }
            error={Boolean(errors.street)}
            label="Street"
            helperText={errors.street && 'Only letters, specail charater(?.,=_@&-) accepted'} />

          <Box my={2}>
            <TextField 
              {...register("postnumber", { required: true, pattern: /^[0-9]{5,5}$/ }) }
              error={Boolean(errors.postnumber)}
              label="Post number"
              helperText={errors.postnumber && 'Only numbers, 5 digits'} />

            <TextField
              {...register("city", { required: true, pattern: /^[A-Za-z0-9.,_&\- ]+$/i }) }
              error={Boolean(errors.city)}
              label="City"
              helperText={errors.city && 'Only letters but (.,_-&) accepted'}
              sx={{ marginLeft: 1}} />
          </Box>
          
          <TextField fullWidth
            {...register("country", { required: true, pattern: /^[A-Za-z0-9.,_&\- ]+$/i  }) }
            error={Boolean(errors.country)}
            label="Country"
            defaultValue={'Finland'}
            helperText={errors.country && 'Only letters but (.,_-&) accepted'} />
        </Box>
        
        <input ref={hiddenInput} type={'submit'} style={{ display: 'none'}} />
        
        { !isProcessing && message && 
        <Typography color={'red'} my={2}>
          {message}
        </Typography>
        }
      </Box>
      { isProcessing  && 
        <Box position={'absolute'}>
          <CircularProgress />
        </Box> 
      }
    </CenteredContainer>
  )
}
