import React, { useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parties } from '../../services/parties';
import NumberTextField from "./NumberTextField";
import Button from '@material-ui/core/Button';
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

export default function MainForm(){
  const classes = useStyles();
  const totalInputRef = useRef();

  const [mandates, setMandates] = useState(parties.reduce((partiesMap, party) => {
    partiesMap[party.name] = 0;
    return partiesMap;
  }, {}));

  const handleChange = (ev) => {
    setMandates({
      ...mandates,
      [ev.target.name]: +ev.target.value,
    });
  }

  const calculateTotal = () => {
    return 120 - Object.values(mandates).reduce((value, sum) => {
      return sum + value;
    }, 0);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(mandates)
  }

  return (
      <form onSubmit={(e) => onSubmit(e)}>
        {parties.map(party => <NumberTextField key={party.name} name={party.name} handleChange={handleChange}/>)}
        <TextField type="number" disabled id="standard-disabled" label="Total left" value={calculateTotal()} ref={totalInputRef}/>
        <Button variant="contained" color="primary" type="submit" disabled={calculateTotal() !== 0}>Send</Button>
      </form>
  );
}