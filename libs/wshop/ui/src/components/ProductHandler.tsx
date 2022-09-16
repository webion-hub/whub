import { SaveRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { handleResponse } from "@whub/apis-core";
import { useShop } from "@whub/apis-react";
import { Image, Product, ProductDetail, ProductEndpoint } from "@whub/wshop-api";
import { Form, FormGroup, useNavigator } from "@whub/wui";
import { useState } from "react";
import { ProductController } from "../lib/ProductController";
import { ProductUtils } from "../lib/ProductUtils";
import { ProductAttachmentsInput } from "./inputs/ProductAttachmentsInput";
import { ProductCategoryInput } from "./inputs/ProductCategoryInput";
import { ProductCodeInput } from "./inputs/ProductCodeInput";
import { ProductDescriptionInput } from "./inputs/ProductDescriptionInput";
import { ProductDetailsInput } from "./inputs/ProductDetailsInput";
import { ProductImagesInput } from "./inputs/ProductImagesInput";
import { ProductNameInput } from "./inputs/ProductNameInput";
import { ProductPriceInput } from "./inputs/ProductPriceInput copy";
import { ProductRelatedInput } from "./inputs/ProductRelatedInput";
import { ProductComponent } from "./ProductComponent";


interface ProductHandlerProps {
  readonly mode?: 'add' | 'update',
  readonly product?: Product,
  readonly sx?: SxProps<Theme>,
}

export function ProductHandler(props: ProductHandlerProps) {
  const theme = useTheme()
  const compressProduct = useMediaQuery(theme.breakpoints.down("lg"));
  const compressAll = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigator();
  const shopApi = useShop().api;
  const [loading, setLoading] = useState(false)
  const isUpdateMode = props.mode === 'update'

  const onCreate = async (f: Form) => {
    if(!f.isFormValid())
      return

    setLoading(true)
    const pController = new ProductController(
      shopApi,
      f.getValues() as Product,
      {
        onCodeConflict: () => f.setIsValid('code')(false),
        onAttachmentsError: () => f.setIsValid('attachments')(false),
        onImagesError: () => f.setIsValid('images')(false),
        onRelatedProductsError: () => f.setIsValid('relatedProducts')(false),
        onDetailsrror: () => f.setIsValid('details')(false),
        onComplete: () => setLoading(false),
        onSuccess: () => onClose()
      }
    )

    isUpdateMode
      ? pController.update(props.product?.id ?? -1)
      : pController.create()

    /*
    const formProduct = f.getValues() as Product
    const createProduct = () => shopApi.products.create({
      ...formProduct,
      categoryId: formProduct.category?.id
    })

    const updateProduct = () => shopApi.products
      .withId(props.product?.id ?? -1)
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

    setLoading(true)
    const res = await task()

    await handleResponse(res, {
      201: async () => await addProductInformations(res.data, f),
      200: async () => await addProductInformations(res.data, f),
      409: () => f.setIsValid('code')(false)
    })

    setLoading(false)*/
  }

  const addProductInformations = async (p: Product, f: Form) => {
    const product = shopApi.products.withId(p.id)
    const formProduct = f.getValues() as Product

    const productToClean = props.product

    try {
      const attachments =
        await ProductUtils.getAllAttachementAsFile(formProduct.attachments)
      const images =
        await ProductUtils.getAllImagesAsData64(formProduct.images)

      if(productToClean)
        await cleanProductFiles(productToClean, product)

      await uploadData(product, f,
        attachments,
        images,
        formProduct.relatedProducts,
        formProduct.details
      )

      onClose()
    }
    finally { setLoading(false) }

  }

  const cleanProductFiles = (product: Product, productEndpoint: ProductEndpoint) => {
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
    images: Image[],
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

  const uploadImage = (productEndpoint: ProductEndpoint, image: Image) => {
    return productEndpoint
      .images
      .upload({
        image: image.url,
        index: image.index,
      })
  }

  const uploadImages = (productEndpoint: ProductEndpoint, images: Image[]) => {
    const tasks = images.map((image, i) => uploadImage(productEndpoint, image))

    return Promise.all(tasks)
  }

  const onClose = () => {
    setLoading(false)
    navigate.navigate('/products-table')
  }

  return (
    <FormGroup
      onSubmit={onCreate}
      values={props.product}
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
            maxWidth: compressAll ? 'auto' : 500,
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
          <ProductNameInput/>
          <ProductCodeInput/>
          <ProductPriceInput/>
          <ProductCategoryInput/>
          <ProductDescriptionInput/>
          <ProductRelatedInput productId={props.product?.id}/>
          <ProductDetailsInput/>
          <ProductImagesInput/>
          <ProductAttachmentsInput/>
        </Stack>
      </Stack>
    </FormGroup>
  )
}
