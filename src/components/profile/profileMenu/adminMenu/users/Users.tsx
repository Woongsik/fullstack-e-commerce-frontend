import { useEffect, useState } from 'react';
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

import CenteredContainer from '../../../../ui/layout/CenteredContainer';
import LoadingAndMessage from '../../../../ui/loadingAndMessage/LoadingAndMessage';
import { apiService } from '../../../../../services/APIService';
import { User } from '../../../../../misc/types/User';
import UserDetailsRow from './userDetail/UserDetails';

export default function Users() {
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {      
      setLoading(true);
      const userList: User[] = await apiService.getUsers();
      setUsers(userList);
    } catch (e) {
      const error = e as Error;
      setError(`Cannot get users, ${error.message}`);
    }
    
    setLoading(false);
  }

  const handleUserDeleted = (userId: string) => {
    const clonedUsers: User[] = [...users];
    const index: number = clonedUsers.findIndex((clonedUser: User) => clonedUser._id === userId);
    if (index > -1) {
      clonedUsers.splice(index, 1);
    }

    setUsers(clonedUsers);
  }

  const handleUserUpdated = (updatedUser: User) => {
    const clonedUsers: User[] = [...users];
    const index: number = clonedUsers.findIndex((clonedUser: User) => clonedUser._id === updatedUser._id);
    if (index > -1) {
      clonedUsers.splice(index, 1, updatedUser);
    }

    setUsers(clonedUsers);
  }

  return (
    <CenteredContainer width='100%' sx={{ minWidth: '300px' }}>
      {(users && users.length > 0) &&
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Username</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Role</TableCell>
                <TableCell align="center">Active</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user: User) => (
                <UserDetailsRow 
                  key={user._id} 
                  user={user}
                  onUserDeleted={handleUserDeleted}
                  onUserUpdated={handleUserUpdated} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      }

      {(!loading && users && users.length === 0) && <h3>No Products yet...</h3>}

      <LoadingAndMessage loading={loading} error={error} />
    </CenteredContainer>
  )
}
