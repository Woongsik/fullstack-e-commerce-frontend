import { Button as MUIButton } from "@mui/material";
import { MUIColor, MUISize, MUIButtonVariant, MUIButtonType } from "../../misc/types/MUI";

type Props = {
  title?: string | any; // Need to fix the type
  variant?: MUIButtonVariant;
  size?: MUISize;
  color?: MUIColor;
  fontSize?: number;
  borderRadius?: number;
  customStyle?: Object;
  endIcon?: any // Need to fix type
  type?: MUIButtonType
  onClick?: () => void 
}

export default function UiButton(props: Props) {
  const { title, variant, size, color, endIcon, fontSize, borderRadius, customStyle, type } = props;
  
  return (
    <MUIButton
      disableRipple
      disableTouchRipple
      variant={variant}
      size={size}
      color={color} 
      endIcon={endIcon}
      type={type}
      sx={{ fontSize: fontSize, borderRadius: borderRadius, ...customStyle }}
      onClick={props.onClick}>
        {title}
    </MUIButton>
  )
}