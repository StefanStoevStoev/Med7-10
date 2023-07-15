import { useContext, useState, useEffect } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import AdminOrders from "./AdminOrders/AdminOrders";
import AdminUsers from "./AdminUsers/AdminUsers";

const Admin = () => {
    let { usersOrders } = useContext(AuthContext);
    let [arrData, setArrData] = useState([]);
    let [arrSendedOrders, setArrSendedOrders] = useState([]);
    const [orders, setOrders] = useState(false);
    const [users, setUsers] = useState(false);
    let arrOrders = [];
    let sendedOrders = [];

    function getArrOrders() {
        // if (usersOrders.length !== arrOrders.length + arrSendedOrders.length) {
        if (usersOrders.length !== arrOrders.length + arrSendedOrders.length) {
            // boolUserOrders = false;
            // console.log(arrOrders);
            if (arrData.length === 0 || arrSendedOrders === 0) {
                if (usersOrders.length > 0) {
                    usersOrders.map(x => {
                        if (x.sended === 0) {
                            arrOrders.push(x);
                        } else if (x.sended === 1) {
                            sendedOrders.push(x);
                        }
                    })
                    setArrData(arrOrders);
                } else {
                    if (usersOrders.sended === 0) {
                        arrOrders.push(usersOrders);
                    } else if (usersOrders.sended === 1) {
                        sendedOrders.push(usersOrders);
                    }

                };
            }

        }
        setArrData(arrOrders);
        setArrSendedOrders(sendedOrders);
    };

    // getArrOrders();

    useEffect(() => {
        getArrOrders();
    }, []);

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
            {orders ? <AdminOrders
                arrData={arrData}
                usersOrders={usersOrders}
                setArrData={setArrData}
                arrSendedOrders={arrSendedOrders}
                setArrSendedOrders={setArrSendedOrders}
                arrOrders={arrOrders}
            /> : ''}
            {users ? <AdminUsers /> : ''}
        </div>
    );
};

export default Admin;