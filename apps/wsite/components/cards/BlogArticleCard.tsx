import { CardActionArea, Chip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { NextImg, useNextNavigator } from '@whub/wui';
import { WebionCard } from './WebionCard';

export interface BlogArticle {
  readonly id: number;
  readonly name: string;
  readonly title: string;
  readonly category: string;
  readonly readingTime: number;
  readonly date: string;
  readonly image: string;
  readonly article: string;
}

interface BlogArticleProps {
  readonly article: BlogArticle;
}

export default function BlogArticleCard(props: BlogArticleProps) {
  const { clickNavigate } = useNextNavigator();

  return (
    <WebionCard>
      <CardActionArea onClick={clickNavigate(`/blog/${props.article.name}`)}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
        >
          <Stack
            direction="column"
            sx={{
              padding: 4,
              width: '100%',
            }}
          >
            <Typography variant="body1">{props.article.date}</Typography>
            <Stack
              direction="row"
              alignContent="center"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 4 }}
            >
              <Box>
                <Chip label={props.article.category} />
              </Box>
              <Typography sx={{ fontStyle: 'oblique' }}>
                {/*props.article.timeToRead*/}
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              component="h3"
              sx={{
                marginTop: 2,
              }}
            >
              {props.article.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                marginTop: 2,
                display: '-webkit-box',
                WebkitLineClamp: '3',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {props.article.article}
            </Typography>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              order: { xs: -1, sm: 0 },
              maxWidth: { xs: 'auto', sm: 380 },
              height: { xs: 250, sm: 'auto' },
              width: '100%',
              borderRadius: 4,
            }}
          >
            <NextImg
              src={props.article.image}
              alt={props.article.name}
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
