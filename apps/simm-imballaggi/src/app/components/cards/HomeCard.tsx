import { CardActionArea, useMediaQuery, useTheme } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import { border } from '../../theme/theme';

export interface HomeCardProps {
  readonly img: string,
  readonly title: string,
  readonly text: string,
  readonly buttonText: string,
}

const HomeCard = React.forwardRef<HTMLDivElement, HomeCardProps>((props, ref) => {
  const theme = useTheme()
  const showDescription = useMediaQuery(theme.breakpoints.up(400));

  return (
    <Card
      ref={ref}
      sx={{
        marginInline: 'auto !important',
        maxWidth: 'calc(100vw - 32px)'
      }}
    >
      <CardActionArea
        sx={{ display: 'flex' }}
      >
        <CardMedia
          component="img"
          sx={{
            width: 150,
            height: 150,
            padding: 2,
            background: '#fff',
            aspectRatio: 1
          }}
          image={props.img}
        />
        <CardContent
          sx={{
            height: 150,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: showDescription ? 'flex-start' : 'flex-end',
            borderInline: border
          }}
        >
          <Typography
            gutterBottom
            variant="h5"
            component="div"
          >
            {props.title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              display: showDescription ? '-webkit-box' : 'none',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}
          >
            {props.text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
})

export default HomeCard
