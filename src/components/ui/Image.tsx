import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

type Props = {
  src: string,
  alt: string
}

export default function Image(props: Props) {
  const [error, setError] = useState<boolean>(false);
  const { src, alt } = props;
  const handleError = () => {
    setError(true);
  }

  return (
    <>
      { error ? 
      <Skeleton animation="wave" variant="rectangular" width={'100%'} height={'100%'} />
      : 
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        height={'auto'}
        width={'100%'} />
      }
    </>
    
  )
}
