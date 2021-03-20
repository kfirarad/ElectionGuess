import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 50,
  },
  container: {
    width: 400,
  },
  sendButton: {
    marginTop: 20,
    display: 'block',
  },
}));

export default function NewGroup(props) {
  const classes = useStyles();
  const { createNewGroup } = props;
  const [ groupName, setGroupName ] = useState('');

  const onSubmit = (ev) => {
    createNewGroup(ev, groupName);
  }

  return (
      <form onSubmit={(e) => onSubmit(e)} className={classes.container}>
        <h2 className={classes.title}>Create a new group</h2>
        <TextField variant="filled" fullWidth label="Group Name" onChange={e => setGroupName(e.target.value)} className={classes.name} />
        <Button variant="contained" color="primary" type="submit" disabled={!groupName} className={classes.sendButton}>Create group</Button>
      </form>
  );
}
