import { AddRounded, CloseRounded } from "@mui/icons-material";
import { Autocomplete, Badge, Box, Button, Dialog, DialogActions, DialogContent, Divider, IconButton, Paper, Stack, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import { Product } from "@whub/wshop-api";
import { AddEditProductDialog } from "@whub/wshop-ui";
import { DialogTitleCross, FormGroup, Img, InputValidator, InputValidatorGroup, InputValidatorGroupProps, IStep, ItemSelect, MaybeShow, NumberInput, Page, ProductListItem, SquareAddAttachment, SquareAddImage, SquareContainer, SquareImageContainer, SquaresGrid, Stepper, TextEditor, Utils, Validators } from "@whub/wui";
import _ from "lodash";
import { useState } from "react";
import DataTable from 'react-data-table-component';

export function TableProductsPage() {
  const [openAddProduct, setOpenAddProduct] = useState(false)

  const p: Product = {
    attachments: [],
    details: [],
    id: 1,
    images: [
      { id: 1, url: "assets/images/logo.png" },
    ],
    name: 'prova',
    relatedProducts: [],
    tags: [],
    variants: [],
    category: { id: 1, name: 'rrrr', products: [] },
  }

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
          data={[p]}
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

                const areNoImages = () => {
                  return p.images.length - 1 === 0
                }

                return (
                  <Badge
                    badgeContent={getExtraImages()}
                    color={areNoImages() ? undefined : 'primary'}
                    overlap="circular"
                    sx={{
                      '.MuiBadge-badge': {
                          boxShadow: theme => areNoImages() ? '' : `0px 0px 0 2px ${theme.palette.background.default}`
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
                        backgroundImage: `url(${p.images?.[0].url})`
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
