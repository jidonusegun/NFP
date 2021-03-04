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
import SchoolIcon from '@material-ui/icons/School';
import AssessmentIcon from '@material-ui/icons/Assessment';
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import BubbleChart from "@material-ui/icons/BubbleChart";
import RestaurantIcon from '@material-ui/icons/Restaurant';
import PaymentIcon from '@material-ui/icons/Payment';
import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";
import AnnouncementIcon from '@material-ui/icons/Announcement';
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
import TableCook from "views/TableList/TableCook.js";
import TableAggregator from "views/TableList/TableAggregator.js";
import TableSchools from "views/TableList/TableSchools.js";
import ReportTable from "views/Report/stateReportTable.js";

import BlogPosts from 'views/Blog/BlogPosts';
// import Icons from "views/Icons/Icons.js";
// import Maps from "views/Maps/Maps.js";
import Payments from "views/Payments/Payments.js";
import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
// import RTLPage from "views/RTLPage/RTLPage.js";

const dashboardRoutes = [
  {
    path: "/home",
    name: "Home Page",
    rtlName: "لوحة القيادة",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/state-admin" 
  },
  {
    path: "/schools",
    name: "Schools",
    rtlName: "ملف تعريفي للمستخدم",
    icon: SchoolIcon,
    component: TableSchools,
    layout: "/state-admin"
  },
  {
    path: "/aggregator",
    name: "Aggregators",
    rtlName: "طباعة",
    icon: RestaurantIcon,
    component: TableAggregator,
    layout: "/state-admin"
  },
  {
    path: "/cooks",
    name: "Cooks",
    rtlName: "قائمة الجدول",
    icon: RestaurantIcon,
    component: TableCook,
    layout: "/state-admin"
  },
  {
    path: "/reports",
    name: "Reports",
    rtlName: "الرموز",
    icon: AssessmentIcon,
    component: ReportTable,
    layout: "/state-admin"
  },
  {
    path: "/payments",
    name: "Payment",
    rtlName: "خرائط",
    icon: PaymentIcon,
    component: Payments,
    layout: "/state-admin"
  },
  {
    path: "/notifications",
    name: "Notifications",
    rtlName: "إخطارات",
    icon: Notifications,
    component: NotificationsPage,
    layout: "/state-admin"
  },
  {
    path: "/news-blog",
    name: "News Blog",
    rtlName: "پشتیبانی از راست به چپ",
    icon: AnnouncementIcon,
    component: BlogPosts,
    layout: "/state-admin"
  },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   rtlName: "التطور للاحترافية",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
