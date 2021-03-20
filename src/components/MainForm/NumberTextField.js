import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  field: {
    width: '40%',
    margin: 12
  },
}));

export default function NumberTextField(props){
  const classes = useStyles();
  const { name, handleChange, value } = props;

  return (
    <TextField
      variant="outlined"
      className={classes.field}
      value={value || ''}
      placeholder="0"
      id="standard-number"
      label={name}
      type="number"
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputProps: {
          min: 0,
          max: 120
        },
        name: name
      }}
      onChange={handleChange}
    />
  );
}
