import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Login } from '../Login/Login';
import { Logout } from '../Logout/Logout';
import { GoogleAuthContext } from '../../GoogleContext';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();
    const { userId } = useContext(GoogleAuthContext);

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {!userId && <Login />}
                    {userId && <Logout />}
                    <Link to="/">
                        <Button>Bet</Button>
                    </Link>
                    <Link to="/groups">
                        <Button>Groups</Button>
                    </Link>
                    <Typography id="title" variant="h6" className={classes.title}>
                    </Typography>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    );
}
