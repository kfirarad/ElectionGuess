import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Login } from '../Login/Login';
import { Logout } from '../Logout/Logout';
import { GoogleAuthContext } from '../../GoogleContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    toolBar: {
        flexWrap: 'wrap',
        padding: 15,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        textDecoration: 'none'
    },
    title: {
        flexGrow: 1,
        minWidth: 300,
        marginBottom: 10,
    },
}));

export default function Header() {
    const classes = useStyles();
    const { userId } = useContext(GoogleAuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar className={classes.toolBar}>
                    <Typography id="title" variant="h6" className={classes.title}>
                        Election Guess
                    </Typography>
                    <Link to="/" className={classes.menuButton}>
                        <Button variant="contained">Bet</Button>
                    </Link>
                    <Link to="/groups" className={classes.menuButton}>
                        <Button variant="contained">Groups</Button>
                    </Link>
                    {!userId && <Login />}
                    {userId && <Logout />}
                </Toolbar>
            </AppBar>
        </div>
    );
}
