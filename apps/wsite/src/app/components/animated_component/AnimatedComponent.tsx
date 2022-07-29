/*import BaseProps from "../../wui/abstractions/props/BaseProps";
import { Spring, animated, easings } from 'react-spring'
import { useTheme } from "@mui/material";
import { useRef } from "react";

export interface AnimatedBoxBaseProps extends BaseProps {
  readonly delay?: number,
  readonly oneTime?: boolean,
}

export interface AnimatedBoxProps extends AnimatedBoxBaseProps {
  readonly variant: "slide-up" | "",
  readonly distance: number,
}

export interface AnimatedBoxCustomProps extends AnimatedBoxBaseProps {
  readonly variant: "custom",
  readonly from: any,
  readonly to?: any,
}

export interface Animation {
  readonly from: any,
  readonly to: any,
} 


export default function AnimatedComponent(props: AnimatedBoxProps) {
  const theme = useTheme()

  const ref = useRef<any>(null)
  
  const animations: {[key: string]: Animation} = {
    "slide-up": {
      from: {
        transform: `translateY(${props.distance}px)`,
        opacity: 0,
      },
      to: { 
        transform : "translateY(0px)",
        opacity: 1,
      },
    },
  }
  
  
  return (
    <Spring
      config={{
        duration: theme.transitions.duration.enteringScreen, 
        easing: easings.easeInOutCubic,
      }}
      from={animations[props.variant].from} 
      to={animations[props.variant].to}
      delay={props.delay}
    >
      {styles => (
        <animated.div style={styles} ref={ref}>
          {props.children}
        </animated.div>
      )}
    </Spring>
  )
}
*/