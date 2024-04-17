import { 
  Dialog as MDialog, 
  DialogTitle, 
  DialogActions 
} from "@mui/material";

import UiButton from '../button/UiButton';
import { MUIButtonVariant, MUIColor, MUISize } from '../../../misc/types/MUI';

type Props = {
  show: boolean,
  title: string | any,
  cancelTitle: string;
  proceedTitle: string;
  proceedColor: MUIColor;
  onClose: (proceed: boolean) => void
}

export default function UiDialog(props: Props) {
  const { show, title, cancelTitle, proceedTitle, proceedColor = MUIColor.ERROR } = props;
  return (
    <MDialog
        open={show}
        onClose={() => props.onClose(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
        <DialogTitle id="alert-dialog-title" fontSize={15}>
          {title}
        </DialogTitle>
        <DialogActions>
          <UiButton 
            variant={MUIButtonVariant.TEXT}
            size={MUISize.SMALL}
            color={MUIColor.PRIMARY}
            fontSize={12}
            onClick={() => props.onClose(false)}>
            {cancelTitle}
          </UiButton>
          <UiButton 
            variant={MUIButtonVariant.CONTAINED}
            size={MUISize.SMALL}
            color={proceedColor}
            fontSize={12}
            borderRadius={15}
            onClick={() => props.onClose(true)}>
            {proceedTitle}
          </UiButton>            
        </DialogActions>
      </MDialog>
  )
}
