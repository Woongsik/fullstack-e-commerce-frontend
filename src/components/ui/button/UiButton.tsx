import { Button as MUIButton } from "@mui/material";
import { MUIColor, MUISize, MUIButtonVariant, MUIButtonType } from "../../../misc/types/MUI";
import { ReactNode } from "react";

type Props = {
  variant?: MUIButtonVariant;
  size?: MUISize;
  color?: MUIColor;
  fontSize?: number;
  borderRadius?: number;
  customStyle?: Object;
  type?: MUIButtonType;
  children: ReactNode;
  onClick?: () => void 
}

export default function UiButton(props: Props) {
  const { variant, size, color, fontSize, borderRadius, customStyle, type, children } = props;
  
  return (
    <MUIButton
      disableRipple
      disableTouchRipple
      variant={variant}
      size={size}
      color={color} 
      type={type}
      sx={{ fontSize: fontSize, borderRadius: borderRadius, ...customStyle }}
      onClick={props.onClick}>
      {children}
    </MUIButton>
  )
}