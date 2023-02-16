import { Link, Typography } from "@mui/material";
import { FooterBottomLabel } from "@webion/ui-layout/Footer";
import { WebionRepository } from "../../../lib/WebionRepositiory";

export function WebionFooterBottomLabel() {
  return (
    <FooterBottomLabel
      StackProps={{
        direction: 'row',
        flexWrap: 'wrap',
      }}
      TypographyProps={{
        variant: 'caption',
        color: 'rgba(255, 255, 255, 0.7)',
      }}
      DividerSx={{
        borderColor: 'rgba(255, 255, 255, 0.2)',
      }}
    >
      <Link
        href="/policies-licenses"
        target="_blank"
        sx={{ marginRight: 1 }}
        color="inherit"
      >
        Privacy policy
      </Link>
      <Typography variant="caption">
        PIVA/CF {WebionRepository.IVA}
      </Typography>
      <Link
        sx={{ marginLeft: 1 }}
        color="inherit"
        href={WebionRepository.HREF_PEC}
      >
        {WebionRepository.PEC}
      </Link>
    </FooterBottomLabel>
  )
}