import React, { useState, useContext, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { GoogleAuthContext } from '../../GoogleContext';
// import AppModal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  // modalTitle: {
  //   backgroundColor: '#ffffff',
  //   padding: '100px',
  // },
}));

// TODO:
// 1. how to get the member name? could we do it with the auth of firebase? or should we have a collection of users?
// 2. how to send invitation to friends? should we send request to join or just join?
// 3. show group members bets
export default function Group(props){
  const { name, members } = props;

  const classes = useStyles();
  const { userId } = useContext(GoogleAuthContext);
  const [ isUserInGroup, setIsUserInGroup ] = useState(false);

  useEffect(() => {
    setIsUserInGroup(members.includes(userId));
  }, [userId]);

  // const [isModalOpen, setIsModalOpen] = useState(false);

  return (
      <div>
        <h2>{name}</h2>
        <h3>Group memebrs:</h3>
        {members.map(member => <div key={member}>{member}</div>)}
        {isUserInGroup && <Button>Invite friends to group</Button>}
        {!isUserInGroup && <Button>Join</Button>}
      </div>
  );
}
