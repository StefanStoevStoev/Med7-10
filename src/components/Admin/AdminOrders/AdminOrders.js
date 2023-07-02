import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import axios from "axios";
import { toast } from "react-toastify";


const AdminOrders = ({ usersOrders }) => {
    let { user } = useContext(AuthContext);
    // const [users, setUsers] = useState();
    const [usersGet, setUsersGet] = useState();
    let idUsers = [];
    let idProducts = [];

    console.log(usersGet);

    useEffect(() => {
        getUserOrders();
    }, []);

    async function getUserOrders() {
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/admin/orders/get")
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
        if (res.length > 0) {
            res.map(x => {
                const userId = x.fk_users_id;
                const productId = x.fk_product_id;
                if (!idProducts.find(x => x === productId)) {
                    idProducts.push(productId);
                }
                if (!idUsers.find(x => x === userId)) {
                    idUsers.push(userId);
                }
            })
        };
        idUsers.map(x => {
            const papa = getUsers(x);
            console.log(papa);
        })
    };
    // console.log(temporaryUsers);

    async function getUsers(userId) {
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/user/get", { userId })
                .then((data) => {
                    // temporaryUsers.push(data.data);
                    return data.data;
                })
                .catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
        // setUsersGet(temporaryUsers);
    };

    // async function getProduct(userId) {
    //     let res;
    //     try {
    //         res = await axios.post("http://localhost:5000/api/user/get", { userId })
    //             .then((data) => {
    //                 temporaryUsers.push(data.data);
    //                 return data.data;
    //             })
    //             .catch((err) => toast.error(err.response.data));
    //     } catch (err) {
    //         toast.error(err.response);
    //     }
    //     setUsersGet(temporaryUsers);
    // };

    return (
        <form className="admin_o">
            {usersOrders.length > 0 ? usersOrders.map(x =>
                <div className="admin__order" key={x.date}
                    name={x.date}>
                    <img src={x.picture} alt="product-picture" />
                    <section className="admin__order-product">
                        <p className='title' >{x.title}</p>
                        <p className="weight">{x.weight}кг</p>
                        <p className="quantity">{x.quantity}бр.</p>
                        <p className="price">{x.price}лв.</p>
                        <p className="street">Общо <b>{x.quantity * x.price}лв.</b></p>
                        <p className="date">{x.date.slice(0, 19).replace('T', ' ')}</p>
                    </section>
                    <section className="admin__order-user">
                        <p className='name' >{x.name}</p>
                        <p className="family-name">{x.family_name}</p>
                        <p className="email">{x.phone}</p>
                        <p className="city">{x.city}</p>
                        <p className="street">{x.street}</p>
                        <p className="street-number">{x.street_number}</p>
                    </section>
                    <section className="admin__order-btn">
                        <button
                            className="btn_adm_order-order" >поръчка
                        </button>
                        <button className="btn_adm_order-cancel" >отказвам</button>
                    </section>
                </div>
            )
                : ''
            }
        </form>
    );
};

export default AdminOrders;