import React from 'react';
import {Switch, Route} from 'react-router-dom';
import StateReportView from "views/Report/StateReportView.js";
import StateReport from "views/Report/StateReport.js";
import ReportTables from "views/Report/ReportTables.js";

export default function ReportContainer() {
    return (
        <div>
            <Switch>
                <Route path="/admin/report/stateReport" component={StateReportView} />
                <Route path="/admin/report/tables" component={ReportTables} />
                <Route path="/" component={StateReport} />
            </Switch>
        </div>
    )
}
 