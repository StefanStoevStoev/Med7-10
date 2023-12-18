import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import axios from "axios";
import { toast } from "react-toastify";
import x from "uniqid";
// import UserOrders from "../../User/UserOrders/UserOrders";
let boolUserOrders = true;
let temporaryOrders = [];
let temporarySendedOrders = [];



const AdminOrders = ({ arrData, setArrData, arrSendedOrders, setArrSendedOrders, arrOrders }) => {
    let { usersOrders, setUsersOrders } = useContext(AuthContext);
    let temporaryProductId = 0;
    let temporaryUserId = 0;

    const cancelOrder0 = (e) => {
        e.preventDefault();
        const element = e.target.parentElement.parentElement;
        const productId = Number(element.getAttribute("title"));
        const userId = Number(element.getAttribute("name"));
        boolUserOrders = false;

        temporaryProductId = productId;
        temporaryUserId = userId;
        cancelOrderSended0(userId, productId);
        arrOrders = arrOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });

        temporaryOrders = arrData;
        temporaryOrders = temporaryOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });
        setUsersOrders(temporaryOrders);
        setArrData(temporaryOrders);
    };

    const cancelOrder1 = (e) => {
        e.preventDefault();
        const element = e.target.parentElement.parentElement;
        const productId = Number(element.getAttribute("title"));
        const userId = Number(element.getAttribute("name"));

        cancelOrderSended1(userId, productId);
        temporarySendedOrders = arrSendedOrders;
        temporarySendedOrders = temporarySendedOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });
        // console.log(temporarySendedOrders);
        setArrSendedOrders(temporarySendedOrders);
        // console.log(arrSendedOrders);
    };

    const sendingOrder = (e) => {
        e.preventDefault();

        const element = e.target.parentElement.parentElement;
        const productId = Number(element.getAttribute("title"));
        const userId = Number(element.getAttribute("name"));

        // const getWeight = element.querySelector('p[class="weight"]').textContent;
        const getPrice = element.querySelector('p[class="price"]').textContent;
        const regex = /\d+/g;

        let picture = element.querySelector("img").src;
        const title = element.querySelector('p[class="title"]').textContent;
        const quantity = Number(element.querySelector('p[class="quantity"]').textContent.match(regex)[0]);
        const price = Number(getPrice.match(regex)[0]);
        const weight = element.querySelector('p[class="weight"]').textContent;
        const date = element.querySelector('p[class="date"]').textContent;
        const finalPrice = price * quantity;

        const name = element.querySelector('p[class="name"]').textContent;
        const familyName = element.querySelector('p[class="family-name"]').textContent;
        const email = element.querySelector('p[class="email"]').textContent;
        const city = element.querySelector('p[class="city"]').textContent;
        const street = element.querySelector('p[class="street"]').textContent;
        const streetNumber = element.querySelector('p[class="street-number"]').textContent;
        const dateTimeNow = new Date().toISOString().slice(0, 19).replace('T', ' ');

        const pic = picture.split('/').splice(-1);
        const picNamePart = pic[0].split(".")[0];
        picture = picNamePart;

        const data = {
            name: name,
            familyName: familyName,
            email: email,
            city: city,
            street: street,
            streetNumber: streetNumber,
            productid: productId,
            userid: userId,
            title: title,
            picture: picture,
            quantity: quantity,
            weight: weight,
            price: price,
            finalPrice: finalPrice,
            date: date,
            date_sended: dateTimeNow,
            sended: 1,
        }

        console.log(arrOrders);
        console.log(arrSendedOrders);
        updateOrdersSended(userId, productId, dateTimeNow);
        temporarySendedOrders = arrSendedOrders;
        temporarySendedOrders.push(data);

        temporaryOrders = arrData;

        temporaryOrders = temporaryOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });

        setArrData(temporaryOrders);

        setArrSendedOrders(temporarySendedOrders);

    }

    async function updateOrdersSended(userId, productId, date) {
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/order/update/sended-date", { userId, productId, date })
                .then((data) => {
                    console.log(data);
                    // getUsers(data.data)
                    return data;
                })
                .catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
        console.log(res);
    };

    async function cancelOrderSended0(userId, productId) {
        try {
            await axios.post("http://localhost:5000/api/order/cancel/sended0", { userId, productId })
                .then((data) => {
                    return data.data;
                })
                .catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
    };

    async function cancelOrderSended1(userId, productId) {
        try {
            await axios.post("http://localhost:5000/api/order/cancel/sended1", { userId, productId })
                .then((data) => {
                    return data.data;
                })
                .catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
    };

    // async function getUsers(userId) {
    //     let res;
    //     try {
    //         res = await axios.post("http://localhost:5000/api/user/get", { userId })
    //             .then((data) => {
    //                 // temporaryUsers.push(data.data);
    //                 return data.data;
    //             })
    //             .catch((err) => toast.error(err.response.data));
    //     } catch (err) {
    //         toast.error(err.response);
    //     }
    //     // setUsersGet(temporaryUsers);
    // };

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
        <>
            {arrData.length > 0 ?
                <h2 className="adm_title">Поръчани</h2>
                : ''}
            <div className="admin_o">
                {arrData.length > 0 ? arrData.map((x, index) =>
                    <form className="admin__order" key={x.productid + x.userid}
                        name={x.userid} title={x.productid}>
                        <img
                            src={require(`../../../images/${x.picture}.jpg`)}
                            alt="product-picture" />
                        <section className="admin__order-product">
                            <p className='title' >{x.title}</p>
                            <p className="weight">{x.weight}кг.</p>
                            <p className="quantity">{x.quantity}бр.</p>
                            <p className="price">{x.price}лв.</p>
                            <p className="quantity-price">Общо <b>{x.quantity * x.price}лв.</b></p>
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
                                className="btn_adm_order-order" onClick={sendingOrder}>поръчка
                            </button>
                            <button className="btn_adm_order-cancel" onClick={cancelOrder0} >отказвам</button>
                        </section>
                    </form>
                )
                    : <h3 className="orders">
                        Няма нови поръчки
                    </h3>
                }

            </div>
            {arrSendedOrders.length > 0 ?
                <h2 className="adm_title">Изпратени</h2>
                : ''}
            <div className="admin_o">
                {arrSendedOrders.length > 0 ? arrSendedOrders.map(x =>
                    <form className="admin__order" key={x.userid + x.productid}
                        name={x.userid} title={x.productid}>
                        <img
                            src={require(`../../../images/${x.picture}.jpg`)}
                            alt="product-picture" />
                        <section className="admin__order-product">
                            <p className='title' >{x.title}</p>
                            <p className="weight">{x.weight}кг.</p>
                            <p className="quantity">{x.quantity}бр.</p>
                            <p className="price">{x.price}лв.</p>
                            <p className="quantity-price">Общо <b>{x.quantity * x.price}лв.</b></p>
                            <p className="date">{x.date_sended}</p>
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
                            <button className="btn_adm_order-cancel" onClick={cancelOrder1} >отказвам</button>
                        </section>
                    </form>
                )
                    : ''
                }
            </div>
        </>
    );
};

export default AdminOrders;