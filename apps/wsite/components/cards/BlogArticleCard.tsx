import { CardActionArea, Chip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { NextImg, useNextNavigator } from '@whub/wui';
import { WebionCard } from './WebionCard';

export interface BlogArticleProps {
  readonly date: string;
  readonly category: string;
  readonly title: string;
  readonly timeToRead: string;
  readonly firstSentence: string;
  readonly image: string;
  readonly alt: string;
  readonly link: string;
}

export default function BlogArticleCard(props: BlogArticleProps) {
  const { clickNavigate } = useNextNavigator();

  return (
    <WebionCard
      sx={{
        width: 'clamp(300px, 1024px, 100%)',
      }}
    >
      <CardActionArea onClick={clickNavigate(props.link)}>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="column" sx={{ padding: 4 }}>
            <Typography variant="body1">{props.date}</Typography>
            <Stack
              direction="row"
              alignContent="center"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 4 }}
            >
              <Box>
                <Chip label={props.category} />
              </Box>
              <Typography sx={{ fontStyle: 'oblique' }}>
                {props.timeToRead}
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                marginTop: 2,
              }}
            >
              {props.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
              }}
            >
              {props.firstSentence}
            </Typography>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              maxWidth: 380,
              width: '100%',
              borderRadius: 4,
            }}
          >
            <NextImg
              src={props.image}
              alt={props.alt}
              fill
              sizes="
                (max-width: 700px) 100,
                (max-width: 1327px) 50vw,
                600px
              "
              sx={{
                objectFit: 'cover !important',
              }}
            />
          </Box>
        </Stack>
      </CardActionArea>
    </WebionCard>
  );
}
