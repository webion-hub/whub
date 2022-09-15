import { DownloadRounded } from "@mui/icons-material";
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { FileWithId } from "@whub/wui";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";

export function ProductAttachmentsOutput(props: GeneralProductOutputProps) {
  return (
    <ProductOutput
      name="attachments"
      {...props}
    >
      {
        a =>
        <ProductAttachmentButtonList
          attachments={a ?? []}
        />
      }
    </ProductOutput>
  )
}

interface ProductAttachmentButtonListProps {
  readonly attachments: FileWithId<File>[],
}

export function ProductAttachmentButtonList(props: ProductAttachmentButtonListProps) {
  const { t } = useTranslation()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getAttachments = () => {
    return props.attachments
      .map(a => ({url: URL.createObjectURL(a.file), name: a.file.name}))
  }

  const areNoAttachments = () => {
    return getAttachments()?.length === 0
  }

  if(areNoAttachments())
    return null

  return (
    <Box>
      <Button
        variant="contained"
        color="inherit"
        onClick={handleClick}
      >
        {t('see-attachments')}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {
          getAttachments().map((a, i) => (
            <MenuItem
              key={i}
              component='a'
              target="_blank"
              download={a.name}
              href={a.url}
              onClick={handleClose}
              sx={{ maxWidth: 250 }}
            >
              <ListItemIcon>
                <DownloadRounded/>
              </ListItemIcon>

              <ListItemText
                sx={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}
              >
                {a.name}
              </ListItemText>
            </MenuItem>
          ))
        }
      </Menu>
    </Box>
  )
}
