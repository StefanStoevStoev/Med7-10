import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arrInitialOrders = [];
let arrProducts = [];
let arrProd = [];
let temporaryOrderData = [];

const UserOrders = () => {
    let { user, orderData, setOrderData, removeOrder, arrProductsId, setProducts, products } = useContext(AuthContext);
    const [arrOrders, setArrOrders] = useState([]);
    const userId = Number(user.id);
    let temporaryProduct = 0;

    useEffect(() => {
        console.log(arrInitialOrders);
        if (orderData.length > 0) {
            orderData.map((x) => {
                if (!products.find(pp => pp === x.fk_product_id)) {
                    if (arrInitialOrders.length > 0) {
                        arrInitialOrders.forEach((y) => {
                            if (y.id === x.id && y.quantity !== x.quantity) {
                                y.quantity = x.quantity;
                            }
                        });
                        // setArrOrders(arrInitialOrders);
                    }
                    fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                    console.log(arrOrders);
                }
            })
        } else {
            console.log(2);
            setArrOrders([]);
            arrInitialOrders = [];
            setProducts = [];
        }
        if (orderData.fk_users_id !== undefined) {
            fetchProducts(orderData.fk_product_id, orderData.quantity, orderData.confirmed);
            console.log(arrOrders);
        };
        console.log(arrInitialOrders);
        console.log(arrOrders);
        console.log(orderData);
    }, [orderData]);



    // useEffect(() => {
    //     if (orderData.length > 0) {
    //         orderData.map((x) => {
    //             console.log(products);////products repeat
    //             if (!products.find(pp => pp === x.fk_product_id)) {
    //                 if (arrInitialOrders.length > 0) {
    //                     arrInitialOrders.forEach((y) => {
    //                         if (y.id === x.fk_product_id && y.quantity !== x.quantity) {
    //                             y.quantity = x.quantity;
    //                         }
    //                     });
    //                     // setArrOrders(arrInitialOrders);
    //                 }
    //                 // fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
    //             }
    //         })
    //     }
    //     arrProducts = arrProducts.filter(x => x !== temporaryProduct);
    // }, [arrInitialOrders]);

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

        let picture = element.querySelector("img").src;
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
        const pic = picture.split('/').splice(-1);
        const picNamePart = pic[0].split(".")[0];
        picture = picNamePart;

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
        temporaryOrderData = orderData;
        console.log(arrOrders);

        if (orderData.length > 0 && orderData.find(x => x.fk_product_id === productId && x.confirmed === 0)) {
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);
            console.log(arrOrders);
            temporaryOrderData.filter((item) => item.fk_product_id === productId && item.confirmed === 0
            );
            removeOrder(temporaryOrderData);
            // setOrderData(arrInitialOrders);
            arrProductsId = arrProductsId.filter(x => x !== productId);
            arrInitialOrders = arrInitialOrders.filter(x => x.id !== productId);
            console.log(arrOrders);
            if (arrInitialOrders.length > 0) {
                setArrOrders(arrInitialOrders);
                console.log(arrOrders);
            } else {
                setArrOrders(arrOrders.filter(a => a.id !== productId));
                console.log(arrOrders);
            }

            if (!arrProd.find(x => x.id === productId)) {
                arrProd.push(data);
                console.log(arrProd);

            } else {
                arrProd.forEach((item) => {// ne raboti
                    if (item.id === productId) {
                        item.quantity = quantity;
                    }
                });
                console.log(arrProd);
            }
            if (orderData.length === 1) {
                setOrderData({});
            }
            setProducts(arrProductsId);
            console.log(arrOrders);
            return;
        } else if (orderData.length === undefined && orderData.fk_product_id === productId && orderData.confirmed === 0) {
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);
            removeOrder([]);
            arrProductsId = [];
            setProducts(arrProductsId);
            arrInitialOrders = arrInitialOrders.filter(x => Number(x.id) !== productId);
            setArrOrders(arrInitialOrders);
            console.log(arrOrders);
            if (!arrProd.find(x => {
                return x.id === productId
            })) {
            } else {
                arrProd.forEach((item, i) => {
                    if (item.id == Number(productId)) {
                        arrProd[i] = data;
                        updateQuantityOfOrder(quantity, dateTime, userId, productId);
                    }
                });
            }
            console.log(arrOrders);
            return;
        }
        if (orderData.length > 0) {
            console.log(arrOrders);
            if (!orderData.find(x => x.id === productId)) {
                console.log(orderData);
                updateConfirmedOrder(dateTime, userId, productId);/////////////////////
                deleteOrder(userId, productId);
                console.log(arrOrders);
            }
        } else if (orderData.length === undefined) {
            console.log(orderData);
            updateConfirmedOrder(dateTime, userId, productId);//////////////////
            console.log(arrOrders);
        }
        function remove(e) {
            if (e.confirmed === 1) {
                return e.fk_product_id !== productId;
            }
        }
        if (!arrProd.find(x => x.id === productId)) {
            console.log(arrProd);
            arrProd.push(data);
            console.log(arrOrders);
        } else {
            console.log(arrProd);
            arrProd.forEach((item, i) => {
                if (item.id === productId) {
                    return item = data;
                }
            });
            console.log(arrProd);
            console.log(arrOrders);
        }
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productId);
        setArrOrders(arrInitialOrders);
        console.log(arrOrders);
        setProducts(arrProductsId);
    };

    async function updateConfirmedOrder(date, userId, productId) {
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
        if (orderData.length > 0) {
            const temp = orderData.filter(remove, productsId);
            removeOrder(temp);
            console.log(orderData);/////////////////////orderData acumulate orders(16)
            arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        } else {
            console.log(orderData);
            removeOrder({});
            arrProducts = [];
        }
        deleteOrder(userId, productsId);
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productsId);
        setArrOrders(arrInitialOrders);
        console.log(arrOrders);
        setProducts(arrProducts);
    };

    async function fetchProducts(productId, quantitNum, confirmed) {///////////////

        let res;
        try {
            res = await axios.post("http://localhost:5000/api/product/get", { productId })
                .then((data) => {
                    const prod = data.data[0];
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

            if (confirmed === 0 && !arrInitialOrders.find(y => y.id === productId)) {
                arrProductsId.push(res.id);
                arrInitialOrders.push(res);
            }
            console.log(arrOrders);
            setArrOrders(prevArray => [...prevArray, res]);
            console.log(arrOrders);
            setProducts(arrProducts);
        } catch (err) {
            toast.error(err.response);
        }
        console.log(arrOrders);
    };
    console.log(arrOrders);
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