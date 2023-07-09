import { useContext, useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import AdminOrders from "./AdminOrders/AdminOrders";
import AdminUsers from "./AdminUsers/AdminUsers";

let temporaryOrder = [];

const Admin = () => {
    const [orders, setOrders] = useState(false);
    const [users, setUsers] = useState(false);

    let ordersGet = (e) => {
        e.preventDefault();
        setOrders(!orders);
        if (orders === true) {
            setUsers(false);
        }
    };

    const usersGet = (e) => {
        e.preventDefault();
        setUsers(!users);
        if (users === true) {
            setOrders(false);
        }
    };

    return (
        <div className="admin">
            < form className="admin__form" >
                <div className="admin__header">
                    <button className="bttn-order" onClick={ordersGet} >поръчки</button>
                    <button className="bttn-users" onClick={usersGet} >клиенти</button>

                </div>
            </form >
            {orders ? <AdminOrders /> : ''}
            {users ? <AdminUsers /> : ''}
        </div>
    );
};

export default Admin;