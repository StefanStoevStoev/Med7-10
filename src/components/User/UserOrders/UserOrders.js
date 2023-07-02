import { useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arr = [];
let arrProducts = [];
let arrProd = [];


const UserOrders = () => {
    let { user, orderData, setOrderData, arrProductsId, setProducts, products } = useContext(AuthContext);
    const userId = user.id;
    let temporaryProduct = 0;

    useEffect(() => {
        // console.log(orderData);
        // console.log(arr);
        // console.log(arrProd);
        if (orderData.length > 0) {
            orderData.map((x) => {
                if (!products.find(pp => pp === x.fk_product_id)) {
                    fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                }
            })
        } else if (orderData.fk_users_id !== undefined) {
            fetchProducts(orderData.fk_product_id, orderData.quantity, orderData.confirmed);
        };
    }, [orderData]);

    useEffect(() => {
        if (arr.length > 0 && temporaryProduct !== 0) {
            arr = arr.filter(x => x[0].id !== temporaryProduct);
        }
        arrProducts = arrProducts.filter(x => x !== temporaryProduct);
    }, [arrProducts]);

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
        const productId = element.getAttribute("name");

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
        if (orderData.length > 0 && orderData.find(x => x.fk_users_id === userId && x.fk_product_id === Number(productId) && x.confirmed === 0)) {
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);

            orderData.filter((item) => item.fk_product_id === Number(productId) && item.confirmed === 0
            );
            arrProductsId = arrProductsId.filter(x => x !== productId);
            arr = arr.filter(x => x.id !== Number(productId));
            if (!arrProd.find(x => x.id === Number(productId))) {
                arrProd.push(data);
            } else {
                arrProd.forEach((item) => {
                    if (item.id === Number(productId)) {
                        item = data;
                    }
                });
            }
            setProducts(arrProductsId);
            return;
        } else if (orderData.length === undefined && orderData.fk_users_id === userId && orderData.fk_product_id === Number(productId) && orderData.confirmed === 0) {
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);
            setOrderData({});
            arrProductsId = [];
            setProducts(arrProductsId);
            arr = arr.filter(x => Number(x.id) !== Number(productId));
            if (!arrProd.find(x => {
                return x.id === Number(productId)
            })) {
                arrProd.push(data);
            } else {
                arrProd.forEach((item, i) => {
                    if (item.id == Number(productId)) {
                        arrProd[i] = data;
                        updateQuantityOfOrder(quantity, dateTime, userId, productId);
                    }
                });
            }
            return;
        }
        if (orderData.length > 0) {
            console.log(orderData);
            if (!orderData.find(x => x.id === productId)) {
                updateConfirmedOrder(dateTime, userId, productId);
                deleteOrder(userId, productId);
            }
        } else if (orderData.length === undefined) {
            updateConfirmedOrder(dateTime, userId, productId);
        }
        function remove(e) {
            if (e.confirmed === 1) {
                return e.fk_product_id !== productId;
            }
        }

        if (orderData.length > 0) {
            orderData.filter(remove, productId);
            arrProductsId = arrProductsId.filter(x => x !== Number(productId));
        } else {
            setOrderData({});
            arrProductsId = [];
        }
        if (!arrProd.find(x => x.id === Number(productId))) {
            arrProd.push(data);
        } else {
            arrProd.forEach((item, i) => {
                if (item.id == Number(productId)) {
                    return item = data;
                }
            });
        }
        arr = arr.filter(x => x.id !== Number(productId));
        setProducts(arrProductsId);
        // navigate(`/users/${user.id}`);
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

    const productDelete = (orderDelete) => {
        orderDelete.preventDefault();
        const element = orderDelete.target.parentElement;
        const userId = user.id;
        const productsId = Number(element.getAttribute("name"));
        temporaryProduct = productsId;
        function remove(e) {
            return e.fk_product_id !== productsId;
        }

        if (orderData.length > 0) {
            const temp = orderData.filter(remove, productsId);
            setOrderData(temp);
            arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        } else {
            setOrderData({});
            arrProducts = [];
        }
        deleteOrder(userId, productsId);
        arr = arr.filter(x => x.id !== productsId);
        setProducts(arrProducts);
    };

    async function fetchProducts(productId, quantitNum, confirmed) {
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
            if (confirmed === 0 && !arr.find(y => y.id === productId)) {
                arrProductsId.push(res.id);
                arr.push(res);
            }
        } catch (err) {
            toast.error(err.response);
        }
        setProducts(arrProducts);
    };

    return (
        <>
            {arr.length > 0 ? arr.map(x =>
                < form className="sell__10 sell-10" key={x.id}
                    name={x.id} >
                    <img
                        src={x.picture}
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
                            <img src={x.picture}></img>
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