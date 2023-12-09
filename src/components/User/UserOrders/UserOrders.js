import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

import { AuthContext } from "../../../contexts/AuthContext";
let arrInitialOrders = [];
let arrProducts = [];
let arrProd = [];
let temporaryOrderData = [];
let num = 0;
let bool = true;
console.log(bool);
console.log(num);


const UserOrders = () => {
    let { user, orderData, removeOrder, arrProductsId, setProducts, products } = useContext(AuthContext);
    const [arrOrders, setArrOrders] = useState([]);
    const [takeProduct, setTakeProduct] = useState({});
    const [singleProduct, setSingleProduct] = useState({});
    const userId = Number(user.id);
    let temporaryProduct = 0;

    useEffect(() => {
        if (orderData.length > 0) {
            console.log(products);
            orderData.map((x) => {
                console.log(x.fk_product_id);
                console.log(x.quantity);
                console.log(x.confirmed);
                const pr = fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                setSingleProduct(pr);
                console.log(singleProduct);
                if (!products.find(pp => pp === x.fk_product_id)) {
                    console.log(x);
                    console.log(arrInitialOrders);
                    if (arrInitialOrders.length > 0) {
                        arrInitialOrders.forEach((y) => {
                            console.log(y);
                            if (y.id === x.fk_product_id && y.quantity !== x.quantity) {
                                y.quantity = singleProduct.quantity;
                                y.id = singleProduct.id;
                                y.date = singleProduct.date;
                                y.title = singleProduct.title;
                                y.weight = singleProduct.weight;
                                y.price = singleProduct.price;
                                y.picture = singleProduct.picture;
                            }
                        })
                    } else {
                        arrInitialOrders.push(singleProduct);
                    }
                    console.log(arrInitialOrders);
                        setArrOrders(arrInitialOrders);
                    // console.log(orderData);
                    // fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                    // if (orderData.fk_users_id !== undefined) {

                    // temporaryProduct = orderData.fk_product_id;
                    // };

                    if (x.confirmed === 0 && !arrInitialOrders.find(y => y.id === x.fk_product_id)) {
                        console.log(singleProduct);
                        arrProductsId.push(singleProduct.id);
                        arrInitialOrders.push(singleProduct);//////////////////zashto vliza
                    }
                    setArrOrders(arrInitialOrders);
                    setProducts(arrProducts);
                    console.log(arrOrders);
                    temporaryProduct = x.fk_product_id;
                }
            })
        }
        console.log(orderData);


        num = 1;
    }, []);

    useEffect(() => {
        if (orderData.length > 0) {
            orderData.map((x) => {
                console.log(products);////products repeat
                if (!products.find(pp => pp === x.fk_product_id)) {
                    if (arrInitialOrders.length > 0) {
                        arrInitialOrders.forEach((y) => {
                            if (y.id === x.fk_product_id && y.quantity !== x.quantity) {
                                y.quantity = x.quantity;
                                // count++;
                            }
                        });
                        setArrOrders(arrInitialOrders);
                    }
                    // fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
                    // console.log(takeProduct);

                    fetchProducts(orderData.fk_product_id, orderData.quantity, orderData.confirmed);
                    // temporaryProduct = orderData.fk_product_id;
                    // };
                    if (orderData.confirmed === 0 && !arrInitialOrders.find(y => y.id === orderData.fk_product_id)) {
                        arrProductsId.push(takeProduct.id);
                        arrInitialOrders.push(takeProduct);//////////////////zashto vliza
                    }
                    setArrOrders(arrInitialOrders);
                    setProducts(arrProducts);
                    // bool = false;
                    temporaryProduct = x.fk_product_id;
                }
            })
        }

        // if (arrInitialOrders.length > 0 && temporaryProduct !== 0) {
        //     console.log(arrInitialOrders);
        //     arrInitialOrders = arrInitialOrders.filter(x => x.id !== temporaryProduct);
        //     setArrOrders(arrInitialOrders);
        //     console.log(arrInitialOrders);
        // } else {
        //     console.log(arrInitialOrders);
        //     setArrOrders(arrInitialOrders);
        // }

        arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        num = 0;
    }, [arrInitialOrders]);

    // function fillInitialOrders(){
    //     if (orderData.length > 0) {
    //         console.log(products);
    //         orderData.map((x) => {
    //             console.log(x.fk_product_id);
    //             console.log(x.quantity);
    //             console.log(x.confirmed);
    //             const pr = fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
    //             setSingleProduct(pr);
    //             console.log(singleProduct);
    //             if (!products.find(pp => pp === x.fk_product_id)) {
    //                 console.log(x);
    //                 console.log(arrInitialOrders);
    //                 if (arrInitialOrders.length > 0) {
    //                     arrInitialOrders.forEach((y) => {
    //                         console.log(y);
    //                         if (y.id === x.id && y.quantity !== x.quantity) {
    //                             y.quantity = singleProduct.quantity;
    //                             y.id = singleProduct.id;
    //                             y.date = singleProduct.date;
    //                             y.title = singleProduct.title;
    //                             y.weight = singleProduct.weight;
    //                             y.price = singleProduct.price;
    //                             y.picture = singleProduct.picture;
    //                         }
    //                     });
    //                     setArrOrders(arrInitialOrders);
    //                 }
    //                 // console.log(orderData);
    //                 // fetchProducts(x.fk_product_id, x.quantity, x.confirmed);
    //                 // if (orderData.fk_users_id !== undefined) {

    //                 // temporaryProduct = orderData.fk_product_id;
    //                 // };

    //                 if (x.confirmed === 0 && !arrInitialOrders.find(y => y.id === x.fk_product_id)) {
    //                     console.log(singleProduct);
    //                     arrProductsId.push(singleProduct.id);
    //                     arrInitialOrders.push(singleProduct);//////////////////zashto vliza
    //                 }
    //                 setArrOrders(arrInitialOrders);
    //                 setProducts(arrProducts);
    //                 console.log(arrOrders);
    //                 temporaryProduct = x.fk_product_id;
    //             }
    //         })
    //     }
    // }
   

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
        if (arrOrders.length === 1) {
            bool = true;
        }

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
        temporaryOrderData = orderData;

        if (orderData.length > 0 && orderData.find(x => x.fk_product_id === productId && x.confirmed === 0)) {
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
            } else {
                // console.log(arrOrders);
                // console.log(arrOrders.filter(a => a.id !== productId));
                setArrOrders(arrOrders.filter(a => a.id !== productId));
            }

            if (!arrProd.find(x => x.id === productId)) {
                arrProd.push(data);
            } else {
                arrProd.forEach((item) => {// ne raboti
                    if (item.id === productId) {
                        item.quantity = quantity;
                    }
                });
            }
            setProducts(arrProductsId);
            return;
        } else if (orderData.length === undefined && orderData.fk_product_id === productId && orderData.confirmed === 0) {
            deleteConfirmedOrder(userId, productId);
            updateQuantityOfOrder(quantity, dateTime, userId, productId);
            removeOrder([]);
            arrProductsId = [];
            setProducts(arrProductsId);
            arrInitialOrders = arrInitialOrders.filter(x => Number(x.id) !== productId);
            setArrOrders(arrInitialOrders);
            if (!arrProd.find(x => {
                return x.id === productId
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
            if (!orderData.find(x => x.id === productId)) {
                updateConfirmedOrder(dateTime, userId, productId);/////////////////////
                deleteOrder(userId, productId);
            }
        } else if (orderData.length === undefined) {
            updateConfirmedOrder(dateTime, userId, productId);//////////////////
        }
        function remove(e) {
            if (e.confirmed === 1) {
                return e.fk_product_id !== productId;
            }
        }
        if (!arrProd.find(x => x.id === productId)) {
            arrProd.push(data);
        } else {
            arrProd.forEach((item, i) => {
                if (item.id === productId) {
                    return item = data;
                }
            });
        }
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productId);
        setArrOrders(arrInitialOrders);
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
            console.log(orderData);
            const temp = orderData.filter(remove, productsId);
            console.log(orderData);
            removeOrder(temp);
            arrProducts = arrProducts.filter(x => x !== temporaryProduct);
        } else {
            // setOrderData({});
            removeOrder({});
            arrProducts = [];
        }
        deleteOrder(userId, productsId);
        arrInitialOrders = arrInitialOrders.filter(x => x.id !== productsId);
        setArrOrders(arrInitialOrders);
        setProducts(arrProducts);
    };

    async function fetchProducts(productId, quantitNum, confirmed) {///////////////
        console.log(typeof productId);
        console.log(quantitNum);
        console.log(confirmed);
        let temporaryOrder = {
            fk_product_id: productId,
            fk_users_id: userId,
            quantity: quantitNum,
            sended: 0,
            confirmed: 0,
            date: null,
            date_sended: null
        }
        let res;
        // console.log(temporaryOrder.length);
        // if(temporaryOrder.length === 0 && num === 0){
        //     console.log(33);
        //     bool = true;
        // }
        try {
            res = await axios.post("http://localhost:5000/api/product/get", { productId })
                .then((data) => {
                    console.log(data.data[0]);
                    const prod = data.data[0];
                    return prod;
                })
                .catch((error) => console.log(error));
            res.quantity = quantitNum;
            console.log(res);
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

        } catch (err) {
            console.log(err.response);
            toast.error(err.response);
        }
        // setTakeProduct(res);
        console.log(res);
        // console.log(takeProduct);
        return res;
    };

    return (
        <>
            {/* {fillInitialOrders()} */}
            {arrOrders && arrOrders.length > 0 ? arrOrders.map(x =>
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
                    {arrProd.map(x => {
                        console.log(x.id);
                        console.log(typeof x.id);
                        <div className="sended__container" key={x.id}>
                            <img src={x.picture} alt="pic product"></img>
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
                        </div>
                    })}
                </>

                : ''
            }
        </>
    );
}

export default UserOrders;