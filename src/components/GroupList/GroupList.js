import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { db } from '../../firebase/firebase';
import Group from '../Group/Group';

const useStyles = makeStyles((theme) => ({
  // modalTitle: {
  //   backgroundColor: '#ffffff',
  //   padding: '100px',
  // },
}));

export default function GroupList(){
  const classes = useStyles();
  const [ groups, setGroups ] = useState([]);

  useEffect(() => {
    getGroups();
  }, []);

  const getGroups = async () => {
    const querySnapshot = await db.collection('groups').get();
    const groups = querySnapshot.docs.map(doc => doc.data());
    setGroups(groups);
  }

  return (
      <div>
        {groups.map(group => <div key={group.name} name={group.name}>{group.name}</div>)}
        {/* {groups.map(group => <Group key={group.name} name={group.name} members={group.members}/>)} */}
      </div>
  );
}
