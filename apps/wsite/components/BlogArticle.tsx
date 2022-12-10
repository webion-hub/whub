import { Stack, Typography } from '@mui/material';
import { NextImg, Section, Sections } from '@whub/wui';

export interface BlogArticleProps {
  readonly date: string;
  readonly category: string;
  readonly title: string;
  readonly timeToRead: string;
  readonly firstSentence: string;
  readonly image: string;
  readonly alt: string;
}
export default function BlogArticle(props) {
  return (
    <Sections>
      <Section sx={{ paddingBottom: 0 }}>
        <Stack
          direction="column"
          spacing={4}
          alignItems="center"
          sx={{ paddingTop: 10 }}
        >
          {/* <Box>
              <Chip label="The webion blog" variant="filled" color="primary" />
            </Box> */}
          <Typography variant="h2" component="h1" sx={{}}>
            The Webion blog
          </Typography>
          <NextImg src={props.image} alt={props.alt} auto />
        </Stack>
      </Section>
    </Sections>
  );
}
