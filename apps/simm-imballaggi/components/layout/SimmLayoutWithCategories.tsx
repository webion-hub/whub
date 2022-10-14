import { CategoryRounded, ChevronRightRounded, ClearAllRounded, ClearRounded, CloseRounded, ExpandMoreRounded } from "@mui/icons-material";
import { TreeItem, treeItemClasses, TreeItemProps, TreeView } from "@mui/lab";
import { Box, Fade, IconButton, Stack, Typography, useTheme } from "@mui/material";
import { alpha, styled } from "@mui/system";
import { useShop } from "@whub/apis-react";
import { Category } from "@whub/wshop-api";
import { ProductCategory, ShopRoutes } from "@whub/wshop-ui";
import { MaybeShow, useLanguage, useNextNavigator } from "@whub/wui";
import _ from "lodash";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { SimmLayout } from "./SimmLayout";


interface ISimmLayoutWithCategoriesContext {
  readonly category: string;
  readonly setCategory: (category: string) => void;
}

const SimmLayoutWithCategoriesContext = createContext<ISimmLayoutWithCategoriesContext>({
  category: '',
  setCategory: () => { return }
})

export function SimmLayoutWithCategories({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState('')

  return (
    <SimmLayoutWithCategoriesContext.Provider
      value={{
        category,
        setCategory
      }}
    >
      <SimmLayout>
        <Stack
          direction={{ xs: "column", md: "row"}}
        >
          <CategoryTree category={category}/>
          <Stack
            direction="column"
            sx={{
              width: '100%',
              padding: 1
            }}
          >
            <Box p={2}>
              <ProductCategory categoryName={category} />
            </Box>
            {children}
          </Stack>
        </Stack>
      </SimmLayout>
    </SimmLayoutWithCategoriesContext.Provider>
  )
}

export const useProductLayout = () => useContext(SimmLayoutWithCategoriesContext)




const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} />
))(({ theme }) => ({
  [`& .${treeItemClasses.content}`]: {
    borderRadius: theme.spacing(0.5),
  },
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

interface TreeNode {
  readonly name: string,
  readonly children: TreeNode[],
}

interface CategoryTreeProps {
  readonly category: string,
}

function CategoryTree(props: CategoryTreeProps) {
  const shopApi = useShop().api
  const theme = useTheme()
  const { t } = useLanguage()
  const { navigate } = useNextNavigator()

  const [categories, setCategories] = useState<Category[]>([])
  const [tree, setTree] = useState<TreeNode[]>([])
  const [loading, setLoading] = useState<boolean>(false)

  const [expanded, setExpanded] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    shopApi.categories
      .list()
      .then((res) => setCategories(res.data))
      .finally(() => setLoading(false));
  }, [])

  useEffect(() => {
    setTree(createTree(categories))
  }, [categories])

  useEffect(() => {
    setExpanded(getDefaultExpanded(props.category))
    setSelected([props.category])
  }, [props.category])

  const createTree = (categories: Category[]) => {
    const result = [];
    const level = {result};

    categories
      .map(c => c.name)
      .forEach(path => {
        path.split('/').reduce((r, name) => {
          if(!r[name]) {
            r[name] = {result: []};
            r.result.push({
              name,
              children: r[name].result,
            })
          }

          return r[name];
        }, level)
      })

    return result
  }

  const generateTree = (nodes: TreeNode[], parent: string) => {
    return nodes
      .map(n => {
        const path = parent.length === 0
          ? n.name
          : [parent, n.name].join('/')

        const isAFinalCategory = categories.some(c => c.name === path)

        return (
          <StyledTreeItem
            key={path}
            label={n.name}
            nodeId={path}
            sx={{
              color: isAFinalCategory
                ? theme.palette.text.primary
                : theme.palette.text.secondary
            }}
            onClick={() => {
              if(isAFinalCategory)
                navigate(ShopRoutes.products({ category: path }))
            }}
          >
            {generateTree(n.children, path)}
          </StyledTreeItem>
      )})
  }

  const getDefaultExpanded = (category: string) => {
    const splittedCategory = category.split('/')

    return splittedCategory
      .map((_, i) => {
        return splittedCategory
          .slice(0, i + 1)
          .reduce((prev, category) => {
            return prev.length === 0
              ? category
              : [prev, category].join('/')
          }, '')
      })
  }

  const handleToggle = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setExpanded(nodeIds);
  };

  const handleSelect = (event: React.SyntheticEvent, nodeIds: string[]) => {
    setSelected(nodeIds);
  };

  if(loading)
    return null

  return (
    <Stack
      spacing={2}
      sx={{
        width: '100%',
        maxWidth: { xs: '100%', md: 300},
        padding: 2,
        background: theme => theme.palette.secondaryBackground.default
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
        >
          <CategoryRounded/>
          <Typography variant="h5">
            <strong>{t('category')}</strong>
          </Typography>
        </Stack>
        <Fade
          in={props.category.length !== 0}
        >
          <IconButton
            onClick={() => navigate(ShopRoutes.products({}))}
          >
            <ClearAllRounded/>
          </IconButton>
        </Fade>
      </Stack>

      <TreeView
        defaultCollapseIcon={<ExpandMoreRounded />}
        defaultExpandIcon={<ChevronRightRounded />}
        expanded={expanded}
        selected={selected}
        onNodeToggle={handleToggle}
        onNodeSelect={handleSelect}
      >
        {generateTree(tree, '')}
      </TreeView>
    </Stack>

  )
}
