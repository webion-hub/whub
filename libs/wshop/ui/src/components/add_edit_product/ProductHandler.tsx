import { SaveRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack, Typography } from "@mui/material";
import { handleResponse } from "@whub/apis-core";
import { useShopApi } from "@whub/apis-react";
import { Product, ProductEndpoint } from "@whub/wshop-api";
import { Form, FormGroup, GetFormValue, Page, Section, useForm, useNavigator } from "@whub/wui";
import { ReactNode, useState } from "react";
import { ProductComponent } from "../ProductComponent";
import { AddProductStepOne } from "./steps/AddProductStepOne";
import { AddProductStepThree } from "./steps/AddProductStepThree";
import { AddProductStepTwo } from "./steps/AddProductStepTwo";

export function ProductHandler() {
  const navigate = useNavigator();
  const shopApi = useShopApi();
  const [loading, setLoading] = useState(false)

  const onCreate = (f: Form) => {
    console.log(f.getValues())
    if(!f.isFormValid())
      return

    setLoading(true)
    const formProduct = f.getValues()

    shopApi.products
      .create({
        ...formProduct,
        categoryId: formProduct.category.id
      })
      .then(res => handleResponse(res, {
        201: () => {
          const product = shopApi.products.withId(res.data.id)

          uploadData(product, f,
            formProduct.attachments ?? [],
            formProduct.images ?? [],
            formProduct.correlated ?? []
          )
            .then(() => onClose())
            .finally(() => setLoading(false))
        }
      }))
      .catch(err => {
        handleResponse(err.response, {
        409: () => {
          f.setIsValid('code')(false)
          setLoading(false)
        },
      })})
  }

  const uploadData = (
    productEndpoint: ProductEndpoint,
    form: Form,
    files: File[],
    images: string[],
    releated: Product[]
  ) => {
    return Promise.all([
      uploadFiles(productEndpoint, files).catch(() => form.setIsValid('attachments')(false)),
      uploadImages(productEndpoint, images).catch(() => form.setIsValid('images')(false)),
      uploadReleated(productEndpoint, releated).catch(() => form.setIsValid('correlated')(false))
    ])
  }

  const uploadReleated = (productEndpoint: ProductEndpoint, products: Product[]) => {
    console.log(products)
    return productEndpoint
      .updateRelatedProducts({ productIds: products.map(p => p.id) })
  }

  const uploadFile = (productEndpoint: ProductEndpoint, file: File) => {
    console.log(file)

    return productEndpoint
      .attachments
      .upload(file)
  }

  const uploadFiles = (productEndpoint: ProductEndpoint, files: File[]) => {
    const tasks = files.map(f => uploadFile(productEndpoint, f))

    return Promise.all(tasks)
  }

  const uploadImage = (productEndpoint: ProductEndpoint, image: string) => {
    return productEndpoint
      .images
      .upload(image)
  }

  const uploadImages = (productEndpoint: ProductEndpoint, images: string[]) => {
    const tasks = images.map(i => uploadImage(productEndpoint, i))

    return Promise.all(tasks)
  }

  const onClose = () => {
    setLoading(false)
    navigate.navigate('/products-table')
  }

  return (
    <FormGroup
      onSubmit={onCreate}
    >
      <Page>
        <Section>
          <Stack
            direction="row"
            spacing={4}
            sx={{
              width: '100%',
              "& > *": { width: '50%' },
            }}
          >
            <ProductComponent
              compress
              mode='preview'
            />
            <Stack
              component={Paper}
              direction="column"
              spacing={1}
              sx={{ padding: 2 }}
            >
              <Stack
                justifyContent="flex-end"
                direction="row"
                spacing={1}
              >
                <Button
                  disabled={loading}
                  variant="text"
                  onClick={onClose}
                >
                  Annulla
                </Button>
                <LoadingButton
                  type="submit"
                  loading={loading}
                  variant="contained"
                  startIcon={<SaveRounded/>}
                >
                  Salva
                </LoadingButton>
              </Stack>
              <AddProductStepOne/>
              <AddProductStepTwo/>
              <AddProductStepThree/>
            </Stack>
          </Stack>
        </Section>
      </Page>
    </FormGroup>
  )
}


