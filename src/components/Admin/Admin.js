import { useContext, useState, useEffect } from "react";

import axios from "axios";
import { toast } from "react-toastify";

import AdminOrders from "./AdminOrders/AdminOrders";
import AdminUsers from "./AdminUsers/AdminUsers";



const Admin = () => {
    const [orders, setOrders] = useState(false);
    const [users, setUsers] = useState(false);
    const [usersOrders, setUsersOrders] = useState([]);
    // let orders = false;
    // let users = false;
    console.log(usersOrders);

    useEffect(() => {
        getUserOrders();
    }, []);

    async function getUserOrders() {
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/join/products-users/get")
                .then((data) => {
                    console.log(data.data);
                    // getUsers(data.data)
                    return data.data;
                })
                .catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
        console.log(res);
        setUsersOrders(res);
    };

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
                {orders ? <AdminOrders usersOrders={usersOrders} /> : ''}
                {users ? <AdminUsers /> : ''}
            </form >

        </div>
    );
};

export default Admin;