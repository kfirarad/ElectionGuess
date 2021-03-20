import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  name: {
    marginTop: 10,
  },
}));

export default function Member(props){
  const { memberId } = props;

  const classes = useStyles();
  const [ memberName, setMemberName ] = useState('');

  useEffect(() => {
    const getMember = async () => {
      const member = await db.collection('members').doc(memberId).get();
      setMemberName(member.data().name);
    }
    getMember();
  }, []);

  return (
      <div className={classes.name} >{memberName}</div>
  );
}
