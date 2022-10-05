import React, { useEffect } from "react";
import { EventsDispatcher } from "../lib/EventsDispatcher";

export const useSidebar = () => {
  const [isSideBarOpen, setIsSideBarOpen] = React.useState(false);

  const sideBarEvent = EventsDispatcher.setEvent("updateSideBar");

  useEffect(() => {
    sideBarEvent.listen(updateSidebarForListener);

    return () => sideBarEvent.unlisten(updateSidebarForListener);
  }, []);

  const updateSidebarForListener = (status: boolean[]) => {
    setIsSideBarOpen(status[0]);
  };

  const handleSideBarOpen = (status: boolean) => {
    setIsSideBarOpen(status);
    sideBarEvent.update(status);
  };

  const toggleSidebar = () => {
    handleSideBarOpen(!isSideBarOpen);
  };

  return {
    isSideBarOpen,
    setSideBarOpen: handleSideBarOpen,
    toggleSidebar: toggleSidebar,
  };
};