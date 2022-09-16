import { SaveRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Button, Paper, Stack, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useShop } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { Form, FormGroup, useNavigator } from "@whub/wui";
import { useState } from "react";
import { ProductController } from "../lib/ProductController";
import { ShopRoutes } from "../lib/ShopRoutes";
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
        onDetailsError: () => f.setIsValid('details')(false),
        onComplete: () => setLoading(false),
        onSuccess: () => onClose()
      }
    )

    isUpdateMode
      ? pController.update(props.product?.id ?? -1)
      : pController.create()
  }

  const onClose = () => {
    setLoading(false)
    navigate.navigate(ShopRoutes.PRODUCTS_TABLE)
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
