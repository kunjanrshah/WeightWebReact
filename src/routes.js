/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import Login from "views/Login.js";
import UserList from "views/UserList.js";
import VehicleList from "views/VehicleList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import VillegeList from "views/VillegeList.js";
import SupplierList from "views/SupplierList.js";
import RemarkList from "views/RemarkList.js";
import MaterialList from "views/MaterialList.js";
import ReceiverList from "views/ReceiverList.js";
import ReportList from "views/Report.js";
import PendingReport from "views/PendingReport.js";
import Setting from "views/Setting.js";

const dashboardRoutes = [
  // {
  //   upgrade: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-alien-33",
  //   component: Upgrade,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-chart-pie-35",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  {
    path: "/dashboard/:id?",
    name: "DashBoard",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
  },
  {
    path: "/pending-report",
    name: "Pending Weight List",
    icon: "nc-icon nc-notes",
    component: PendingReport,
    layout: "/admin",
  },
  {
    path: "/users",
    name: "User List",
    icon: "nc-icon nc-notes",
    component: UserList,
    layout: "/admin",
  },
  {
    path: "/vehicles",
    name: "Vehicle List",
    icon: "nc-icon nc-notes",
    component: VehicleList,
    layout: "/admin",
    keyName:'vehicle',
  },
  {
    path: "/supplier",
    name: "Supplier List",
    icon: "nc-icon nc-notes",
    component: SupplierList,
    layout: "/admin",
    keyName:'supplier',
  },
  {
    path: "/villege",
    name: "Villege List",
    icon: "nc-icon nc-notes",
    component: VillegeList,
    layout: "/admin",
    keyName:'villege',
  },
  {
    path: "/remark",
    name: "Remarks",
    icon: "nc-icon nc-notes",
    component: RemarkList,
    layout: "/admin",
    keyName:'remark',
  },
  {
    path: "/material",
    name: "Material List",
    icon: "nc-icon nc-notes",
    component: MaterialList,
    layout: "/admin",
    keyName:'material',
  },
  {
    path: "/receiver",
    name: "Receiver List",
    icon: "nc-icon nc-notes",
    component: ReceiverList,
    layout: "/admin",
    keyName:'receiver',
  },
  {
    path: "/reports",
    name: "Report",
    icon: "nc-icon nc-paper-2",
    component: ReportList,
    layout: "/admin",
    keyName:'report',
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "nc-icon nc-atom",
    component: Setting,
    layout: "/admin",
  },


];

export default dashboardRoutes;
