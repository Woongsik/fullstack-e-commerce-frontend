import React, { useState } from 'react';
import { Skeleton } from '@mui/material';

type Props = {
  src: string,
  alt: string,
  borderRadius?: number
}

export default function UiImage(props: Props) {
  const [error, setError] = useState<boolean>(false);
  const { src, alt, borderRadius } = props;

  const handleLoad = (loaded: any) => {
    console.log('===image loaded', loaded);
    setError(false);
  }

  const handleError = () => {
    console.log('image load error');
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
        onLoad={handleLoad}
        onError={handleError}
        height={'auto'}
        width={'100%'}
        style={{ borderRadius: `${borderRadius}px` }} />
      }
    </>
  )
}
