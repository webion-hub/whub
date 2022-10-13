import { Button, SxProps, Theme } from '@mui/material';
import { Product } from '@whub/wshop-api';
import { useGlobalDialogs, useLanguage } from '@whub/wui';

import { ProductAttachmentsOutput } from './outputs/ProductAttachmentsOutput';
import { ProductCategoryOutput } from './outputs/ProductCategoryOutput';
import { ProductCodeOutput } from './outputs/ProductCodeOutput';
import { ProductDescriptionOutput } from './outputs/ProductDescriptionOutput';
import { ProductDetailsOutput } from './outputs/ProductDetailsOutput';
import { ProductImagesOutput } from './outputs/ProductImagesOutput';
import { ProductNameOutput } from './outputs/ProductNameOutput';
import { ProductPriceOutput } from './outputs/ProductPriceOutput';
import { ProductRelatedOutput } from './outputs/ProductRelatedOutput';
import { ProductFrame } from './ProductFrame';
import { ProductWrapper } from './ProductWrapper';

interface ProductComponentBaseProps {
  readonly compress?: boolean;
  readonly sx?: SxProps<Theme>;
}

interface ProductComponentPreviewProps extends ProductComponentBaseProps {
  readonly mode: 'preview';
}

interface ProductComponentDefaultProps extends ProductComponentBaseProps {
  readonly mode?: 'default';
  readonly product: Product;
}

export type ProductComponentProps =
  | ProductComponentPreviewProps
  | ProductComponentDefaultProps;

export function ProductComponent(props: ProductComponentProps) {
  const { t } = useLanguage();
  const { openDialog } = useGlobalDialogs();
  const isAPreview = props.mode === 'preview';
  const product = isAPreview ? undefined : props.product;

  return (
    <ProductWrapper
      product={product}
      compress={props.compress}
      preview={props.mode === 'preview'}
    >
      <ProductFrame
        sx={props.sx}
        imagesComponent={<ProductImagesOutput />}
        nameComponent={<ProductNameOutput placeholder="Nome" />}
        descriptionComponent={
          <ProductDescriptionOutput placeholder="Descrizione" />
        }
        priceComponent={<ProductPriceOutput placeholder="Prezzo" />}
        detailsComponent={<ProductDetailsOutput />}
        attachmentsComponent={<ProductAttachmentsOutput />}
        codeComponent={<ProductCodeOutput placeholder="Codice" />}
        relatedComponent={<ProductRelatedOutput />}
        actionButton={
          <Button variant="contained" onClick={() => openDialog('contacts')}>
            {t('contact-us-button')}
          </Button>
        }
      />
    </ProductWrapper>
  );
}
