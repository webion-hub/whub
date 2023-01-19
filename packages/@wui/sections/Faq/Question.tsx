import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface QuestionProps {
  readonly title: ReactNode;
  readonly expanded: boolean;
  readonly onChange: (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => void;
  readonly children: ReactNode;
}

export function Question(props: QuestionProps) {
  return (
    <Box>
      <Accordion expanded={props.expanded} onChange={props.onChange}>
        <AccordionSummary expandIcon={<ExpandMoreRounded />}>
          <Typography component="h3">{props.title}</Typography>
        </AccordionSummary>
        <AccordionDetails
          sx={{
            "& > *": {
              color: theme => theme.palette.text.secondary
            }
          }}
        >
          {props.children}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}
