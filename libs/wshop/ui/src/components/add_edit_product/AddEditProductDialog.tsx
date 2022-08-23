import { Button, Dialog, DialogActions, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { DialogBase, DialogTitleCross, FormGroup, IStep, MaybeShow, Stepper } from "@whub/wui";
import _ from "lodash";
import React, { useState } from "react";
import { AddProductStepOne } from "./steps/AddProductStepOne";
import { AddProductStepThree } from "./steps/AddProductStepThree";
import { AddProductStepTwo } from "./steps/AddProductStepTwo";

export function AddEditProductDialog(props: DialogBase) {
  const theme = useTheme();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));
  const [step, setStep] = useState(0)

  const setStepOnError = (i: number) => {
    if(i > step)
      return

    setStep(i)
  }

  const steps: IStep[] = [
    {
      content: <AddProductStepOne onError={() => setStepOnError(0)}/>,
      label: 'Step1'
    },
    {
      content: <AddProductStepTwo onError={() => setStepOnError(1)}/>,
      label: 'Step2',
    },
    {
      content: <AddProductStepThree/>,
      label: 'Step3',
    }
  ]

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      fullWidth
      fullScreen={isSm}
      PaperProps={{
        sx: {
          maxWidth: {
            xs: 'auto',
            sm: 460,
            md: 564,
          }
        }
      }}
    >
      <DialogTitleCross
        onClose={props.onClose}
      >
        Aggiungi prodotto
      </DialogTitleCross>
      <FormGroup
        onSubmit={f => console.log(f.getErrors())}
      >
        <DialogContent>
          <Stepper
            keepMounted
            activeStep={step}
            steps={steps}
            StackProps={{
              direction: 'column',
              spacing: 1,
              sx: { marginTop: 1 }
            }}
          />
        </DialogContent>
        <DialogActions>
          <MaybeShow
            show={step === 0}
            alternativeChildren={
              <Button
                variant='text'
                onClick={e => {
                  e.preventDefault()
                  setStep(step - 1)
                }}
              >
                Indietro
              </Button>
            }
          >
            <Button
              variant='text'
              onClick={props.onClose}
            >
              Chiudi
            </Button>
          </MaybeShow>

          <MaybeShow
            show={steps.length - 1 === step}
            alternativeChildren={
              <Button
                variant='contained'
                onClick={(e) => {
                  e.preventDefault()
                  setStep(step + 1)
                }}
              >
                Avanti
              </Button>
            }
          >
            <Button
              type="submit"
              variant='contained'
            >
              Aggiungi
            </Button>
          </MaybeShow>
        </DialogActions>
      </FormGroup>
    </Dialog>
  )
}



