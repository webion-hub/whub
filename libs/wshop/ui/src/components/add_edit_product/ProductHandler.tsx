import { SaveRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Backdrop, Button, CircularProgress, LinearProgress, Paper, Stack, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { handleResponse } from "@whub/apis-core";
import { useShopApi } from "@whub/apis-react";
import { Category, Product, ProductDetail, ProductEndpoint } from "@whub/wshop-api";
import { FileWithId, Form, FormGroup, MaybeShow, Page, Section, useNavigator } from "@whub/wui";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductUtils } from "../../lib/ProductUtils";
import { ProductComponent } from "../ProductComponent";
import { AddProductStepOne } from "./steps/AddProductStepOne";
import { AddProductStepThree } from "./steps/AddProductStepThree";
import { AddProductStepTwo } from "./steps/AddProductStepTwo";


interface PreviewProduct {
  readonly id: number;
  readonly name: string;
  readonly category?: Category;
  readonly description?: string;
  readonly price?: number;
  readonly code: string;
  readonly attachments?: FileWithId<File>[];
  readonly images?: FileWithId<string>[];
  readonly correlated?: Product[];
  readonly details?: ProductDetail[];
}

interface ProductHandlerUpdateProps {
  readonly mode: 'update',
  readonly previewProduct: PreviewProduct,
  readonly sx?: SxProps<Theme>,
}
interface ProductHandlerAddProps {
  readonly mode?: 'add',
  readonly sx?: SxProps<Theme>,
}

type ProductHandlerProps = ProductHandlerAddProps | ProductHandlerUpdateProps

export function ProductHandler(props: ProductHandlerProps) {
  const theme = useTheme()
  const compressProduct = useMediaQuery(theme.breakpoints.down("lg"));
  const compressAll = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigator();
  const shopApi = useShopApi();
  const [loading, setLoading] = useState(false)
  const isUpdateMode = props.mode === 'update'

  const onCreate = (f: Form) => {
    if(!f.isFormValid())
      return

    setLoading(true)
    const formProduct = f.getValues() as PreviewProduct

    const createProduct = () => shopApi.products.create({
      ...formProduct,
      categoryId: formProduct.category?.id
    })

    const updateProduct = () => shopApi.products
      .withId(isUpdateMode ? props.previewProduct.id : -1)
      .update({
        name: formProduct.name,
        price: formProduct.price,
        description: formProduct.description,
        code: formProduct.code,
        categoryId: formProduct.category?.id
      })

    const task = isUpdateMode
      ? updateProduct
      : createProduct

    task()
      .then(res => handleResponse(res, {
        201: () => addProductInformations(res.data, f),
        200: () => addProductInformations(res.data, f),
      }))
      .catch(err => {
        handleResponse(err.response, {
        409: () => {
          f.setIsValid('code')(false)
          setLoading(false)
        },
      })})
  }

  const addProductInformations = (p: Product, f: Form) => {
    const previewProduct = props.mode === 'update'
      ? props.previewProduct
      : {} as PreviewProduct

    const product = shopApi.products.withId(p.id)
    const formProduct = f.getValues() as PreviewProduct

    cleanProductFiles(previewProduct, product)
      .then(() => {
        uploadData(product, f,
          formProduct.attachments?.map(a => a.file) ?? [],
          formProduct.images?.map(a => a.file) ?? [],
          formProduct.correlated ?? [],
          formProduct.details ?? []
        )
          .then(() => onClose())
          .finally(() => setLoading(false))
      })
  }

  const cleanProductFiles = (product: PreviewProduct, productEndpoint: ProductEndpoint) => {
    console.log(product.images)

    const cleanImageTasks = product.images?.map(i =>
      productEndpoint.images.withId(i.id).delete()
    )

    const cleanAttachmentsTasks = product.attachments?.map(i =>
      productEndpoint.attachments.withId(i.id).delete()
    )

    return Promise.all([
      ...cleanImageTasks ?? [],
      ...cleanAttachmentsTasks ?? []
    ])
  }

  const uploadData = (
    productEndpoint: ProductEndpoint,
    form: Form,
    files: File[],
    images: string[],
    releated: Product[],
    details: ProductDetail[],
  ) => {
    return Promise.all([
      uploadFiles(productEndpoint, files).catch(() => form.setIsValid('attachments')(false)),
      uploadImages(productEndpoint, images).catch(() => form.setIsValid('images')(false)),
      uploadReleated(productEndpoint, releated).catch(() => form.setIsValid('correlated')(false)),
      uploadDetails(productEndpoint, details).catch(() => form.setIsValid('details')(false))
    ])
  }

  const uploadDetails = (productEndpoint: ProductEndpoint, details: ProductDetail[]) => {
    return productEndpoint
      .details
      .update({ details: details })
  }

  const uploadReleated = (productEndpoint: ProductEndpoint, products: Product[]) => {
    return productEndpoint
      .updateRelatedProducts({ productIds: products.map(p => p.id) })
  }

  const uploadFile = (productEndpoint: ProductEndpoint, file: File) => {
    return productEndpoint
      .attachments
      .upload(file)
  }

  const uploadFiles = (productEndpoint: ProductEndpoint, files: File[]) => {
    const tasks = files.map(f => uploadFile(productEndpoint, f))

    return Promise.all(tasks)
  }

  const uploadImage = (productEndpoint: ProductEndpoint, image: string) => {
    return productEndpoint.images.upload({
      image: image,
      index: 0,
    })
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
      values={isUpdateMode ? props.previewProduct : undefined}
      sx={{ width: '100%', ...props.sx }}
    >
      <Stack
        direction={compressAll ? "column-reverse" : "row"}
        alignItems={compressAll ? 'center' : 'flex-start'}
        spacing={4}
        sx={{
          padding: 2,
          width: '100%',
        }}
      >
        <ProductComponent
          compress={compressProduct}
          mode='preview'
        />
        <Stack
          component={Paper}
          direction="column"
          spacing={1}
          sx={{
            padding: 2,
            width: '100%',
            maxWidth: compressAll ? 'auto' : 400,
          }}
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
    </FormGroup>
  )
}


export function AddProduct() {
  return (
    <Page>
      <Section>
        <ProductHandler/>
      </Section>
    </Page>
  )
}

export function EditProduct() {
  const params = useParams()
  const productId = params['id']

  const [loading, setLoading] = useState(false)
  const [previewProduct, setPreviewProduct] = useState<PreviewProduct>()

  const shopApi = useShopApi()

  useEffect(() => {
    fetchProduct()
  }, [productId])

  const fetchProduct = () => {
    if(!productId)
      return

    setLoading(true)
    shopApi.products
      .withId(parseInt(productId))
      .load()
      .then(async res => {
        const product = res.data
        const files = await ProductUtils.getAttachmentsFiles(shopApi, product)
        const images = await ProductUtils.getImagesFiles(shopApi, product)

        setPreviewProduct({
          ...product,
          attachments: files,
          images: images,
          correlated: product.relatedProducts
        })
      })
      .finally(() => setLoading(false))
  }

  return (
    <Page>
      <Section>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {
          previewProduct
            ? <ProductHandler
                mode='update'
                previewProduct={previewProduct}
              />
            : <></>
        }
      </Section>
    </Page>
  )
}
