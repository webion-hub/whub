import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React from 'react';

export interface HomeCardProps {
  readonly img: string,  
  readonly title: string,  
  readonly text: string,
  readonly buttonText: string,
}

const HomeCard = React.forwardRef<HTMLDivElement, HomeCardProps>((props, ref) => {
  return (
    <Card
      ref={ref}
    >
      <CardMedia
        component="img"
        height={280}
        sx={{padding: 2}}
        image={props.img}
      />
      <CardContent
        sx={{minHeight: 140}}
      >
        <Typography gutterBottom variant="h5" component="div">
          {props.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {props.text}
        </Typography>
      </CardContent>
      <CardActions>
        <Button 
          size="small" 
          variant='contained'
          sx={{width: "100%"}}
        >
          {props.buttonText}
        </Button>
      </CardActions>
    </Card>
  );
})

export default HomeCard