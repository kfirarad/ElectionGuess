import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase/firebase';

const useStyles = makeStyles((theme) => ({
  // modalTitle: {
  //   backgroundColor: '#ffffff',
  //   padding: '100px',
  // },
}));

export default function Member(props){
  const { memberId } = props;

  const classes = useStyles();
  const [ memberName, setMemberName ] = useState('');

  useEffect(async () => {
    const member = await db.collection('members').doc(memberId).get();
    setMemberName(member.data().name);
  }, []);

  return (
      <div>{memberName}</div>
  );
}
