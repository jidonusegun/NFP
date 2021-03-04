/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import AssessmentIcon from '@material-ui/icons/Assessment';
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import PaymentIcon from '@material-ui/icons/Payment';
import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
import AnnouncementIcon from '@material-ui/icons/Announcement';
import PersonIcon from '@material-ui/icons/Person';
import EditIcon from '@material-ui/icons/Edit';
// core components/views for Admin layout
// import DashboardPage from "views/Dashboard/Dashboard.js";
import GeneralAdminDashboard from "views/Dashboard/GeneralAdminDashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";

import StateUsers from "views/StateUsers/StateUsers.js";
// import TableAggregator from "views/TableList/TableAggregator.js";
// import TableSchools from "views/TableList/TableSchools.js";
// import TableStateAdmin from "views/TableList/TableStateAdmin.js";
import ReportContainer from "views/Report/ReportContainer.js";
import BlogPosts from 'views/Blog/GeneralAdminPost';
// import UserProfile from 'views/UserProfile/UserProfile';
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
// import ViewProfile from 'views/ViewProfile/ViewProfile';
import GeneralAdminPayments from "views/Payments/GeneralAdminPayments.js";
import GeneralAdminNotification from "views/Notifications/GeneralAdminNotification.js";
import GeneralAdminProfile from 'views/ViewProfile/GeneralAdminProfile';
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home Page",
    icon: Dashboard,
    component: GeneralAdminDashboard,
    layout: "/admin"
  },
  {
    path: "/state",
    name: "State Admins",
    icon: PersonIcon,
    component: StateUsers,
    layout: "/admin"
  },
  {
    path: "/report",
    name: "Reports",
    icon: AssessmentIcon,
    component: ReportContainer,
    layout: "/admin"
  },
  {
    path: "/payments",
    name: "Payment",
    icon: PaymentIcon,
    component: GeneralAdminPayments,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: Notifications,
    component: GeneralAdminNotification,
    layout: "/admin"
  },
  {
    path: "/news-blog",
    name: "News Blog",
    icon: AnnouncementIcon,
    component: BlogPosts,
    layout: "/admin"
  },
  {
    path: "/edit-profile",
    name: "Profile",
    icon: EditIcon,
    component: GeneralAdminProfile,
    layout: "/admin"
  },
];

export default dashboardRoutes;
