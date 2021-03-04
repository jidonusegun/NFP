import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StateView from "views/StateView/StateView.js";
import StateAdmin from "views/StateAdmin/StateAdmin.js";
// import ViewProfile from 'views/ViewProfile/ViewProfile';
import Tabs from "views/Tab/Tabs.js";


export default function StateUsers() {
    return (
        <div>
            <Switch>
                {/* <StateAdmin /> */}
                
                <Route path="/admin/state/stateView" component={StateView} />
                <Route path="/admin/state/tab" component={Tabs} />
                {/* <Route path="/admin/state/viewprofile" component={ViewProfile} /> */}
                <Route path="/" component={StateAdmin} />
            </Switch>
        </div>
    )
}
