import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  // root: {
  //   flexGrow: 1,
  // },
  // menuButton: {
  //   marginRight: theme.spacing(2),
  // },
  // title: {
  //   flexGrow: 1,
  // },
}));

export default function NumberTextField(props){
  const classes = useStyles();
  const { name, handleChange } = props;

  return (
    <TextField
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
      fullWidth
      onChange={handleChange}
    />
  );
}
