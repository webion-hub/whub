import { Stack, StackProps, Step, StepLabel, Stepper as MuiStepper } from "@mui/material";
import { ReactNode } from "react";
import MaybeShow from "../MaybeShow";

export interface IStep {
  readonly content: ReactNode,
  readonly label: string,
}

export interface StepperProps {
  readonly steps: IStep[],
  readonly activeStep: number,
  readonly StackProps?: StackProps,
  readonly keepMounted?: boolean,
}

export function Stepper(props: StepperProps) {
  return (
    <>
      <MuiStepper
        activeStep={props.activeStep}
      >
        {
          props.steps.map((step, i) => (
            <Step
              key={i}
            >
              <StepLabel> {step.label} </StepLabel>
            </Step>
          ))
        }
      </MuiStepper>
      <MaybeShow
        show={!!props.keepMounted}
        alternativeChildren={
          <Stack {...props.StackProps} >
            {props.steps?.[props.activeStep].content}
          </Stack>
        }
      >
        {
          props.steps.map((step, i) =>
            <Stack
              key={i}
              {...props.StackProps}
              sx={{
                ...props.StackProps?.sx,
                display: i === props.activeStep
                  ? 'flex'
                  : 'none'
              }}
            >
              {step.content}
            </Stack>
          )
        }
      </MaybeShow>
    </>
  )
}
