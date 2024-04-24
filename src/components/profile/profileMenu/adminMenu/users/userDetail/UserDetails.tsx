import { ChangeEvent, useState } from 'react';
import { Box, ButtonGroup, FormControlLabel, FormGroup, IconButton, Switch, TableCell, TableRow } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import SaveIcon from '@mui/icons-material/Save';

import UiDialog from '../../../../../ui/dialog/UiDialog';
import { apiService } from '../../../../../../services/APIService';
import LoadingAndMessage from '../../../../../ui/loadingAndMessage/LoadingAndMessage';
import { MUIColor } from '../../../../../../misc/types/MUI';
import { User, UserRole, UserRoleAndActive } from '../../../../../../misc/types/User';

type Props = {
  user: User;
  onUserDeleted: (userId: string) => void,
  onUserUpdated: (updatedUser: User) => void
}

enum Mode {
  EDIT = 'EDIT',
  READ = 'READ'
}

export default function UserDetailsRow(props: Props) {
  const { user } = props;
  const [mode, setMode] = useState<Mode>(Mode.READ);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<boolean>(user.role === UserRole.ADMIN);
  const [userActive, setUserActive] = useState<boolean>(user.active);

  const changeMode = (newMode: Mode) => {
    setMode(newMode);
  }

  const clear = () => {
    changeMode(Mode.READ);
  }

  const askToRemoveUser = () => {
    setShowDialog(true);
  } 

  const handleClose = (proceed: boolean) => {
    setShowDialog(false);

    if (proceed) {
      removeUser();
    }
  } 

  const removeUser = async () => {
    try {
      setLoading(true);
      await apiService.deleteUser(user._id);
      props.onUserDeleted(user._id);
    } catch (e) {
      const error = e as Error;
      setError(`Cannot delete user, ${error.message}`);
    }

    setLoading(false);    
  }

  const handleUpdate = async () => {
    const updateInfo: UserRoleAndActive = {
      active: userActive,
      role: userRole ? UserRole.ADMIN : UserRole.CUSTOMER
    }
    const updatedUser: User = await apiService.updateUserRoleAndActive(user._id, updateInfo);
    props.onUserUpdated(updatedUser);
    setMode(Mode.READ);
  }

  const handleUserRole = (e: ChangeEvent<HTMLInputElement>) => {
    setUserRole(e.target.checked);
  }

  const handleUserActive = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserActive(event.target.checked);
  };

  return (
      <TableRow>
        <TableCell align='center'>
          {user.username}
        </TableCell>
        <TableCell align='center'>
          {user.email}
        </TableCell >
        {mode === Mode.READ ? 
        <>
          <TableCell align='center' sx={{ textTransform: 'capitalize'}}>
            {user.role}
          </TableCell>
          <TableCell align='center' sx={{ textTransform: 'capitalize'}}>
            {user.active.toString()}
          </TableCell>
        </>
      : 
        <>
          <TableCell align='center'>
            <FormGroup>
              <FormControlLabel control={<Switch defaultChecked={user.role === UserRole.ADMIN}  onChange={handleUserRole} />} label="Admin" />
            </FormGroup>
          </TableCell>
          <TableCell align='center'>
          <FormGroup>
              <FormControlLabel control={<Switch defaultChecked={user.active}  onChange={handleUserActive}/>} label="Active" />
            </FormGroup>
          </TableCell>
        </>
      }
      <TableCell align="center">
        { mode === Mode.READ ? 
        <ButtonGroup>
          <IconButton onClick={askToRemoveUser}>
            <DeleteIcon color={MUIColor.ERROR} />
          </IconButton>
          <IconButton onClick={() => changeMode(Mode.EDIT)}>
            <EditIcon color={MUIColor.PRIMARY} />
          </IconButton>
        </ButtonGroup>
        : 
        <ButtonGroup>
          <IconButton onClick={clear}>
            <CancelIcon color={MUIColor.WARNING}/>
          </IconButton>
          <IconButton onClick={handleUpdate}>
            <SaveIcon color={MUIColor.INFO}/>
          </IconButton>
        </ButtonGroup>
        }

        <Box>
          <LoadingAndMessage 
            loading={loading}
            error={error}
            size={25} />
        </Box>
      </TableCell>

      <UiDialog 
        show={showDialog} 
        title={`Are you sure you want to delete "${user.username}"`} 
        proceedTitle='Delete' 
        cancelTitle={'Cancel'} 
        onClose={handleClose} />
    </TableRow>

  )
}
