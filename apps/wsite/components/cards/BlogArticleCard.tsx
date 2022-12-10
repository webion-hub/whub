import { useTheme } from '@emotion/react';
import { Card, Chip, Typography, Theme } from '@mui/material';
import { alpha, Box, Stack } from '@mui/system';
import { NextImg, useNextNavigator } from '@whub/wui';
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
  const theme = useTheme();
  return (
    <Card
      sx={{
        width: 'clamp(300px, 1024px, 100%)',
      }}
      onClick={clickNavigate(props.link)}
    >
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
              <Chip
                label={props.category}
                variant="filled"
                color="primary"
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.light,
                  color: 'black',
                }}
              />
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
        <NextImg
          src={props.image}
          alt={props.alt}
          auto
          sizes="
                (max-width: 700px) 100,
                (max-width: 1327px) 50vw,
                600px
              "
          sx={{
            maxWidth: '380px',
            maxHeight: 340,
            objectFit: 'cover !important',
            position: 'relative !important',
            borderRadius: 4,
            height: '339px !important',
            width: '380px !important',
          }}
        />
      </Stack>
    </Card>
  );
}
