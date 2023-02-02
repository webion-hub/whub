import { Drawer, Stack } from "@mui/material";
import { ChildrenProps } from "@wui/core";
import Layout from "@wui/layout/Layout";
import IvyAppBar from "./IvyAppBar";
import IvySidebar from "./IvySidebar";
import { create } from 'zustand'
import { getBorderColor } from "@wui/themes";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface MainSidebarState {
  isOpen: boolean,
  open: () => void,
  close: () => void,
  toggle: () => void,
}

export const useMainSidebar = create<MainSidebarState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set(state => ({isOpen: !state.isOpen})),
}))


export default function IvyLayoutWithSidebar(props: ChildrenProps) {
  const { isOpen } = useMainSidebar()
  const router = useRouter()

  console.log(router.pathname)



  return (
    <Layout
      AppBarComponent={<IvyAppBar/>}
      sx={{ marginTop: 0 }}
    >
      <Stack
        direction="row"
      >
        <IvySidebar/>
        <Drawer
          variant="persistent"
          anchor="left"
          open={isOpen}
          sx={{ zIndex: -1 }}
          PaperProps={{ 
            sx: {
              marginTop: theme => `${theme.mixins.toolbar.height}px`,
              marginLeft: '56px',
              borderLeft: 0, 
            } 
          }}
        />
        {props.children}
      </Stack>
    </Layout>
  )
}