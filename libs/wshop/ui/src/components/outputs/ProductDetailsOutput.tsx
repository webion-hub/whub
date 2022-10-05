import { ExpandMoreRounded } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { GeneralProductOutputProps, ProductOutput } from "../ProductOutput";
import parse from 'html-react-parser';
import { ProductDetail } from "@whub/wshop-api";

export function ProductDetailsOutput(props: GeneralProductOutputProps) {
  return (
    <ProductOutput
      name="details"
      {...props}
    >
      {
        (details) =>
          <Stack
            direction="column"
          >
            {
              details?.map((d, i) => (
                <ProductDetailAccordion
                  key={i}
                  detail={d}
                />
              ))
            }
          </Stack>
      }
    </ProductOutput>
  )
}

interface ProductDetailsAccordionProps {
  readonly detail: ProductDetail
}

export function ProductDetailAccordion(props: ProductDetailsAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreRounded/>}
      >
        <Typography> {props.detail.title} </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {parse(props.detail.description ?? '')}
      </AccordionDetails>
    </Accordion>
  )
}
