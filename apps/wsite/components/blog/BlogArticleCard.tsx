import { CardActionArea, Chip, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import { BlogArticle } from '@wapi/blog';
import { MaybeShow, NextImg, WebionCard } from '@wui/components';
import { useNextNavigator } from '@wui/core';
import useLanguage from '@wui/wrappers/useLanguage';
import ReactMarkdown from 'react-markdown';

interface BlogArticleProps {
  readonly article: BlogArticle;
}

export default function BlogArticleCard(props: BlogArticleProps) {
  const { clickNavigate } = useNextNavigator();
  const { t } = useLanguage();

  const thereIsACover = props.article.cover !== '' && !!props.article.cover

  return (
    <WebionCard sx={{ height: { xs: 'auto', sm: 300 } }}>
      <CardActionArea
        onClick={clickNavigate(`/blog/${props.article.webId}`)}
        sx={{ height: '100%' }}
      >
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between"
          sx={{ 
            height: '100%',
          }}
        >
          <Stack
            direction="column"
            justifyContent="space-between"
            sx={{
              padding: 4,
              width: { xs: '100%', sm: '60%' },
              "&::after": {
                content: "''",
                position: 'absolute',
                width: '100%',
                pointerEvents: 'none',
                bottom: theme => theme.spacing(4),
                height: theme => theme.spacing(2),
                background: theme => ` linear-gradient(transparent, ${theme.palette.background.paper})` 
              }
            }}
          >
            <Stack direction="column">
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
            </Stack>
          </Stack>
          <Box
            sx={{
              position: 'relative',
              order: { xs: -1, sm: 0 },
              maxWidth: { xs: '100%', sm: 380 },
              width: { xs: '100%', sm: '40%' },
              height: { xs: 150, sm: 'auto' },
              borderRadius: 4,
              display: { 
                xs: thereIsACover ? 'block' : 'none', 
                sm: 'block' 
              }
            }}
          >
            <MaybeShow show={thereIsACover}>
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
            </MaybeShow>
          </Box>
        </Stack>
      </CardActionArea>
    </WebionCard>
  );
}
