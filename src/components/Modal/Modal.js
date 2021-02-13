import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles((theme) => ({
  modal: {
    padding: '100px',
  },
}));

export default function AppModal(props) {
  const classes = useStyles();
  const { children, open, hanldeClose } = props;

  const domEl = document.getElementById('modal')

  if (!domEl) return null

  return ReactDOM.createPortal(
    <Modal
      className={classes.modal}
      open={open}
      onClose={hanldeClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {children}
    </Modal>,
    domEl
  );
}
