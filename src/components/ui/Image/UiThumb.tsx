import { Box } from '@mui/material'

type Props = {
  image: (string | ArrayBuffer | null);
  alt?: string;
  width: number;
  height: number;
  buttonTitle: string;
  onClick: () => void;
}

export default function UiThumb(props: Props) {
  const { image, width, height, buttonTitle } = props; 
  return (
    <Box>
      <Box width={width} height={height} marginRight={2} my={1}>
        <img src={image as string} width={'100%'} height={'100%'} alt={alt} />
      </Box>
      <button onClick={() => props.onClick()}>{buttonTitle}</button>
    </Box>
  )
}
