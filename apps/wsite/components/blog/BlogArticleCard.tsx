import { CardActionArea, Chip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { BlogArticle } from '@wapi/blog';
import { MaybeShow, NextImg } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import { useLanguage } from '@wui/wrappers';
import ReactMarkdown from 'react-markdown';
import { WebionCard } from '../cards/WebionCard';

interface BlogArticleProps {
  readonly article: BlogArticle;
}

export default function BlogArticleCard(props: BlogArticleProps) {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  return (
    <WebionCard
      sx={{
        height: 290
      }}
    >
      <CardActionArea
        onClick={clickNavigate(`/blog/${props.article.webId}`)}
        sx={{ height: '100%' }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          sx={{ height: '100%' }}
        >
          <Stack
            direction="column"
            sx={{
              padding: 4,
              width: '100%',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              {new Date(props.article.publishDate).toLocaleDateString()}
            </Typography>
            <Stack
              direction="row"
              alignContent="center"
              alignItems="center"
              spacing={3}
              sx={{ marginTop: 4 }}
            >
              <Box>
                <Chip
                  sx={{
                    textTransform: 'capitalize',
                  }}
                  label={t(props.article.category)}
                />
              </Box>
              <Typography color="text.secondary" sx={{ fontStyle: 'italic' }}>
                {props.article.readingTime} min
              </Typography>
            </Stack>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                marginTop: 2,
              }}
            >
              {props.article.title}
            </Typography>
            <Box
              sx={{
                marginTop: 2,
                display: '-webkit-box',
                WebkitLineClamp: '2',
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              <ReactMarkdown>
                {props.article.content}
              </ReactMarkdown>
            </Box>
          </Stack>
          <MaybeShow show={props.article.cover !== ''}>
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
                src={props.article.cover}
                alt={props.article.title}
                fill
                priority
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
          </MaybeShow>
        </Stack>
      </CardActionArea>
    </WebionCard>
  );
}
