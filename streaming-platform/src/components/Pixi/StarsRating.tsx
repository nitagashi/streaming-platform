import React from 'react';
import { Rating, styled } from '@mui/material';

interface P {
  onChange: ((event: React.SyntheticEvent<Element, Event>, value: number | null) => void)
}

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#fcdc50',
  },
  '& .MuiRating-iconHover': {
    color: '#f9fc56',
  },
});

const StarsRating = (props :P) => {
  return (
    <StyledRating
        name="simple-controlled"
        size="large"
        defaultValue={5}
        onChange={props.onChange}
    />
  );
};

export default StarsRating;
