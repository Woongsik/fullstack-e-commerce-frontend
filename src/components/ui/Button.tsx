import { Button as MUIButton } from "@mui/material";
import { MUIColor, MUISize, MUIButtonVariant } from "../../misc/types/MUI";

type Props = {
  title?: string | any; // Need to fix the type
  variant: MUIButtonVariant;
  size?: MUISize;
  color: MUIColor;
  fontSize?: number;
  borderRadius?: number;
  onClick?: () => void 
}

export default function Button(props: Props) {
  const { title, variant, size, color, fontSize, borderRadius } = props;
  
  return (
    <MUIButton 
      variant={variant}
      size={size}
      color={color}
      sx={{ fontSize: fontSize, borderRadius: borderRadius }}
      onClick={props.onClick}>
        {title}
    </MUIButton>
  )
}