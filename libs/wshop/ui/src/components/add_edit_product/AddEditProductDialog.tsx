import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, useMediaQuery, useTheme } from "@mui/material";
import { handleResponse } from "@whub/apis-core";
import { useShopApi } from "@whub/apis-react";
import { DialogBase, DialogTitleCross, Form, FormGroup, IStep, MaybeShow, Stepper } from "@whub/wui";
import _ from "lodash";
import { useState } from "react";
import { AddProductStepOne } from "./steps/AddProductStepOne";
import { AddProductStepThree } from "./steps/AddProductStepThree";
import { AddProductStepTwo } from "./steps/AddProductStepTwo";

export function AddEditProductDialog(props: DialogBase) {
  const theme = useTheme();
  const shopApi = useShopApi();
  const isSm = useMediaQuery(theme.breakpoints.down("sm"));

  const [step, setStep] = useState(0)

  const [imagesTooBig, setImagesTooBig] = useState(false)
  const [loading, setLoading] = useState(false)

  const setStepOnError = (i: number) => {
    if(i > step)
      return

    setStep(i)
  }

  const onCreate = (f: Form) => {
    if(!f.isFormValid())
      return

    setImagesTooBig(false)
    setLoading(true)

    const formProduct = f.getValues()

    shopApi.products
      .create({
        ...formProduct,
        categoryId: formProduct.category.id
      })
      .then(res => handleResponse(res, {
        201: () => {

          uploadImages(res.data.id, formProduct.images)
            .then(() => onClose())
            .catch(() => {
              f.setIsValid('images')(false)
              setStep(2)
              setImagesTooBig(true)
            })
            .finally(() => setLoading(false))
        }
      }))
      .catch(err => handleResponse(err.response, {
        409: () => {
          f.setIsValid('code')(false)
          setStep(0)
          setLoading(false)
        },
      }))
  }

  const uploadImage = (id: number, image: string) => {
    return shopApi.products
      .withId(id)
      .images
      .upload(image)
  }

  const uploadImages = (id: number, images: string[]) => {
    const tasks = images.map(i => uploadImage(id, i))

    return Promise.all(tasks)
  }

  const onClose = () => {
    props.onClose()
    setStep(0)
    setLoading(false)
    setImagesTooBig(false)
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
      content: <AddProductStepThree onError={() => setStepOnError(2)}/>,
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
        onSubmit={onCreate}
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
              <MaybeShow
                show={!imagesTooBig}
              >
                <Button
                  variant='text'
                  disabled={loading}
                  onClick={e => {
                    e.preventDefault()
                    setStep(step - 1)
                  }}
                >
                  Indietro
                </Button>
              </MaybeShow>
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
            <LoadingButton
              type="submit"
              variant='contained'
              loading={loading}
            >
              Aggiungi
            </LoadingButton>
          </MaybeShow>
        </DialogActions>
      </FormGroup>
    </Dialog>
  )
}



