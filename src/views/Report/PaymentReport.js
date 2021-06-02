import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StatePaymentView from "views/Payments/GeneralAdminPayments";
import StateReport from "views/Report/statePaymentReport.js";
import ReportTables from "views/Report/ReportTables.js";
import config from 'utils/config';

export default function ReportContainer() {
    return ( 
        <div>
            <Switch>
                <Route path="/admin/payments/statePayment" component={StatePaymentView} />
                <Route path="/admin/payments/tables" component={ReportTables} />
                <Route path="/" component={StateReport} />
            </Switch>
        </div>
    )
}
 