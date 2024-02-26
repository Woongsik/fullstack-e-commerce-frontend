import { Button as MUIButton } from "@mui/material";
import { MUIColor, MUISize, MUIButtonVariant } from "../../misc/types/MUI";

type Props = {
  title?: string | any; // Need to fix the type
  variant?: MUIButtonVariant;
  size?: MUISize;
  color?: MUIColor;
  fontSize?: number;
  borderRadius?: number;
  customStyle?: Object;
  endIcon?: any // Need to fix type
  onClick?: () => void 
}

export default function UiButton(props: Props) {
  const { endIcon, title, variant, size, color, fontSize, borderRadius, customStyle } = props;
  
  return (
    <MUIButton
      disableRipple
      disableTouchRipple 
      variant={variant}
      size={size}
      color={color} 
      endIcon={endIcon}
      sx={{ fontSize: fontSize, borderRadius: borderRadius, ...customStyle }}
      onClick={props.onClick}>
        {title}
    </MUIButton>
  )
}