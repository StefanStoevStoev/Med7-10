import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../contexts/AuthContext";

import axios from "axios";
import { toast } from "react-toastify";
// import UserOrders from "../../User/UserOrders/UserOrders";
let arrOrders = [];
let arrSendedOrders = [];
let boolUserOrders = true;
// let arrProducts = [];



const AdminOrders = () => {
    let { usersOrders } = useContext(AuthContext);
    let [arrData, setArrData] = useState([]);
    let temporaryProductId = 0;
    let temporaryUserId = 0;

    function getArrOrders() {
        console.log(usersOrders);
        console.log(arrOrders);
        console.log(arrSendedOrders);
        // if (usersOrders.length !== arrOrders.length + arrSendedOrders.length) {
        if (boolUserOrders) {
            console.log(arrOrders);
            if (arrOrders.length === 0 || arrSendedOrders === 0) {
                if (usersOrders.length > 0) {
                    usersOrders.map(x => {
                        // console.log(x);
                        if (x.sended === 0) {
                            arrOrders.push(x);
                        } else if (x.sended === 1) {
                            arrSendedOrders.push(x);
                        }
                    })
                } else {
                    console.log(usersOrders);
                    console.log(arrOrders);
                    if (usersOrders.sended === 0) {
                        arrOrders.push(usersOrders);
                    } else if (usersOrders.sended === 1) {
                        arrSendedOrders.push(usersOrders);
                    }
                };
                setArrData(arrOrders);
                console.log(arrData);
            }
        }
    }
    getArrOrders();

    useEffect(() => {
        console.log(arrData);
        console.log(arrOrders);
        getArrOrders();
        console.log(arrOrders);

    }, [arrData]);

    const cancelOrder0 = (e) => {
        e.preventDefault();
        const element = e.target.parentElement.parentElement;
        const productId = Number(element.getAttribute("title"));
        const userId = Number(element.getAttribute("name"));
        boolUserOrders = false;

        console.log(productId);
        console.log(userId);

        temporaryProductId = productId;
        temporaryUserId = userId;
        cancelOrderSended0(userId, productId);
        console.log(arrOrders);
        arrOrders = arrOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });
        console.log(usersOrders);
        usersOrders = usersOrders.filter(function (x) {
            if (x.userid === userId) {
                if (x.productid === productId) {
                    return false;
                }
            }
            return true;
        });
        console.log(usersOrders);

        // let temporaryArr = arrOrders.filter(function (x) {
        //     if (x.userid === userId) {
        //         if (x.productid === productId) {
        //             return false;
        //         }
        //     }
        //     return true;
        // });
        setArrData(arrOrders);
        console.log(arrOrders);
    };

    const cancelOrder1 = (e) => {
        e.preventDefault();
        const element = e.target.parentElement.parentElement;
        const productId = Number(element.getAttribute("title"));
        const userId = Number(element.getAttribute("name"));

        cancelOrderSended1(userId, productId);
        console.log(arrSendedOrders);
        arrSendedOrders = arrSendedOrders.filter(x => x.userid !== userId && x.productid !== productId);
        console.log(arrSendedOrders);
    };

    const sendingOrder = (e) => {
        e.preventDefault();

        const element = e.target.parentElement.parentElement;
        const productId = element.getAttribute("title");
        const userId = element.getAttribute("name");

        // const getWeight = element.querySelector('p[class="weight"]').textContent;
        const getPrice = element.querySelector('p[class="price"]').textContent;
        const regex = /\d+/g;

        const picture = element.querySelector("img").src;
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
        arrSendedOrders.push(data);
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
            <div className="admin_o">
                {arrData.length > 0 ? arrData.map((x, index) =>
                    <form className="admin__order" key={x.productid + x.userid}
                        name={x.userid} title={x.productid}>
                        <img src={x.picture} alt="product-picture" />
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
            <div className="admin_o">
                {arrSendedOrders.length > 0 ? arrSendedOrders.map(x =>
                    <form className="admin__order" key={x.userid}
                        name={x.userid} title={x.productid}>
                        <img src={x.picture} alt="product-picture" />
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