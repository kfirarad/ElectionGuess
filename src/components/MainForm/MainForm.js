import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parties } from '../../services/parties';
import NumberTextField from "./NumberTextField";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GoogleAuthContext } from '../../GoogleContext';
import { AppContext } from '../../AppContext';
import { db } from '../../firebase/firebase';
import AppModal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    backgroundColor: '#ffffff',
    padding: '100px',
  },
}));

export default function MainForm(){
  const classes = useStyles();
  const { userId } = useContext(GoogleAuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
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
      db.collection('bets').add({
        userId,
        mandates: {
          ...mandates,
        }
      });
    } else {
      // TODO: open modal with please sign in and the google button
      // if the user is singing in, its need to know the mandates to send 
      // or: it will go back to this page and it will need to send again
      console.log('modal should open')
      setIsModalOpen(true);
    }
  }

  return (
      <form onSubmit={(e) => onSubmit(e)}>
        {parties.map(party => <NumberTextField key={party.name} name={party.name} handleChange={handleChange}/>)}
        <TextField type="number" disabled id="standard-disabled" label="Total left" value={calculateTotal()}/>
        <Button variant="contained" color="primary" type="submit" disabled={calculateTotal() !== 0}>Send</Button>
        <AppModal open={isModalOpen} hanldeClose={() => setIsModalOpen(false)}>
          <h1 className={classes.modalTitle}>Please login before sending your bet</h1>
        </AppModal>
      </form>
  );
}
