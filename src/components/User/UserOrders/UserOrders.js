import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arr = [];
let arrProducts = [];
let arrProd = [];


const UserOrders = () => {
    let { user, orderData, setOrderData, arrProductsId, setProducts, products } = useContext(AuthContext);
    // const [state, setState] = useState([]);
    // const [order, setOrder] = useState(false);
    const userId = user.id;
    let temporaryProduct = 0;

    useEffect(() => {
        console.log(orderData);
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

    async function updateQuantityOfOrder(quantity, date, userId, productId) {///проверка дали вече не съществува друг с confirmed = 1;
        console.log(arrProd);
        console.log(orderData);
        // if (arrProd.length > 0 && arrProd.find(x => {
        //     console.log(x.id);
        //     console.log(x.confirmed);
        //     return x.id === Number(productId) && x.confirmed === 1
        // })) {
        //     console.log(22);
        //     return;
        // } else if (arrProd.id === Number(productId) && arrProd.confirmed === 1){
        //     console.log(44);
        //     return;
        // }

        let res;
        try {
            res = await axios.post("http://localhost:5000/api/order/update/quantity", { quantity, date, userId, productId })
                .then((data) => {
                    console.log(data.data);////////////
                    return data.data;
                })
                .catch((error) => console.log(error));
        } catch (err) {
            console.log(43);
            toast.error(err.response);
        }
        console.log(res);///////
    };

    async function deleteConfirmedOrder(userId, productsId) {
        try {
            console.log(44);
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

        // let date = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const tzoffset = (new Date()).getTimezoneOffset() * 60000;
        let dateTime = (new Date(Date.now() - 2 * tzoffset)).toISOString().slice(0, 19).replace('T', ' ');
        // let dateTime = (new Date()).toISOString().slice(0, 19).replace('T', ' ');

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
        if (orderData.length > 0 && orderData.find(x => x.fk_users_id === userId && x.fk_product_id === Number(productId) && x.confirmed === 0)) {
            console.log(35);
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);

            // orGet.forEach((item) => {
            //     if (item.fk_product_id === Number(productId)) {
            //         console.log(item);
            //         item.quantity = data.quantity;
            //     }
            // });

            orderData.filter((item) => item.fk_product_id === Number(productId) && item.confirmed === 0
            );
            arrProductsId = arrProductsId.filter(x => x !== productId);
            arr = arr.filter(x => x.id !== Number(productId));
            // setArr2(arr);
            console.log(arrProd);
            if (!arrProd.find(x => x.id === Number(productId))) {
                console.log(data);
                arrProd.push(data);
            } else {
                console.log(6);
                arrProd.forEach((item) => {
                    if (item.id === Number(productId)) {
                        item = data;
                    }
                });
            }
            console.log(arrProd);
            setProducts(arrProductsId);
            return;
        } else if (orderData.length === undefined && orderData.fk_users_id === userId && orderData.fk_product_id === Number(productId) && orderData.confirmed === 0) {
            console.log(arr);
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);

            setOrderData({});
            arrProductsId = [];
            setProducts(arrProductsId);

            arr = arr.filter(x => Number(x.id) !== Number(productId));
            // setArr2(arr);
            console.log(arr);/////////////
            if (!arrProd.find(x => {
                console.log(x);//////////////
                return x.id === Number(productId)
            })) {
                console.log(21);
                arrProd.push(data);
            } else {
                console.log(arrProd);////////////////////
                arrProd.forEach((item, i) => {
                    if (item.id == Number(productId)) {
                        console.log(arrProd[i]);////////////////////
                        arrProd[i] = data;
                        updateQuantityOfOrder(quantity, dateTime, userId, productId);
                    }
                });
            }
            console.log(arrProd);/////////////////////////
            return;
        }
        if (orderData.length > 0) {
            console.log(orderData);
            if (!orderData.find(x => x.id === productId)) {
                console.log(6);
                // arrOrders.push(data);//////////////////////////////////////////
                updateConfirmedOrder(dateTime, userId, productId);
                deleteOrder(userId, productId);
            }
        } else if (orderData.length === undefined) {
            console.log(6);
            // arrOrders.push(data);///////////////////////////////////
            updateConfirmedOrder(dateTime, userId, productId);
        }
        console.log(6);
        function remove(e) {
            console.log(6);
            if (e.confirmed === 1) {
                return e.fk_product_id !== productId;
            }
        }

        if (orderData.length > 0) {
            console.log(6);
            orderData.filter(remove, productId);
            arrProductsId = arrProductsId.filter(x => x !== Number(productId));
        } else {
            console.log(6);
            setOrderData({});
            arrProductsId = [];
        }
        console.log(6);
        if (!arrProd.find(x => x.id === Number(productId))) {
            console.log(6);
            arrProd.push(data);
        } else {
            console.log(arrProd);
            arrProd.forEach((item, i) => {
                if (item.id == Number(productId)) {
                    return item = data;
                }
            });
        }
        console.log(arrProd);
        arr = arr.filter(x => x.id !== Number(productId));
        console.log(arr);
        setProducts(arrProductsId);
        // navigate(`/users/${user.id}`);
    };

    async function updateConfirmedOrder(date, userId, productId) {
        console.log(orderData);
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
        console.log(orderDelete);
        console.log(user.id);
        const userId = user.id;
        const productsId = Number(element.getAttribute("name"));
        temporaryProduct = productsId;

        function remove(e) {
            return e.fk_product_id !== productsId;
        }

        if (orderData.length > 0) {
            console.log(orderData);
            const temp = orderData.filter(remove, productsId);
            console.log(temp);
            setOrderData(temp);
            arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        } else {
            setOrderData({});
            arrProducts = [];
        }
        deleteOrder(userId, productsId);
        console.log(arr);
        arr = arr.filter(x => x.id !== productsId);
        console.log(arr);
        // arrProducts = arrProducts.filter(x => x !== productsId);
        setProducts(arrProducts);

    };

    async function fetchProducts(productId, quantitNum, confirmed) {
        let res;
        try {

            res = await axios.post("http://localhost:5000/api/product/get", { productId })
                .then((data) => {
                    const prod = data.data[0];
                    // prod.quantity = quantitNum;
                    // console.log(prod);
                    return prod;
                })
                .catch((error) => console.log(error));
            res.quantity = quantitNum;
            console.log(1);
            if (confirmed === 1 && !arrProd.find(y => y.id === productId
            )) {
                console.log(2);
                const dateTemp = new Date().toISOString().slice(0, 19).replace('T', ' ');
                const dataOfOrder = res;
                const finalPrice = res.price * res.quantity;
                dataOfOrder.finalPrice = finalPrice;
                dataOfOrder.confirmed = 1;
                dataOfOrder.date = dateTemp;
                // console.log(dataOfOrder);
                arrProd.push(dataOfOrder);//////
                console.log(arrProd);
            }
            if (confirmed === 0 && !arr.find(y => y.id === productId)) {
                console.log(res);
                arrProductsId.push(res.id);
                arr.push(res);
                console.log(arr);
            }
        } catch (err) {
            toast.error(err.response);
        }
        // console.log(arrProducts);
        setProducts(arrProducts);
        // console.log(products);
    };
    // console.log(products);
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
                            // size={4}
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