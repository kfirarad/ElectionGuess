import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { GoogleAuthContext } from '../../GoogleContext';
import { db } from '../../firebase/firebase';
import NewGroup from './NewGroup';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: 30,
  },
  groupsContainer: {
    margin: 30,
  },
  namesContainer: {
    display: 'flex',
  },
  group: {
    display: 'block',
    width: 80,
    padding: 10,
    textAlign: 'center',
    marginRight: 10,
    fontSize: 18,
    color: 'white',
    borderRadius: 5,
    textDecoration: 'none',
    backgroundColor: '#3f51b5'
  },
  otherGroup: {
    display: 'block',
    width: 80,
    padding: 10,
    textAlign: 'center',
    marginRight: 10,
    fontSize: 18,
    color: '#3f51b5',
    border: '1px solid #3f51b5',
    borderRadius: 5,
  }
}));

export default function GroupList(){
  const classes = useStyles();
  const [ groups, setGroups ] = useState([]);
  const { userId } = useContext(GoogleAuthContext);
  const history = useHistory();

  const getGroups = async () => {
    const querySnapshot = await db.collection('groups').get();
    const groups = querySnapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setGroups(groups);
  }

  useEffect(() => {
    getGroups();
  }, []);

  const getUserGroups = () => {
    return groups.filter(group => group.members.includes(userId));
  }

  const getOtherGroups = () => {
    return groups.filter(group => !group.members.includes(userId));
  }

  const createNewGroup = async (ev, groupName) => {
    ev.preventDefault();
    const groupCreated = await db.collection('groups').add({
      name: groupName,
      members: [userId],
    });
    if (groupCreated.id) {
      history.push(`groups/${groupCreated.id}`);
    }
  }

  return (
      <div className={classes.groupsContainer}>
        <h2 className={classes.title}>My Groups</h2>
        <div className={classes.namesContainer}>
          {getUserGroups().map(group => <Link to={`/groups/${group.id}`} key={group.name} name={group.name} className={classes.group}>{group.name}</Link>)}
        </div>
        <h2 className={classes.title}>Other Groups</h2>
        <div className={classes.namesContainer}>
          {getOtherGroups().map(group => <div key={group.name} name={group.name} className={classes.otherGroup} >{group.name}</div>)}
        </div>
        {userId && <NewGroup createNewGroup={createNewGroup} />}
      </div>
  );
}
