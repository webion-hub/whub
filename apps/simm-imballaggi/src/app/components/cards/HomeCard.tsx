import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { ChevronRightRounded } from '@mui/icons-material';
import KeyboardDoubleArrowRightRoundedIcon from '@mui/icons-material/KeyboardDoubleArrowRightRounded';

export interface HomeCardProps {
  readonly img: string,
  readonly title: string,
  readonly text: string,
  readonly buttonText: string,
}

const HomeCard = React.forwardRef<HTMLDivElement, HomeCardProps>((props, ref) => {
  const [hover, setHover] = useState(false)

  return (
    <Card
      ref={ref}
      sx={{ maxWidth: 350 }}
    >
      <CardMedia
        component="img"
        sx={{
          padding: 2,
          background: '#fff',
          aspectRatio: 1
        }}
        image={props.img}
      />
      <CardContent
        sx={{minHeight: 140}}
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
            display: '-webkit-box',
            '-webkit-line-clamp': '3',
            '-webkit-box-orient': 'vertical',
            overflow: 'hidden'
          }}
        >
          {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          variant='text'
          sx={{width: "100%"}}
          endIcon={
            hover
              ? <KeyboardDoubleArrowRightRoundedIcon/>
              : <ChevronRightRounded/>
          }
        >
          {props.buttonText}
        </Button>
      </CardActions>
    </Card>
  );
})

export default HomeCard