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
    >
      <CardMedia
        component="img"
        height={280}
        sx={{
          padding: 2,
          background: '#fff'
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
