import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Autocomplete, Badge, Box, Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useShopApi } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { AddEditProductDialog } from "@whub/wshop-ui";
import { Page } from "@whub/wui";
import _ from "lodash";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

export function TableProductsPage() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [openAddProduct, setOpenAddProduct] = useState(false)
  const shopApi = useShopApi()

  useEffect(() => {
    shopApi.products
      .list()
      .then(res => setProducts(res.data))
  }, [])

  return (
    <Page sx={{ padding: 1 }}>
      <Stack
        direction="column"
        spacing={1}
      >
        <Stack
          direction="row"
          spacing={1}
        >
          <TextField
            variant="outlined"
            label="Cerca prodotto"
            fullWidth
            size="small"
          />
          <Button
            variant="contained"
            startIcon={<AddRounded/>}
            size="small"
            onClick={() => setOpenAddProduct(true)}
            sx={{ minWidth: 240 }}
          >
            Aggiungi prodotto
          </Button>
        </Stack>
        <DataTable
          data={products}
          columns={[
            {
              name: '',
              cell: (p) => {
                const getExtraImages = () => {
                  const imagesNum = p.images.length - 1
                  return imagesNum <= 0
                    ? ''
                    : `+${imagesNum}`
                }

                const shopProduct = shopApi.products.withId(p.id);
                const images = p.images.map(i =>
                  shopProduct.images.withId(i.id)
                )

                const firstImage = images[0];

                const areNoExtraImages = () => {
                  return p.images.length - 1 <= 0
                }

                return (
                  <Badge
                    badgeContent={getExtraImages()}
                    color={areNoExtraImages() ? undefined : 'primary'}
                    overlap="circular"
                    sx={{
                      '.MuiBadge-badge': {
                          boxShadow: theme => areNoExtraImages() ? '' : `0px 0px 0 2px ${theme.palette.background.default}`
                        },
                    }}
                  >
                    <Paper
                      sx={{
                        aspectRatio: '1',
                        zIndex: 1,
                        margin: 0.5,
                        width: 54,
                        backgroundPosition: 'center center',
                        backgroundSize: 'cover',
                        backgroundSiRepeat: 'no-repeat',
                        backgroundImage: firstImage && `url(${firstImage?.src()})`
                      }}
                    />
                  </Badge>
                )
              }
            },
            {
              name: 'Codice',
              selector: row => row.code ?? ''
            },
            {
              name: 'Nome',
              selector: row => row.name
            },
            {
              name: 'Categoria',
              selector: row => row.category?.name ?? ''
            },
            {
              name: 'Prezzo',
              selector: row => row.price ? `${row.price}€` : ''
            }
          ]}
        />
      </Stack>
      <AddEditProductDialog
        open={openAddProduct}
        onClose={() => setOpenAddProduct(false)}
      />
    </Page>
  )
}
