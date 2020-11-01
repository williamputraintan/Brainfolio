import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TextFieldLabel({text}) {
  return (
    <Typography component="div" gutterBottom>
      <Box  fontWeight="fontWeightMedium">
        {text}
      </Box>
    </Typography>
  )
}

export default TextFieldLabel
