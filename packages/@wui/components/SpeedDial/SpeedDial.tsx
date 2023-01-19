import CloseRounded from "@mui/icons-material/CloseRounded";
import PhoneRounded from "@mui/icons-material/PhoneRounded";

import MuiSpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ISpeedDialAction {
  readonly name: string,
  readonly Icon: OverridableComponent<any>
  readonly onClick: () => void
}

export interface SpeedDialProps {
  readonly actions: ISpeedDialAction[]
}

export  function SpeedDial(props: SpeedDialProps) {
  return (
    <MuiSpeedDial
      ariaLabel="speed-dial"
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16
      }}
      icon={
        <SpeedDialIcon
          icon={ <PhoneRounded/> }
          openIcon={ <CloseRounded/> }
        />
      }
    >
      {props.actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={<action.Icon/>}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </MuiSpeedDial>
  );
}
