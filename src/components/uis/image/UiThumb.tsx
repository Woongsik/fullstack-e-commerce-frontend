import { Box } from '@mui/material'
import { RemoveCircle } from '@mui/icons-material';

type Props = {
  image: (string | ArrayBuffer | null);
  alt?: string;
  width: number;
  height: number;
  onClick: () => void;
}

export default function UiThumb(props: Props) {
  const { image, width, height, alt } = props; 
  return (
    <Box position={'relative'}>
      <Box width={width} height={height} marginRight={2} my={1}>
        <img src={image as string} width={'100%'} height={'100%'} alt={alt} />
      </Box>
      <Box onClick={() => props.onClick()} position={'absolute'} top={0} right={0} sx={{ cursor: 'pointer'}}>
        <RemoveCircle />
      </Box>
    </Box>
  )
}
