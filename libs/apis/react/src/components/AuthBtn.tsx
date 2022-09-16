import { LoginRounded, LogoutRounded, PersonRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { useAuth } from "@whub/apis-react";
import { AccountInfo } from "@whub/simple-auth";
import { useNavigator } from "@whub/wui";
import React, { ReactNode, useState } from "react";

interface AuthBtnProps {
  readonly children?: (onClose: () => void, user?: AccountInfo) => ReactNode
}

export function AuthBtn(props: AuthBtnProps) {
  const { clickNavigate, navigate } = useNavigator()
  const { isLogged, user, logOut } = useAuth()
  const [loading, setLoading] = useState(false)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogout = () => {
    setLoading(true)
    logOut({
      onComplete: () => {
        handleClose()
        navigate('')
        setLoading(false)
      }
    })
  }

  if(!isLogged)
    return (
      <IconButton
        color="primary"
        href="/login"
        onClick={clickNavigate('/login')}
      >
        <LoginRounded/>
      </IconButton>
    )

  return (
    <>
      <LoadingButton
        loading={loading}
        startIcon={<PersonRounded/>}
        onClick={handleClick}
      >
        {user?.userName}
      </LoadingButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {props.children?.(handleClose, user)}
        <MenuItem onClick={onLogout}>
          <ListItemIcon> <LogoutRounded aria-label="logout"/> </ListItemIcon>
          <ListItemText> Logout </ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}
