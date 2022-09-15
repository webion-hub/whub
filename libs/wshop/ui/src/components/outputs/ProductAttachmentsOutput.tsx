import { DownloadRounded } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Button, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { Attachment } from "@whub/wshop-api";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductUtils } from "../../lib/ProductUtils";
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
  readonly attachments: Attachment[],
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

  const getAttachment = (a: Attachment) => {
    const attachment = ProductUtils.getAttachment(a)

    return {
      name: a.fileName,
      url: attachment
    }
  }

  const getAttachments = () => {
    return props.attachments.map(getAttachment)
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
