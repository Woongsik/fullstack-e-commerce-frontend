import { useState } from 'react';
import UiBrokenImage from './UiBrokenImage';

type Props = {
  src: string,
  alt: string,
  borderRadius?: number
}

export default function UiImage(props: Props) {
  const [error, setError] = useState<boolean>(false);
  const { src, alt, borderRadius } = props;

  const handleError = () => {
    setError(true);
  }

  return (
    <>
    {error ?
      <UiBrokenImage />
      :
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onError={handleError}
        height={'100%'}
        width={'100%'}
        style={{ 
          borderRadius: `${borderRadius}px`,
          objectFit: 'cover' 
        }} />
    }
    </>
  )
}
