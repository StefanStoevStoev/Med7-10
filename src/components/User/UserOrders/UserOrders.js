import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arrInitialOrders = [];
let arrProducts = [];
let arrProd = [];
let temporaryOrderData = [];

const UserOrders = () => {
    let { user, orderData, removeOrder, arrProductsId, setProducts, products } = useContext(AuthContext);
    const [arrOrders, setArrOrders] = useState([]);
    const userId = Number(user.id);
    let temporaryProduct = 0;

    useEffect(() => {
        console.log(orderData);

        if (orderData.length > 0) {
            console.log(arrInitialOrders);
            orderData.map((x) => {
                if (!products.find(pp => pp === x.fk_product_id)) {
                    console.log(x);
                    if (arrInitialOrders.length > 0) {
                        arrInitialOrders.forEach((y) => {
                            console.log(y.id, x.id, y.quantity, x.quantity);
                            if (y.id === x.id && y.quantity !== x.quantity) {
                                console.log(x.quantity);
                                y.quantity = x.quantity;
                                // count++;
                            }
                        });
                        setArrOrders(arrInitialOrders);
                        console.log(arrOrders);
                    }
                    console.log(x.fk_product_id);
                    fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                }
                console.log(arrInitialOrders);
            })
        }
        console.log(orderData);
        console.log(orderData.fk_users_id);
        if (orderData.fk_users_id !== undefined) {
            console.log(products);
            console.log(orderData.fk_product_id);
            fetchProducts(orderData.fk_product_id, orderData.quantity, orderData.confirmed);
        };
    }, [orderData]);



    useEffect(() => {
        console.log(arrInitialOrders);
        console.log(orderData);

        console.log(arrInitialOrders);
        console.log(orderData);
        if (orderData.length > 0) {
            orderData.map((x) => {
                console.log(products);////products repeat
                if (!products.find(pp => pp === x.fk_product_id)) {
                    console.log(x);
                    if (arrInitialOrders.length > 0) {
                        arrInitialOrders.forEach((y) => {
                            if (y.id === x.fk_product_id && y.quantity !== x.quantity) {
                                y.quantity = x.quantity;
                                // count++;
                            }
                        });
                        setArrOrders(arrInitialOrders);
                        console.log(arrOrders);
                    }
                    console.log(x.fk_product_id);
                    fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                }
                console.log(arrInitialOrders);
            })
        }

        console.log(arrProducts);
        console.log(arrOrders);
        arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        console.log(arrProducts);
    }, [arrInitialOrders]);

    async function updateQuantityOfOrder(quantity, date, userId, productId) {
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/order/update/quantity", { quantity, date, userId, productId })
                .then((data) => {
                    return data.data;
                })
                .catch((error) => console.log(error));
        } catch (err) {
            toast.error(err.response);
        }
    };

    async function deleteConfirmedOrder(userId, productsId) {
        try {
            await axios.post("http://localhost:5000/api/delete-confirmed/order", {
                userId,
                productsId,
            }).then(() => {
            }).catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
    };

    const orderProduct = (e) => {
        e.preventDefault();
        const element = e.target.parentElement;
        const productId = Number(element.getAttribute("name"));

        const picture = element.querySelector("img").src;
        const title = element.querySelector('h4[class="title"]').textContent;
        const getWeight = element.querySelector('p[class="weight"]').textContent;
        const getPrice = element.querySelector('p[class="price"]').textContent;
        const quantity = Number(element.querySelector('input[id="quantity"]').value);
        const regex = /\d+/g;
        const price = Number(getPrice.match(regex)[0]);
        const weight = getWeight.match(regex).join(',');
        const finalPrice = price * quantity;

        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        let dateTime = (new Date(Date.now() - 2 * tzoffset)).toISOString().slice(0, 19).replace('T', ' ');

        const data = {
            id: Number(productId),
            title: title,
            picture: picture,
            quantity: quantity,
            weight: weight,
            price: price,
            finalPrice: finalPrice,
            date: dateTime,
            confirmed: 1,
        }
        console.log(orderData);
        console.log(arrInitialOrders);
        temporaryOrderData = orderData;

        console.log(orderData.find(x => x.fk_product_id === productId && x.confirmed === 0));

        // console.log(orderData);
        if (orderData.length > 0 && orderData.find(x => x.fk_product_id === productId && x.confirmed === 0)) {
            console.log(temporaryOrderData);
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);

            temporaryOrderData.filter((item) => item.fk_product_id === productId && item.confirmed === 0
            );
            removeOrder(temporaryOrderData);
            // setOrderData(arrInitialOrders);
            arrProductsId = arrProductsId.filter(x => x !== productId);
            arrInitialOrders = arrInitialOrders.filter(x => x.id !== productId);
            // console.log(arrInitialOrders);
            // console.log(orderData);
            // console.log(arrInitialOrders.length);
            if (arrInitialOrders.length > 0) {
                setArrOrders(arrInitialOrders);
                console.log(1);
            } else {
                console.log(arrOrders);
                console.log(arrOrders.filter(a => a.id !== productId));
                console.log(arrOrders);
                setArrOrders(arrOrders.filter(a => a.id !== productId));
                // console.log(arrOrders);
            }

            if (!arrProd.find(x => x.id === productId)) {
                console.log(arrProd);
                arrProd.push(data);
            } else {
                console.log(arrProd);
                arrProd.forEach((item) => {// ne raboti
                    console.log(item);
                    console.log(item.id);
                    console.log(data);
                    if (item.id === productId) {
                        item.quantity = quantity;
                        console.log(item);
                    }
                });
                console.log(arrProd);
            }
            console.log(arrProductsId);
            console.log(products);
            setProducts(arrProductsId);
            console.log(products);
            return;
        } else if (orderData.length === undefined && orderData.fk_product_id === productId && orderData.confirmed === 0) {
            console.log(arrInitialOrders);
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);
            removeOrder([]);
            arrProductsId = [];
            console.log(products);
            console.log(arrProductsId);
            setProducts(arrProductsId);
            console.log(products);
            arrInitialOrders = arrInitialOrders.filter(x => Number(x.id) !== productId);
            setArrOrders(arrInitialOrders);
            console.log(arrInitialOrders);
            if (!arrProd.find(x => {
                return x.id === productId
            })) {
                arrProd.push(data);
            } else {
                console.log(arrProd);
                arrProd.forEach((item, i) => {
                    if (item.id == Number(productId)) {
                        arrProd[i] = data;
                        updateQuantityOfOrder(quantity, dateTime, userId, productId);
                    }
                });
            }
            return;
        }
        console.log(orderData);
        if (orderData.length > 0) {
            console.log(orderData);
            if (!orderData.find(x => x.id === productId)) {
                console.log(11);
                updateConfirmedOrder(dateTime, userId, productId);/////////////////////
                deleteOrder(userId, productId);
            }
        } else if (orderData.length === undefined) {
            console.log(orderData);
            updateConfirmedOrder(dateTime, userId, productId);//////////////////
        }
        function remove(e) {
            if (e.confirmed === 1) {
                return e.fk_product_id !== productId;
            }
        }
        console.log(orderData);
        console.log(arrProd);
        if (!arrProd.find(x => x.id === productId)) {
            console.log(arrProd);
            arrProd.push(data);
            console.log(arrProd);
        } else {
            console.log(arrProd);
            arrProd.forEach((item, i) => {
                if (item.id === productId) {
                    return item = data;
                }
            });
            console.log(arrProd);
        }
        console.log(arrInitialOrders);
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productId);
        console.log(arrInitialOrders);
        setArrOrders(arrInitialOrders);
        console.log(products);
        console.log(arrProductsId);
        setProducts(arrProductsId);
        console.log(products);
        // navigate(`/users/${user.id}`);
    };

    async function updateConfirmedOrder(date, userId, productId) {
        console.log(43);
        if (orderData.length > 0 && orderData.find(x => {
            return x.fk_product_id === Number(productId) && x.confirmed === 1
        })) {
            return;
        };
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/order/update", { date, userId, productId })
                .then((data) => {
                    return data.data;
                })
                .catch((error) => console.log(error));
        } catch (err) {
            toast.error(err.response);
        }
    };

    async function deleteOrder(userId, productsId) {
        try {
            await axios.post("http://localhost:5000/api/delete/order", {
                userId,
                productsId,
            }).then(() => {
            }).catch((err) => toast.error(err.response.data));
        } catch (err) {
            toast.error(err.response);
        }
    };

    const productDelete = (e) => {
        e.preventDefault();
        const element = e.target.parentElement;
        const userId = user.id;
        const productsId = Number(element.getAttribute("name"));
        temporaryProduct = productsId;
        function remove(e) {
            return e.fk_product_id !== productsId;
        }
        console.log(orderData);
        console.log(arrProducts);
        if (orderData.length > 0) {

            const temp = orderData.filter(remove, productsId);
            console.log(temp);
            removeOrder(temp);
            console.log(orderData);/////////////////////orderData acumulate orders(16)
            arrProducts = arrProducts.filter(x => x !== temporaryProduct);
            console.log(arrProducts);
        } else {
            console.log(orderData);
            // setOrderData({});
            removeOrder({});
            arrProducts = [];
        }
        deleteOrder(userId, productsId);
        console.log(arrInitialOrders);
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productsId);
        console.log(arrInitialOrders);
        setArrOrders(arrInitialOrders);
        console.log(arrInitialOrders);
        console.log(products);
        console.log(arrProducts);
        setProducts(arrProducts);
        console.log(products);
    };

    async function fetchProducts(productId, quantitNum, confirmed) {///////////////
        let temporaryOrder = {
            fk_product_id: productId,
            fk_users_id: userId,
            quantity: quantitNum,
            sended: 0,
            confirmed: 0,
            date: null,
            date_sended: null
        }
        // let currentOrder = orderData;
        // console.log(currentOrder);
        // console.log(confirmed);
        // currentOrder.push(temporaryOrder);
        // console.log(currentOrder);

        console.log(temporaryOrder);
        // console.log(productId);
        // console.log(quantitNum);
        // console.log(confirmed);
        console.log(orderData);
        let res;
        try {
            res = await axios.post("http://localhost:5000/api/product/get", { productId })
                .then((data) => {
                    const prod = data.data[0];
                    console.log(prod);////////////////
                    return prod;
                })
                .catch((error) => console.log(error));
            res.quantity = quantitNum;
            if (confirmed === 1 && !arrProd.find(y => y.id === productId
            )) {
                const dateTemp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const dataOfOrder = res;
                const finalPrice = res.price * res.quantity;
                dataOfOrder.finalPrice = finalPrice;
                dataOfOrder.confirmed = 1;
                dataOfOrder.date = dateTemp;
                arrProd.push(dataOfOrder);//////
            }
            console.log(arrInitialOrders);//////////////////
            console.log(productId);
            console.log(confirmed);
            console.log(arrInitialOrders.find(y => y.id === productId));////////////////////
            if (confirmed === 0 && !arrInitialOrders.find(y => y.id === productId)) {
                console.log(arrInitialOrders);
                arrProductsId.push(res.id);
                arrInitialOrders.push(res);
                console.log(res);
                console.log(arrInitialOrders);
            }
            setArrOrders(arrInitialOrders);
            console.log(products);
            console.log(arrProducts);
            setProducts(arrProducts);
            console.log(products);
            // return;
        } catch (err) {
            toast.error(err.response);
        }

    };

    return (
        <>
            {arrOrders && arrOrders.length > 0 ? arrOrders.map(x =>
                < form className="sell__10 sell-10" key={x.id}
                    name={x.id} >
                    <img
                        src={require(`../../../images/${x.picture}.jpg`)}
                        alt="honey-metal box"
                    />
                    <h4 className='title' >{x.title}</h4>
                    <p className="weight">{x.weight}kg</p>
                    <p className="price">Единична цена - {x.price}лв.</p>
                    <div className="quantity">
                        <label
                            className="screen-reader-text"
                            htmlFor="quantity_5ac7887e6a62a"
                        >
                            Количество
                        </label>
                        <input
                            id="quantity"
                            className="input-text qty text"
                            step={1}
                            min={1}
                            max={20}
                            name="quantity"
                            defaultValue={x.quantity}
                            title="Qty"
                            pattern="[0-9]*"
                            inputMode="numeric"
                            aria-labelledby=""
                            type="number"
                        />
                    </div>
                    <button
                        className="button sell10" onClick={orderProduct}>поръчка
                    </button>
                    <button className="btn-delete delete" onClick={productDelete}>отказвам</button>
                </form >
            )
                : <h3 className="userOrders">
                    Нямате нови поръчки
                </h3>
            }
            {arrProd.length > 0 ?
                <>
                    <h2 className="user-ordered">Поръчaни</h2>
                    {arrProd.map(x =>
                        <div className="sended__container" key={x.id}>
                            <img
                                src={require(`../../../images/${x.picture}.jpg`)}
                                alt="pic product"></img>
                            <div className="sended__title">
                                <p>{x.title}</p>
                                <p>Разфасовка - {x.weight}кг.</p>
                                <p>Дата - {x.date}</p>
                            </div>
                            <div className="sended__price">
                                <p>Единична цена - {x.price}лв.</p>
                                <p>Количество - {x.quantity}бр.</p>
                                <p>Обща цена - {x.finalPrice}лв.</p>
                            </div>
                            <div className="sended__text">
                                <p>Поръчката се обработва</p>
                            </div>
                        </div>)}
                </>

                : ''
            }
        </>
    );
}

export default UserOrders;