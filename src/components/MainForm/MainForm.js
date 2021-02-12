import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parties } from '../../services/parties';
import NumberTextField from "./NumberTextField";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GoogleAuthContext } from '../../GoogleContext';

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
  const { userId } = useContext(GoogleAuthContext);

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
    return Object.values(mandates).reduce((sum, value) => {
      return sum - value;
    }, 120);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (userId) {
      // TODO: send form to firebase
      console.log(userId, mandates)
    } else {
      // TODO: open modal with please sign in and the google button
      // if the user is singing in, its need to know the mandates to send 
      // or: it will go back to this page and it will need to send again
      console.log('not authenticated')
    }
  }

  return (
      <form onSubmit={(e) => onSubmit(e)}>
        {parties.map(party => <NumberTextField key={party.name} name={party.name} handleChange={handleChange}/>)}
        <TextField type="number" disabled id="standard-disabled" label="Total left" value={calculateTotal()}/>
        <Button variant="contained" color="primary" type="submit" disabled={calculateTotal() !== 0}>Send</Button>
      </form>
  );
}