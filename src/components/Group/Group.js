import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { GoogleAuthContext } from '../../GoogleContext';
import { db } from '../../firebase/firebase';
import Member from '../Member/Member';
import AppModal from '../Modal/Modal';

const useStyles = makeStyles((theme) => ({
  modalTitle: {
    backgroundColor: '#ffffff',
    padding: '100px',
  },
}));

export default function Group() {
  const { id } = useParams();

  const classes = useStyles();
  const { userId } = useContext(GoogleAuthContext);
  const [ isUserInGroup, setIsUserInGroup ] = useState(false);
  const [ group, setGroup ] = useState(undefined);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalTitle, setModalTitle ] = useState('Please login to join the group');

  useEffect(async () => {
    const group = await db.collection('groups').doc(id).get();
    setGroup(group.data());
  }, []);

  useEffect(() => {
    if (group) {
      setIsUserInGroup(group.members.includes(userId));
    }
  }, [userId])

  const getLink = () => {
    setModalTitle('Link is copied to clipboard. Send the link to friends');
    navigator.clipboard.writeText(window.location.href);
    setIsModalOpen(true);
  }

  const joinGroup = () => {
    if (userId) {
      db.collection('groups').doc(id).update({
        members: firebase.firestore.FieldValue.arrayUnion(userId)
      });
      setIsUserInGroup(true);
    } else {
      setModalTitle('Please login to join the group');
      setIsModalOpen(true);
    }
  }

  // const [isModalOpen, setIsModalOpen] = useState(false);

  return group ? ( 
    <div>
      <h2>{group.name}</h2>
      <h3>Group memebrs:</h3>
      {group.members.map(member => <Member key={member} memberId={member} />)}
      {isUserInGroup && <Button onClick={getLink}>Get link to invite friends to group</Button>}
      {!isUserInGroup && <Button onClick={joinGroup}>Join Group</Button>}
      <AppModal open={isModalOpen} hanldeClose={() => setIsModalOpen(false)}>
        <h1 className={classes.modalTitle}>{modalTitle}</h1>
      </AppModal>
      </div>
    ) : (
      <div>No Such Group</div>
    );
}
