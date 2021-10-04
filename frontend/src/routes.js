import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';
import Ong from './pages/Ong';
import Incidents from './pages/Incidents';
import Detail from './pages/Detail';
import Update from './pages/Update';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/logon" exact component={Logon} />
                <Route path="/register" component={Register} />
                <Route path="/profile" component={Profile} />
                <Route path="/incident/new"component={NewIncident} />
                <Route path="/ong"component={Ong} />
                <Route path="/incidents"component={Incidents} />
                <Route path="/detail/:id"component={Detail} />
                <Route path="/update/:id"component={Update} />
            </Switch>
        </BrowserRouter>
    )
}