import Dashboard from 'views/Dashboard/Dashboard.jsx';
import Buttons from 'views/Components/Buttons.jsx';
import GridSystem from 'views/Components/GridSystem.jsx';
import Panels from 'views/Components/Panels.jsx';
import SweetAlert from 'views/Components/SweetAlertPage.jsx';
import Notifications from 'views/Components/Notifications.jsx';
import Icons from 'views/Components/Icons.jsx';
import Typography from 'views/Components/Typography.jsx';
import RegularForms from 'views/Forms/RegularForms.jsx';
import ExtendedForms from 'views/Forms/ExtendedForms.jsx';
import ValidationForms from 'views/Forms/ValidationForms.jsx';
import Wizard from 'views/Forms/Wizard/Wizard.jsx';
import RegularTables from 'views/Tables/RegularTables.jsx';
import ExtendedTables from 'views/Tables/ExtendedTables.jsx';
import DataTables from 'views/Tables/DataTables.jsx';
import GoogleMaps from 'views/Maps/GoogleMaps.jsx';
import FullScreenMap from 'views/Maps/FullScreenMap.jsx';
import VectorMap from 'views/Maps/VectorMap.jsx';
import Charts from 'views/Charts/Charts.jsx';
import Calendar from 'views/Calendar/Calendar.jsx';
import UserPage from 'views/Pages/UserPage.jsx';
import Product from '../views/QuanLyProduct/Product'
import ProductDetail from 'views/QuanLyProduct/ProductDetail.jsx';
import ProductAdd from 'views/QuanLyProduct/ProductAdd.jsx';

import Moderator from 'views/QuanLyAccount/Moderator.jsx';
import User from 'views/QuanLyAccount/User.jsx';
import Orders from 'views/Orders.jsx'
import OrderDetail from 'views/OrderDetail.jsx'

import pagesRoutes from './pages.jsx';

var pages = [{ path: "/pages/user-page", name: "User Page", mini: "UP", component: UserPage }].concat(pagesRoutes);

var dashRoutes = [
    { path: "/dashboard", name: "Dashboard", icon: "pe-7s-graph", component: Dashboard },
    {
        collapse: true, path: "/users", name: "User", state: "openUsers", icon: "pe-7s-user", views: [
            { path: "/users/moderator", name: "Moderator", mini: "M", component: Moderator },
            { path: "/users/user", name: "Normal user", mini: "U", component: User }]
    },
    { path: "/add-product",hide:true, name: "New product", icon: "pe-7s-graph", component: ProductAdd },
    { path: "/product-detail/:id",hide:true, name: "ProductDetail", icon: "pe-7s-graph", component: ProductDetail },
    { path: "/manage-products", name: "Product", icon: "pe-7s-leaf", component: Product },
    { path: "/manage-orders", name: "Order", icon: "pe-7s-leaf", component: Orders },

    {
        collapse: true, path: "/components", name: "Components", state: "openComponents", icon: "pe-7s-plugin", views: [
            { path: "/components/buttons", name: "Buttons", mini: "B", component: Buttons },
            { path: "/components/grid-system", name: "Grid System", mini: "GS", component: GridSystem },
            { path: "/components/panels", name: "Panels", mini: "P", component: Panels },
            { path: "/components/sweet-alert", name: "Sweet Alert", mini: "SA", component: SweetAlert },
            { path: "/components/notifications", name: "Notifications", mini: "N", component: Notifications },
            { path: "/components/icons", name: "Icons", mini: "I", component: Icons },
            { path: "/components/typography", name: "Typography", mini: "T", component: Typography }]
    },
    {
        collapse: true, path: "/forms", name: "Forms", state: "openForms", icon: "pe-7s-note2", views:
            [{ path: "/forms/regular-forms", name: "Regular Forms", mini: "RF", component: RegularForms },
            { path: "/forms/extended-forms", name: "Extended Forms", mini: "EF", component: ExtendedForms },
            { path: "/forms/validation-forms", name: "Validation Forms", mini: "VF", component: ValidationForms },
            { path: "/forms/wizard", name: "Wizard", mini: "W", component: Wizard }]
    },
    {
        collapse: true, path: "/tables", name: "Tables", state: "openTables", icon: "pe-7s-news-paper", views:
            [{ path: "/tables/regular-tables", name: "Regular Tables", mini: "RT", component: RegularTables },
            { path: "/tables/extended-tables", name: "Extended Tables", mini: "ET", component: ExtendedTables },
            { path: "/tables/data-tables", name: "Data Tables", mini: "DT", component: DataTables }]
    },
    {
        collapse: true, path: "/maps", name: "Maps", state: "openMaps", icon: "pe-7s-map-marker", views:
            [{ path: "/maps/google-maps", name: "Google Maps", mini: "GM", component: GoogleMaps },
            { path: "/maps/full-screen-maps", name: "Full Screen Map", mini: "FSM", component: FullScreenMap },
            { path: "/maps/vector-maps", name: "Vector Map", mini: "VM", component: VectorMap }]
    },
    { path: "/charts", name: "Charts", icon: "pe-7s-graph1", component: Charts },
    { path: "/calendar", name: "Calendar", icon: "pe-7s-date", component: Calendar },
    {
        collapse: true, path: "/pages", name: "Pages", state: "openPages", icon: "pe-7s-gift", views:
            pages
    },
    { redirect: true, path: "/", pathTo: "/pages/login-page", name: "Dashboard" }
];
export default dashRoutes;
