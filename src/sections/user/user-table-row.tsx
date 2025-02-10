import { useState, useCallback } from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuList from '@mui/material/MenuList';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

export interface UserProps {
  id: string;
  username: string;
  fullname: string;
  photo: string;
  email: string;
  phone_number: string;
  status: number;
  is_verified: number;
  is_2fa: number;
  currency: number;
  language: string;
  country: string;
  city: string;
  role_id: number;
  last_login: Date;
  registration_date: Date;
}

type UserTableRowProps = {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
};

export function UserTableRow({ row, selected, onSelectRow }: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLButtonElement | null>(null);

  const handleOpenPopover = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenPopover(event.currentTarget);
  }, []);

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const getCurrencyLabel = (currency: number) => {
    switch (currency) {
      case 0: return 'USD';
      case 1: return 'INR';
      case 2: return 'Pound';
      default: return '-';
    }
  };

  const getRoleLabel = (roleId: number) => {
    switch (roleId) {
      case 0: return 'User';
      case 1: return 'Admin';
      case 2: return 'Game Provider';
      default: return '-';
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox" selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell component="th" scope="row">
          <Box gap={2} display="flex" alignItems="center">
            <Avatar alt={row.username} src={row.photo} />
            {row.username}
          </Box>
        </TableCell>

        <TableCell>{row.fullname}</TableCell>

        <TableCell>{row.email}</TableCell>

        <TableCell align="center">
          {row.is_verified ? (
            <Iconify width={22} icon="solar:check-circle-bold" sx={{ color: 'success.main' }} />
          ) : (
            '-'
          )}
        </TableCell>

        <TableCell>
          <Label color={row.status === 0 ? 'error' : 'success'}>
            {row.status === 1 ? 'Active' : 'Inactive'}
          </Label>
        </TableCell>

        <TableCell>
          <Label color={row.is_2fa === 1 ? 'success' : 'warning'}>
            {row.is_2fa === 1 ? 'Enabled' : 'Disabled'}
          </Label>
        </TableCell>

        <TableCell>{getCurrencyLabel(row.currency)}</TableCell>

        <TableCell>{getRoleLabel(row.role_id)}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList
          disablePadding
          sx={{
            p: 0.5,
            gap: 0.5,
            width: 160,
            display: 'flex',
            flexDirection: 'column',
            [`& .${menuItemClasses.root}`]: {
              px: 1,
              gap: 2,
              borderRadius: 0.75,
              [`&.${menuItemClasses.selected}`]: { bgcolor: 'action.selected' },
            },
          }}
        >
          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:shield-bold" />
            Toggle 2FA
          </MenuItem>

          <MenuItem onClick={handleClosePopover}>
            <Iconify icon="solar:user-block-bold" />
            {row.status === 1 ? 'Deactivate' : 'Activate'}
          </MenuItem>

          <MenuItem onClick={handleClosePopover} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
