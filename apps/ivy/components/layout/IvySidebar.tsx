import { Box, IconButton, Stack } from "@mui/material";

import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import SavingsRoundedIcon from '@mui/icons-material/SavingsRounded';
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded';

import { useNextNavigator } from "@wui/core";
import { useRouter } from "next/router";
import { ReactNode } from "react";

import { useMainSidebar } from "./IvyLayoutWithSidebar";

export default function IvySidebar() {
  return (
    <Stack
      direction="column"
      sx={{
        borderRadius: '0px !important',
        marginTop: theme => `${theme.mixins.toolbar.height}px`,
        height: theme => `calc(100vh - ${theme.mixins.toolbar.height}px)`,
        background: theme => theme.palette.secondary.main,
        borderLeft: 0,
        width: 56,
        overflow: 'hidden',
        paddingTop: 1,
      }}
    >
      <SidebarButton route="/frame/translations">
        <TranslateRoundedIcon/>
      </SidebarButton>
      <SidebarButton route="/frame/accounting">
        <SavingsRoundedIcon/>
      </SidebarButton>
      <SidebarButton route="/frame/licensing">
        <FingerprintRoundedIcon/>
      </SidebarButton>
    </Stack>
  )
}


interface SidebarButtonProps {
  readonly children: ReactNode,
  readonly route: string,
}

function SidebarButton(props: SidebarButtonProps) {
  const { toggle, isOpen } = useMainSidebar()
  const { navigate } = useNextNavigator()
  const router = useRouter()

  const selected = router.pathname === props.route

  const onPress = () => {
    const action = selected
      ? toggle
      : () => navigate(props.route)

    action()
  }

  const getSpace = () => {
    if(!selected)
      return 1

    if(isOpen)
      return 0

    return 0.75
  }

  return (
    <Box
      sx={{
        position: 'relative',
        transition: `
          border-radius 150ms,
          margin 150ms,
          padding 150ms,
          transform 150ms,
          background 150ms
        `,
        margin: getSpace(),
        padding: 1 - getSpace(),
        borderRadius: selected 
          ? isOpen ? '16px 0px 0px 16px' : '16px' 
          : '100%',
        background: theme => selected 
          ? theme.palette.background.paper 
          : 'auto',
        "&: hover": {
          background: theme => theme.palette.background.paper
        }
      }}
    >
      <IconButton
        onClick={onPress}
      >
        {props.children}
      </IconButton>
    </Box>
  )
}
