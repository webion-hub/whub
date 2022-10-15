import { AddRounded, CloseRounded, EditRounded, OpenInNewRounded } from "@mui/icons-material";
import { Badge, Button, IconButton, LinearProgress, Stack, TextField } from "@mui/material";
import { Guards, useShop } from "@whub/apis-react";
import { Product } from "@whub/wshop-api";
import { ProductImage, ProductUtils, ShopRoutes } from "@whub/wshop-ui";
import { AreYouSureDialog, Page, Section, useNextNavigator } from "@whub/wui";
import { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';


export async function getServerSideProps() {
  return await Guards.isAdmin('/')
}

export default function TableProducts() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState<Product[]>([])
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(10)
  const [filter, setFilter] = useState('')
  const [totalResults, setTotalResults] = useState(0)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const { clickNavigate } = useNextNavigator()
  const shopApi = useShop().api

  useEffect(() => {
    fetchProducts()
  }, [filter, page, perPage])

  const fetchProducts = async () => {
    const pagePrep = page - 1

    setLoading(true)
    const res = await shopApi.products
      .search
      .filter({
        skip: pagePrep * perPage,
        take: perPage,
        query: filter
      })

    setProducts(res.data.results)
    setTotalResults(res.data.totalResults)
    setLoading(false)
  }

  return (
    <Page>
      <Section
        sx={{ padding: 1 }}
      >
        <Stack
          direction="column"
          spacing={1}
          sx={{ width: '100%' }}
        >
          <Stack
            direction="row"
            spacing={1}
          >
            <TextField
              color="secondary"
              variant="outlined"
              label="Cerca prodotto"
              fullWidth
              size="small"
              onChange={e => setFilter(e.target.value)}
            />
            <Button
              variant="contained"
              startIcon={<AddRounded/>}
              size="small"
              href={ShopRoutes.PRODUCT_ADD}
              onClick={clickNavigate(ShopRoutes.PRODUCT_ADD)}
              sx={{ minWidth: 240 }}
            >
              Aggiungi prodotto
            </Button>
          </Stack>
          {loading && <LinearProgress/>}
          <DataTable
            progressPending={loading}
            pagination
            paginationServer
            data={products}
            paginationTotalRows={totalResults}
            onChangePage={setPage}
            onChangeRowsPerPage={setPerPage}
            columns={[
              {
                cell: (p) => {
                  const imagesNum = p.images
                    ? p.images.length - 1
                    : 0

                  const getExtraImages = () => {

                    return imagesNum <= 0
                      ? ''
                      : `+${imagesNum}`
                  }

                  const areNoExtraImages = () => {
                    return imagesNum <= 0
                  }

                  return (

                      <Badge
                        badgeContent={getExtraImages()}
                        color={areNoExtraImages() ? undefined : 'primary'}
                        overlap="circular"
                        sx={{
                          '.MuiBadge-badge': {
                              boxShadow: theme => areNoExtraImages()
                                ? ''
                                : `0px 0px 0 2px ${theme.palette.background.default}`
                            },
                        }}
                      >
                        <ProductImage
                          srcs={ProductUtils.prepareImages(p.images ?? [])}
                          size={54}
                          sx={{ margin: 0.5 }}
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
              },
              {
                maxWidth: '160px',
                cell: (p) => (
                  <Stack
                    direction="row"
                  >
                    <IconButton
                      href={ShopRoutes.getEditRoute(p.id)}
                      onClick={clickNavigate(ShopRoutes.getEditRoute(p.id))}
                    >
                      <EditRounded/>
                    </IconButton>
                    <IconButton
                      onClick={() => setProductToDelete(p)}
                    >
                      <CloseRounded/>
                    </IconButton>
                    <IconButton
                      href={ShopRoutes.getProductRoute(p.id)}
                      onClick={clickNavigate(ShopRoutes.getProductRoute(p.id))}
                    >
                      <OpenInNewRounded/>
                    </IconButton>
                  </Stack>
                )
              }
            ]}
          />
        </Stack>

        <AreYouSureDialog
          loading={loading}
          title="Sei sicuro di eliminare il prodotto?"
          open={!!productToDelete}
          onClose={() => setProductToDelete(null)}
          onClick={() => {
            if(!productToDelete)
              return

            setLoading(true)
            shopApi.products
              .withId(productToDelete?.id)
              .delete()
              .finally(() => setLoading(false))
              .finally(() => setProductToDelete(null))
              .finally(() => fetchProducts())
          }}
        />
      </Section>
    </Page>
  )
}


