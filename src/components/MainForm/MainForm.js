import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { parties } from '../../services/parties';
import NumberTextField from "./NumberTextField";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GoogleAuthContext } from '../../GoogleContext';
import { db } from '../../firebase/firebase';
import AppModal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    backgroundColor: '#ffffff',
    padding: '80px 40px',
    textAlign: 'center',
  },
  formContainer: {
    margin: 20,
  },
  sendContainer: {
    width: 200,
    margin: 20,
    display: 'flex',
    flexDirection: 'column'
  },
  totalField: {

  },
  sendButton: {
    marginTop: 20,
  }
}));

export default function MainForm() {
  const classes = useStyles();
  const { userId } = useContext(GoogleAuthContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mandates, setMandates] = useState({});
  const [ modalTitle, setModalTitle ] = useState('Please login to place your bet');

  const initializeEmptyBet = () => {
    setMandates(parties.reduce((partiesMap, party) => {
      partiesMap[party.name] = 0;
      return partiesMap;
    }, {}));
  };

  useEffect(() => {
    const getBet = async () => {
      const docs = await db.collection('bets').where("userId", "==", userId).orderBy('createdAt', 'desc').limit(1).get();
      if (docs.size) {
        docs.forEach(doc => {
          setMandates(doc.data().mandates);
        });
      } else {
        initializeEmptyBet();
      }
    };
    if (userId) {
      getBet();
    } else {
      initializeEmptyBet();
    }
  }, [userId])


  const handleChange = (ev) => {
    console.log(ev.target.value)
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
      db.collection('bets').add({
        userId,
        mandates: {
          ...mandates,
        },
        createdAt: Date.now(),
      });
      setModalTitle('Thank you from placing your bet. Goodluck!');
    } else {
      setModalTitle('Please login to place your bet');
    }
    setIsModalOpen(true);
  }

  return (
      <form onSubmit={(e) => onSubmit(e)} className={classes.formContainer} >
        {Object.keys(mandates).map(party => <NumberTextField key={party} name={party} handleChange={handleChange} value={mandates[party]} />)}
        <div className={classes.sendContainer}>
          <TextField type="number" disabled id="standard-disabled" label="Total left" value={calculateTotal()} className={classes.totalField} />
          <Button variant="contained" color="primary" type="submit" disabled={calculateTotal() !== 0} className={classes.sendButton} >Send</Button>
        </div>
        <AppModal open={isModalOpen} hanldeClose={() => setIsModalOpen(false)}>
          <h1 className={classes.modalTitle}>{modalTitle}</h1>
        </AppModal>
      </form>
  );
}
