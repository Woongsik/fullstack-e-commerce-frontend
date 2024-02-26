import { 
  Dialog as MDialog, 
  DialogTitle, DialogActions } from "@mui/material";
import Button from './UiButton';
import { MUIButtonVariant, MUIColor, MUISize } from '../../misc/types/MUI';

type Props = {
  show: boolean,
  title: string | any,
  cancelTitle: string;
  proceedTitle: string;
  proceedColor: string;
  onClose: (proceed: boolean) => void
}

export default function UiDialog(props: Props) {
  const { show, title, cancelTitle, proceedTitle } = props;
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
          <Button 
            title={cancelTitle}
            variant={MUIButtonVariant.TEXT}
            size={MUISize.SMALL}
            color={MUIColor.PRIMARY}
            fontSize={12}
            onClick={() => props.onClose(false)} />
          <Button 
            title={proceedTitle}
            variant={MUIButtonVariant.CONTAINED}
            size={MUISize.SMALL}
            color={MUIColor.ERROR}
            fontSize={12}
            borderRadius={15}
            onClick={() => props.onClose(true)} />            
        </DialogActions>
      </MDialog>
  )
}
