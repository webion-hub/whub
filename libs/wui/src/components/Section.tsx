import { Theme, SxProps } from "@mui/system";
import { styled } from "@mui/material";
import { ChildrenProp } from "../abstractions/props/ChildrenProps";

const StyledSection = styled('section')(({theme}) => ({
  paddingBlock: theme.spacing(8),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: 'relative',
  margin: '0 auto',

  "& > *": {
    zIndex: 1,
  }
}))

export interface SectionProps {
  readonly id?: string;
  readonly maxWidth?: number | string;
  readonly centered?: boolean;
  readonly showBackground?: boolean;
  readonly background?: string;
  readonly backgroundSx?: React.CSSProperties;
  readonly sx?: SxProps<Theme>;
  readonly children?: ChildrenProp;
}

export function Section(props: SectionProps) {
  const background: SxProps<Theme> = {
    "&::after": {
      content: "''",
      position: 'absolute',
      height: '100%',
      width: '100vw',
      zIndex: 0,
      background: theme =>
        props.background ??
        theme.palette['secondaryBackground'].default,
      ...props.backgroundSx,
    },
  }
  const backgroundSx = props.showBackground
    ? background
    : {}

  return (
    <StyledSection
      id={props.id}
      sx={{
        maxWidth: props.maxWidth,
        ...backgroundSx,
        ...props.sx,
      }}
    >
      {props.children}
    </StyledSection>
  )
}


Section.defaultProps = {
  id: ''
}
