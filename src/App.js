import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import MainForm from './components/MainForm/MainForm';
import GroupList from './components/GroupList/GroupList';

function App() {
    return (
        <Router>
            <Header/>
            <Route exact path="/">
                <MainForm/>
            </Route>
            <Route exact path="/groups">
                <GroupList/>
            </Route>
        </Router>
    );
}

export default App;
