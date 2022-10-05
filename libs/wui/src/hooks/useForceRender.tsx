import { useState } from "react";

export const useForceRender = () => {
  const [refresh, setRefresh] = useState(false);

  const force = () => {
    setRefresh(!refresh)
  }

  return force
}
